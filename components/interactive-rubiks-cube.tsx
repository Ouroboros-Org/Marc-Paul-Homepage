"use client";

import { useEffect, useId, useRef } from "react";
import type {
  Group,
  Points,
  Scene,
  Vector3,
  WebGLRenderTarget,
  WebGLRenderer
} from "three";

type Axis = "x" | "y" | "z";

type Move = {
  axis: Axis;
  layer: number;
  angle: number;
  duration: number;
};

type ActiveMove = Move & {
  pivot: Group;
  selected: Group[];
  start: number;
};

const scramble = [
  "R",
  "U",
  "R'",
  "U'",
  "F2",
  "L",
  "D'",
  "B",
  "U2",
  "R'",
  "F",
  "D2"
] as const;

function inverseMove(token: string) {
  if (token.endsWith("2")) return token;
  return token.endsWith("'") ? token.slice(0, -1) : `${token}'`;
}

const choreography: readonly (
  | { type: "pause"; duration: number }
  | { type: "move"; token: string }
)[] = [
    { type: "pause", duration: 1200 },
    ...scramble.map((token) => ({ type: "move" as const, token })),
    { type: "pause", duration: 1200 },
    ...[...scramble]
      .reverse()
      .map(inverseMove)
      .map((token) => ({ type: "move" as const, token })),
    { type: "pause", duration: 1800 }
  ];

