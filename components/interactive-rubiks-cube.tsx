"use client";

import { useEffect, useId, useRef } from "react";
import type {
  Group,
  Mesh,
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
  selected: Mesh[];
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
        const [{ RoundedBoxGeometry }, { RoomEnvironment }] = await Promise.all([
          import("three/addons/geometries/RoundedBoxGeometry.js"),
          import("three/addons/environments/RoomEnvironment.js")
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
        renderer.toneMappingExposure = 0.92;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        const pmrem = new THREE.PMREMGenerator(renderer);
        const room = new RoomEnvironment();
        environmentTarget = pmrem.fromScene(room, 0.04);
        scene.environment = environmentTarget.texture;
        scene.environmentIntensity = 0.28;
        pmrem.dispose();

        const key = new THREE.DirectionalLight(0xf2efe8, 1.55);
        key.position.set(4.5, 7, 5.5);
        key.castShadow = true;
        key.shadow.mapSize.set(1024, 1024);
        key.shadow.camera.left = -6;
        key.shadow.camera.right = 6;
        key.shadow.camera.top = 6;
        key.shadow.camera.bottom = -6;
        key.shadow.camera.near = 0.1;
        key.shadow.camera.far = 20;
        key.shadow.bias = -0.0004;
        scene.add(key);

        const rim = new THREE.DirectionalLight(0xf0e0c1, 0.15);
        rim.position.set(-10, 2.5, -5);
        scene.add(rim);

        const fill = new THREE.DirectionalLight(0x6a7368, 0.32);
        fill.position.set(-3, -1, 4);
        scene.add(fill);
        scene.add(new THREE.HemisphereLight(0xb8bbb4, 0x080908, 0.35));

        const floorGeometry = new THREE.PlaneGeometry(30, 30);
        const floorMaterial = new THREE.ShadowMaterial({
          color: 0x000000,
          opacity: 0.25
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -6.35;
        floor.receiveShadow = true;
        scene.add(floor);

        cubeRoot = new THREE.Group();
        const cubeGroup = new THREE.Group();
        cubeRoot.add(cubeGroup);
        scene.add(cubeRoot);

        const sandpaperMap = (() => {
          const size = 32;
          const data = new Uint8Array(size * size);
          let seed = 90210;
          const random = () => {
            seed = (seed * 16807) % 2147483647;
            return (seed - 1) / 2147483646;
          };
          for (let index = 0; index < data.length; index += 1) {
            data[index] = Math.floor(110 + random() * 110);
          }
          const texture = new THREE.DataTexture(data, size, size, THREE.RedFormat);
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(3.2, 3.2);
          texture.needsUpdate = true;
          return texture;
        })();

        const cubieSize = 0.92;
        const spacing = cubieSize + 0.35;
        const geometry = new RoundedBoxGeometry(cubieSize, cubieSize, cubieSize, 6, 0.04);
        const blackMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x121412,
          metalness: 0.25,
          roughness: 0.55,
          clearcoat: 0.1,
          clearcoatRoughness: 0.3,
          // bumpMap: sandpaperMap,
          // bumpScale: 0.4,
          envMapIntensity: 0.28
        });
        const orangeMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xff5722,
          metalness: 0,
          roughness: 0.98,
          bumpMap: sandpaperMap,
          bumpScale: 0.045,
          envMapIntensity: 0.12
        });

        const cubies: Mesh[] = [];
        for (let x = -1; x <= 1; x += 1) {
          for (let y = -1; y <= 1; y += 1) {
            for (let z = -1; z <= 1; z += 1) {
              if (x === 0 && y === 0 && z === 0) continue;

              const material = x === 1 && y === 1 && z === 1
                ? orangeMaterial
                : blackMaterial;
              const cubie = new THREE.Mesh(geometry, material);
              cubie.position.set(x * spacing, y * spacing, z * spacing);
              cubie.castShadow = true;
              cubie.receiveShadow = true;
              cubie.userData.coord = new THREE.Vector3(x, y, z);
              cubies.push(cubie);
              cubeGroup.add(cubie);
            }
          }
        }

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
            transparent: true,
            opacity,
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

        function snapCubie(cubie: Mesh) {
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
        let userActiveUntil = 0;
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
          key.shadow.mapSize.set(width < 560 ? 512 : 1024, width < 560 ? 512 : 1024);
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

          if (now >= userActiveUntil) {
            timelineTime += delta * 1000;
            advanceChoreography(timelineTime);
            ambientYaw += delta * 0.105;
          }

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
          userActiveUntil = Number.POSITIVE_INFINITY;
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
          userActiveUntil = performance.now() + 1500;
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
          userActiveUntil = performance.now() + 1500;
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
          floorGeometry.dispose();
          floorMaterial.dispose();
          geometry.dispose();
          sandpaperMap.dispose();
          blackMaterial.dispose();
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
        <div className="rubiks-blob-fallback" aria-hidden="true">
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