export function InteractiveRubiksCube() {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instructionsId = useId();

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;

    if (!frame || !canvas) return;

    let disposed = false;
    let renderer: WebGLRenderer | null = null;
    let environmentTarget: WebGLRenderTarget | null = null;
    let scene: Scene | null = null;
    let cubeRoot: Group | null = null;
    let particles: Points[] = [];
    let animationFrame = 0;
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;

    const cleanupCallbacks: Array<() => void> = [];

    async function initialise() {
      try {
        const THREE = await import("three");
        const [
          { RoundedBoxGeometry },
          { RectAreaLightUniformsLib }
        ] = await Promise.all([
          import("three/addons/geometries/RoundedBoxGeometry.js"),
          import("three/addons/lights/RectAreaLightUniformsLib.js")
        ]);

        if (disposed || !frameRef.current || !canvasRef.current) return;

        const activeFrame = frameRef.current;
        const activeCanvas = canvasRef.current;
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
        camera.position.set(6.7, 5.1, 7.5);
        camera.lookAt(-1.2, -0.2, 0);

        renderer = new THREE.WebGLRenderer({
          canvas: activeCanvas,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.44;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.VSMShadowMap;

        RectAreaLightUniformsLib.init();

        const focus = new THREE.Vector3(0, 0, 0);
        const view = new THREE.Vector3()
          .subVectors(camera.position, focus)
          .normalize();
        const camRight = new THREE.Vector3()
          .crossVectors(view, new THREE.Vector3(0, 1, 0))
          .normalize();
        const camUp = new THREE.Vector3().crossVectors(camRight, view).normalize();

        // Dark studio probe: only slim strips so IBL speculars stay thin.
        const room = new THREE.Scene();
        room.background = new THREE.Color(0x040406);
        function addEnvStrip(
          width: number,
          height: number,
          intensity: number,
          position: Vector3
        ) {
          const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(width, height),
            new THREE.MeshBasicMaterial({
              color: new THREE.Color(intensity, intensity, intensity)
            })
          );
          mesh.position.copy(position);
          mesh.lookAt(0, 0, 0);
          room.add(mesh);
        }
        addEnvStrip(5.5, 0.05, 16, new THREE.Vector3(0, 4.8, 0.8));
        addEnvStrip(0.08, 5.2, 14, new THREE.Vector3(-3.4, 2.2, -2.6));
        addEnvStrip(0.08, 4.2, 12, new THREE.Vector3(3.8, 0.6, 2.4));
        addEnvStrip(3.2, 0.05, 10, new THREE.Vector3(1.2, 3.6, -3.2));
        // Camera-adjacent lower-right streak in reflections.
        addEnvStrip(0.06, 2.4, 18, new THREE.Vector3(5.2, 1.2, 6.1));
        // Softbox / camera top-left streak in reflections.
        addEnvStrip(0.06, 2.4, 18, new THREE.Vector3(3.6, 5.8, 7.2));

        const pmrem = new THREE.PMREMGenerator(renderer);
        environmentTarget = pmrem.fromScene(room, 0.005);
        scene.environment = environmentTarget.texture;
        scene.environmentIntensity = 0.8;
        pmrem.dispose();

        function addAreaLight(
          color: number,
          intensity: number,
          width: number,
          height: number,
          position: Vector3
        ) {
          const light = new THREE.RectAreaLight(color, intensity, width, height);
          light.position.copy(position);
          light.lookAt(focus);
          scene!.add(light);
        }

        // One softbox: camera-left, aimed at the cube — carries scene readability.
        addAreaLight(
          0xfff4ea,
          9.8,
          3.6,
          4.4,
          new THREE.Vector3()
            .copy(camera.position)
            .addScaledVector(camRight, -3.4)
            .addScaledVector(camUp, 2.2)
            .addScaledVector(view, -3.2)
        );

        // Slim studio strips — crisp specular only.
        addAreaLight(0xffffff, 20, 4.2, 0.07, new THREE.Vector3(0.1, 6.4, 1.6));
        addAreaLight(0xffffff, 16, 0.09, 5.4, new THREE.Vector3(-3.6, 3.2, -4.8));
        addAreaLight(0xffffff, 14, 0.09, 3.6, new THREE.Vector3(4.8, 0.8, 1.4));
        addAreaLight(0xf2f6ff, 11, 2.8, 0.07, new THREE.Vector3(-0.8, 2.8, -5.2));
        // Front lower-right stripe, tucked right next to the camera.
        addAreaLight(
          0xffffff,
          24,
          0.07,
          2.6,
          new THREE.Vector3()
            .copy(camera.position)
            .addScaledVector(camRight, 1.05)
            .addScaledVector(camUp, -1.15)
            .addScaledVector(view, -0.35)
        );
        // Top-left stripe beside the softbox / camera.
        addAreaLight(
          0xffffff,
          24,
          0.07,
          2.6,
          new THREE.Vector3()
            .copy(camera.position)
            .addScaledVector(camRight, -1.15)
            .addScaledVector(camUp, 2.2)
            .addScaledVector(view, -0.4)
        );

        // Shadow-only directional, aligned with the softbox side.
        const key = new THREE.DirectionalLight(0xfff4ea, 0.32);
        key.castShadow = true;
        key.shadow.mapSize.set(768, 768);
        key.shadow.camera.left = -8;
        key.shadow.camera.right = 8;
        key.shadow.camera.top = 8;
        key.shadow.camera.bottom = -8;
        key.shadow.camera.near = 1;
        key.shadow.camera.far = 40;
        key.shadow.bias = -0.001;
        key.shadow.normalBias = 0.04;
        key.shadow.radius = 7;
        key.shadow.blurSamples = 8;
        scene.add(key);
        scene.add(key.target);

        // Tiny ambient floor so cavities don't crush to black.
        scene.add(new THREE.HemisphereLight(0x8e949c, 0x050607, 0.2));

        const shadowGeometry = new THREE.PlaneGeometry(28, 28);
        const shadowMaterial = new THREE.ShadowMaterial({
          color: 0x000000,
          opacity: 0.6,
          side: THREE.DoubleSide
        });
        const shadowCatcher = new THREE.Mesh(shadowGeometry, shadowMaterial);
        shadowCatcher.receiveShadow = true;
        scene.add(shadowCatcher);

        function placeShadowCatcher() {
          // Further back softens and enlarges the cast on the page plane.
          const depth = activeFrame.clientWidth < 560 ? 3.8 : 4.4;
          const viewDir = new THREE.Vector3()
            .subVectors(camera.position, focus)
            .normalize();
          const right = new THREE.Vector3()
            .crossVectors(viewDir, new THREE.Vector3(0, 1, 0))
            .normalize();
          const up = new THREE.Vector3().crossVectors(right, viewDir).normalize();

          shadowCatcher.position.copy(viewDir).multiplyScalar(-depth);
          shadowCatcher.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            viewDir
          );

          // Light from below-left → shadow reads up and to the right of the cube.
          key.position
            .copy(camera.position)
            .addScaledVector(up, 3)
            .addScaledVector(right, 4);
          key.target.position
            .copy(focus)
            .addScaledVector(up, 0.85)
            .addScaledVector(right, 0.9);
          key.target.updateMatrixWorld();
          key.shadow.camera.updateProjectionMatrix();
        }

        cubeRoot = new THREE.Group();
        const cubeGroup = new THREE.Group();
        cubeRoot.add(cubeGroup);
        scene.add(cubeRoot);

        const texturePaths = [
          "/textures/rubiks/perforated-metal.webp",
          "/textures/rubiks/black-marble.webp",
          "/textures/rubiks/brushed-gunmetal.webp",
          "/textures/rubiks/polished-steel.webp"
        ] as const;
        const textureLoader = new THREE.TextureLoader();
        const finishTextures = await Promise.all(
          texturePaths.map((path) => textureLoader.loadAsync(path))
        );

        if (disposed) {
          finishTextures.forEach((texture) => texture.dispose());
          return;
        }

        finishTextures.forEach((texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.generateMipmaps = true;
          texture.anisotropy = Math.min(
            4,
            renderer!.capabilities.getMaxAnisotropy()
          );
        });

        const [perforated, marble, brushed, polished] = finishTextures;

        function createSurfaceMaterial(
          map: (typeof finishTextures)[number],
          roughness: number,
          metalness: number,
          bumpScale: number,
          rotation: number = 0,
          color = 0xffffff
        ) {
          const tex = map.clone();
          tex.needsUpdate = true;
          tex.center.set(0.5, 0.5);
          tex.rotation = rotation * (Math.PI / 2);
          return new THREE.MeshPhysicalMaterial({
            color,
            map: tex,
            bumpMap: tex,
            bumpScale,
            roughness,
            metalness,
            envMapIntensity: 1.45,
            dithering: true
          });
        }

        // Dotted and marble finishes stay occasional accents; most cubies use the
        // same dark metals at different polishing levels.
        const bodyMaterials = [
          createSurfaceMaterial(perforated, 0.42, 0.62, 0.045, 0, 0xd8d8d8),
          createSurfaceMaterial(perforated, 0.42, 0.62, 0.045, 1, 0xd8d8d8),
          createSurfaceMaterial(marble, 0.62, 0.18, 0.014, 0, 0xe4e4e4),
          createSurfaceMaterial(marble, 0.62, 0.18, 0.014, 3, 0xe4e4e4),
          createSurfaceMaterial(brushed, 0.58, 0.68, 0.28, 0, 0xcfd2d4),
          createSurfaceMaterial(polished, 0.22, 0.92, 0.55, 0, 0xe8e8e8),
          createSurfaceMaterial(polished, 0.22, 0.92, 0.55, 3, 0xe8e8e8),
          createSurfaceMaterial(polished, 0.04, 0.98, 0.62, 0, 0xf0f0f0),
          createSurfaceMaterial(polished, 0.04, 0.98, 0.62, 1, 0xf0f0f0)
        ];

        // Flat, saturated digital accent — no clearcoat/sheen, reads graphic
        // against the lit solid metals.
        const orangeMaterial = new THREE.MeshStandardMaterial({
          color: 0xff2a00,
          emissive: 0xff2a00,
          emissiveIntensity: 0.45,
          metalness: 1,
          roughness: 1,
          envMapIntensity: 0
        });

        function stableHash(x: number, y: number, z: number, salt = 0) {
          return Math.abs(
            (x + 2) * 73 + (y + 2) * 137 + (z + 2) * 211 + salt * 47
          );
        }

        function makeBodyMaterial(
          orange: boolean,
          x: number,
          y: number,
          z: number
        ) {
          if (orange) return orangeMaterial;
          return bodyMaterials[
            stableHash(x, y, z, x + y + z) % bodyMaterials.length
          ];
        }

        const cubieSize = 0.92;
        const spacing = cubieSize + 0.01;

        const cubieGeometry = new RoundedBoxGeometry(
          cubieSize,
          cubieSize,
          cubieSize,
          16,
          0.045
        );

        const cubies: Group[] = [];

        for (let x = -1; x <= 1; x += 1) {
          for (let y = -1; y <= 1; y += 1) {
            for (let z = -1; z <= 1; z += 1) {
              if (x === 0 && y === 0 && z === 0) continue;

              const isOrangeCorner = x === 1 && y === 1 && z === 1;
              const cubie = new THREE.Group();
              cubie.position.set(x * spacing, y * spacing, z * spacing);
              cubie.userData.coord = new THREE.Vector3(x, y, z);

              const body = new THREE.Mesh(
                cubieGeometry,
                makeBodyMaterial(isOrangeCorner, x, y, z)
              );
              body.castShadow = true;
              body.receiveShadow = true;
              cubie.add(body);

              cubies.push(cubie);
              cubeGroup.add(cubie);
            }
          }
        }

        function createSoftParticleTexture() {
          const size = 32;
          const data = new Uint8Array(size * size * 4);
          const center = (size - 1) * 0.5;
          const radius = size * 0.5;

          for (let y = 0; y < size; y += 1) {
            for (let x = 0; x < size; x += 1) {
              const distance = Math.hypot(x - center, y - center) / radius;
              const falloff = THREE.MathUtils.clamp(1 - distance, 0, 1);
              const alpha = falloff * falloff * (3 - 2 * falloff);
              const offset = (y * size + x) * 4;
              data[offset] = 255;
              data[offset + 1] = 255;
              data[offset + 2] = 255;
              data[offset + 3] = Math.round(alpha * 255);
            }
          }

          const texture = new THREE.DataTexture(
            data,
            size,
            size,
            THREE.RGBAFormat,
            THREE.UnsignedByteType
          );
          texture.colorSpace = THREE.NoColorSpace;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.generateMipmaps = true;
          texture.needsUpdate = true;
          return texture;
        }

        const particleTexture = createSoftParticleTexture();

        function createParticles(
          count: number,
          color: number,
          size: number,
          opacity: number,
          seedStart: number
        ) {
          let seed = seedStart;
          const random = () => {
            seed = (seed * 16807) % 2147483647;
            return (seed - 1) / 2147483646;
          };
          const positions = new Float32Array(count * 3);

          for (let index = 0; index < count; index += 1) {
            const angle = random() * Math.PI * 2;
            const radius = 2.7 + random() * 3;
            positions[index * 3] = Math.cos(angle) * radius;
            positions[index * 3 + 1] = (random() - 0.5) * 6.6;
            positions[index * 3 + 2] = Math.sin(angle) * radius - 0.5;
          }

          const particleGeometry = new THREE.BufferGeometry();
          particleGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
          );
          const particleMaterial = new THREE.PointsMaterial({
            color,
            size,
            map: particleTexture,
            transparent: true,
            opacity,
            alphaTest: 0.01,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
          });
          const cloud = new THREE.Points(particleGeometry, particleMaterial);
          scene?.add(cloud);
          particles.push(cloud);
          return cloud;
        }

        const paleParticles = createParticles(54, 0x828282, 0.045, 0.55, 1741);
        const accentParticles = createParticles(20, 0xc56d3e, 0.065, 0.72, 4127);

        const moveDefinitions: Record<
          string,
          { axis: Axis; layer: number; direction: number }
        > = {
          R: { axis: "x", layer: 1, direction: -1 },
          L: { axis: "x", layer: -1, direction: 1 },
          U: { axis: "y", layer: 1, direction: -1 },
          D: { axis: "y", layer: -1, direction: 1 },
          F: { axis: "z", layer: 1, direction: -1 },
          B: { axis: "z", layer: -1, direction: 1 }
        };

        function parseMove(token: string): Move {
          const definition = moveDefinitions[token[0]];
          const prime = token.includes("'") ? -1 : 1;
          const double = token.includes("2") ? 2 : 1;
          return {
            axis: definition.axis,
            layer: definition.layer,
            angle: definition.direction * prime * double * Math.PI / 2,
            duration: double === 2 ? 900 : 650
          };
        }

        function easeInOutCubic(value: number) {
          return value < 0.5
            ? 4 * value * value * value
            : 1 - Math.pow(-2 * value + 2, 3) / 2;
        }

        let choreographyIndex = 0;
        let activeMove: ActiveMove | null = null;
        let pauseUntil = 0;
        let timelineTime = 0;

        function beginMove(token: string, now: number) {
          const move = parseMove(token);
          const pivot = new THREE.Group();
          cubeGroup.add(pivot);

          const selected = cubies.filter((cubie) => {
            const coordinate = cubie.userData.coord as Vector3;
            return Math.round(coordinate[move.axis]) === move.layer;
          });

          cubeGroup.updateMatrixWorld(true);
          selected.forEach((cubie) => pivot.attach(cubie));
          activeMove = { ...move, pivot, selected, start: now };
        }

        function snapCubie(cubie: Group) {
          cubie.position.set(
            Math.round(cubie.position.x / spacing) * spacing,
            Math.round(cubie.position.y / spacing) * spacing,
            Math.round(cubie.position.z / spacing) * spacing
          );

          const coordinate = cubie.userData.coord as Vector3;
          coordinate.set(
            Math.round(cubie.position.x / spacing),
            Math.round(cubie.position.y / spacing),
            Math.round(cubie.position.z / spacing)
          );

          const matrix = new THREE.Matrix4().makeRotationFromQuaternion(cubie.quaternion);
          const snapped = matrix.clone();
          const rotationIndices = [0, 1, 2, 4, 5, 6, 8, 9, 10];
          rotationIndices.forEach((index) => {
            const value = matrix.elements[index];
            snapped.elements[index] = Math.abs(value) < 0.5 ? 0 : Math.sign(value);
          });
          cubie.quaternion.setFromRotationMatrix(snapped).normalize();
        }

        function finishMove() {
          if (!activeMove) return;
          const { pivot, selected } = activeMove;
          pivot.updateMatrixWorld(true);
          selected.forEach((cubie) => {
            cubeGroup.attach(cubie);
            snapCubie(cubie);
          });
          cubeGroup.remove(pivot);
          activeMove = null;
          choreographyIndex += 1;
        }

        function advanceChoreography(now: number) {
          if (activeMove) {
            const elapsed = now - activeMove.start;
            const progress = Math.min(elapsed / activeMove.duration, 1);
            activeMove.pivot.rotation[activeMove.axis] =
              activeMove.angle * easeInOutCubic(progress);
            if (progress >= 1) finishMove();
            return;
          }

          if (pauseUntil > now) return;
          if (choreographyIndex >= choreography.length) choreographyIndex = 0;

          const step = choreography[choreographyIndex];
          if (step.type === "pause") {
            pauseUntil = now + step.duration;
            choreographyIndex += 1;
          } else {
            beginMove(step.token, now);
          }
        }

        let reducedMotion = mediaQuery.matches;
        let inView = true;
        let pageVisible = !document.hidden;
        let running = false;
        let lastFrameTime = performance.now();
        let ambientYaw = 0.52;
        let manualYaw = 0;
        let manualPitch = 0;
        let draggingPointer: number | null = null;
        let lastPointerX = 0;
        let lastPointerY = 0;
        let pointerStartX = 0;
        let pointerStartY = 0;
        let horizontalTouchDrag = false;

        function renderScene() {
          if (!renderer || !scene || !cubeRoot) return;
          cubeRoot.rotation.y = ambientYaw + manualYaw;
          cubeRoot.rotation.x = -0.18 + manualPitch;
          renderer.render(scene, camera);
        }

        function resize() {
          if (!renderer) return;
          const width = Math.max(1, activeFrame.clientWidth);
          const height = Math.max(1, activeFrame.clientHeight);
          camera.aspect = width / height;
          camera.position.set(
            6.7,
            5.1,
            width < 560 ? 9.5 : 7.5
          );
          camera.lookAt(-1.2, -0.2, 0);
          camera.updateProjectionMatrix();
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 560 ? 1.5 : 2));
          renderer.setSize(width, height, false);
          placeShadowCatcher();
          renderScene();
        }

        function shouldAnimate() {
          return !reducedMotion && inView && pageVisible;
        }

        function animate(now: number) {
          if (!shouldAnimate()) {
            running = false;
            animationFrame = 0;
            renderScene();
            return;
          }

          const delta = Math.min((now - lastFrameTime) / 1000, 0.05);
          lastFrameTime = now;

          timelineTime += delta * 1000;
          advanceChoreography(timelineTime);
          ambientYaw += delta * 0.105;

          cubeRoot!.rotation.y = ambientYaw + manualYaw;
          cubeRoot!.rotation.x =
            -0.18 + manualPitch + Math.sin(now * 0.00018) * 0.055;
          cubeRoot!.rotation.z = Math.sin(now * 0.00011) * 0.035;
          paleParticles.rotation.y += delta * 0.018;
          paleParticles.rotation.x = Math.sin(now * 0.00008) * 0.045;
          accentParticles.rotation.y -= delta * 0.026;
          accentParticles.rotation.z = Math.sin(now * 0.0001) * 0.04;
          renderer!.render(scene!, camera);
          animationFrame = window.requestAnimationFrame(animate);
        }

        function startAnimation() {
          if (running || !shouldAnimate()) {
            renderScene();
            return;
          }
          running = true;
          lastFrameTime = performance.now();
          animationFrame = window.requestAnimationFrame(animate);
        }

        function stopAnimation() {
          if (animationFrame) window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
          running = false;
        }

        function onMotionPreferenceChange(event: MediaQueryListEvent) {
          reducedMotion = event.matches;
          if (reducedMotion) {
            stopAnimation();
            cubeRoot!.rotation.z = 0;
            renderScene();
          } else {
            startAnimation();
          }
        }

        function onVisibilityChange() {
          pageVisible = !document.hidden;
          if (pageVisible) startAnimation();
          else stopAnimation();
        }

        function onPointerDown(event: PointerEvent) {
          if (event.button !== 0 || draggingPointer !== null) return;
          draggingPointer = event.pointerId;
          lastPointerX = event.clientX;
          lastPointerY = event.clientY;
          pointerStartX = event.clientX;
          pointerStartY = event.clientY;
          horizontalTouchDrag = event.pointerType === "mouse";
          activeCanvas.dataset.dragging = "true";
          activeCanvas.focus({ preventScroll: true });
          if (event.pointerType === "mouse") {
            activeCanvas.setPointerCapture(event.pointerId);
          }
        }

        function onPointerMove(event: PointerEvent) {
          if (event.pointerId !== draggingPointer) return;

          const totalX = event.clientX - pointerStartX;
          const totalY = event.clientY - pointerStartY;
          if (
            event.pointerType !== "mouse" &&
            !horizontalTouchDrag &&
            Math.abs(totalX) > Math.abs(totalY) + 5
          ) {
            horizontalTouchDrag = true;
            activeCanvas.setPointerCapture(event.pointerId);
          }

          if (!horizontalTouchDrag) return;

          const deltaX = event.clientX - lastPointerX;
          const deltaY = event.clientY - lastPointerY;
          manualYaw += deltaX * 0.009;
          manualPitch = THREE.MathUtils.clamp(
            manualPitch + deltaY * 0.006,
            -0.7,
            0.7
          );
          lastPointerX = event.clientX;
          lastPointerY = event.clientY;
          renderScene();
        }

        function finishPointerInteraction(event: PointerEvent) {
          if (event.pointerId !== draggingPointer) return;
          if (activeCanvas.hasPointerCapture(event.pointerId)) {
            activeCanvas.releasePointerCapture(event.pointerId);
          }
          draggingPointer = null;
          horizontalTouchDrag = false;
          delete activeCanvas.dataset.dragging;
        }

        function onKeyDown(event: KeyboardEvent) {
          const step = event.shiftKey ? 0.3 : 0.16;
          if (event.key === "ArrowLeft") manualYaw -= step;
          else if (event.key === "ArrowRight") manualYaw += step;
          else if (event.key === "ArrowUp") {
            manualPitch = THREE.MathUtils.clamp(manualPitch - step, -0.7, 0.7);
          } else if (event.key === "ArrowDown") {
            manualPitch = THREE.MathUtils.clamp(manualPitch + step, -0.7, 0.7);
          } else if (event.key === "Home") {
            manualYaw = 0;
            manualPitch = 0;
          } else {
            return;
          }

          event.preventDefault();
          renderScene();
        }

        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(activeFrame);
        intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            inView = entry.isIntersecting;
            if (inView) startAnimation();
            else stopAnimation();
          },
          { rootMargin: "120px" }
        );
        intersectionObserver.observe(activeFrame);

        mediaQuery.addEventListener("change", onMotionPreferenceChange);
        document.addEventListener("visibilitychange", onVisibilityChange);
        activeCanvas.addEventListener("pointerdown", onPointerDown);
        activeCanvas.addEventListener("pointermove", onPointerMove);
        activeCanvas.addEventListener("pointerup", finishPointerInteraction);
        activeCanvas.addEventListener("pointercancel", finishPointerInteraction);
        activeCanvas.addEventListener("keydown", onKeyDown);

        cleanupCallbacks.push(() => {
          mediaQuery.removeEventListener("change", onMotionPreferenceChange);
          document.removeEventListener("visibilitychange", onVisibilityChange);
          activeCanvas.removeEventListener("pointerdown", onPointerDown);
          activeCanvas.removeEventListener("pointermove", onPointerMove);
          activeCanvas.removeEventListener("pointerup", finishPointerInteraction);
          activeCanvas.removeEventListener("pointercancel", finishPointerInteraction);
          activeCanvas.removeEventListener("keydown", onKeyDown);
          shadowGeometry.dispose();
          shadowMaterial.dispose();
          cubieGeometry.dispose();
          finishTextures.forEach((texture) => texture.dispose());
          particleTexture.dispose();
          bodyMaterials.forEach((material) => {
            material.map?.dispose();
            material.dispose();
          });
          orangeMaterial.dispose();
          room.traverse((object) => {
            if (!(object instanceof THREE.Mesh)) return;
            object.geometry.dispose();
            const materials = Array.isArray(object.material)
              ? object.material
              : [object.material];
            materials.forEach((material) => material.dispose());
          });
        });

        resize();
        activeFrame.dataset.webgl = "ready";
        if (reducedMotion) renderScene();
        else startAnimation();
      } catch {
        if (!disposed && frameRef.current) {
          frameRef.current.dataset.webgl = "unavailable";
        }
      }
    }

    void initialise();

    return () => {
      disposed = true;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      cleanupCallbacks.forEach((callback) => callback());
      particles.forEach((cloud) => {
        cloud.geometry.dispose();
        const materials = Array.isArray(cloud.material)
          ? cloud.material
          : [cloud.material];
        materials.forEach((material) => material.dispose());
      });
      particles = [];
      if (scene) scene.environment = null;
      environmentTarget?.dispose();
      renderer?.dispose();
      renderer = null;
      scene = null;
      cubeRoot = null;
    };
  }, []);

  return (
    <div className="hero-cube-stage">
      <div className="rubiks-cube-frame" ref={frameRef}>
        <div className="rubiks-blob-background" aria-hidden="true">
          <span className="rubiks-blob rubiks-blob--one" />
          <span className="rubiks-blob rubiks-blob--two" />
          <span className="rubiks-blob rubiks-blob--three" />
        </div>
        <canvas
          ref={canvasRef}
          className="rubiks-cube-canvas"
          role="img"
          tabIndex={0}
          aria-label="Interactive black Rubik's Cube with one orange corner"
          aria-describedby={instructionsId}
        />
        <span className="sr-only" id={instructionsId}>
          Drag horizontally to rotate the cube. Use the arrow keys to rotate it,
          or press Home to reset its angle.
        </span>
      </div>
    </div>
  );
}
