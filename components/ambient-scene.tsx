"use client";

import { useEffect, useRef } from "react";

export function AmbientScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !window.WebGLRenderingContext) return;

    let cancelled = false;
    let disposeScene: (() => void) | undefined;

    void import("three").then((THREE) => {
      if (cancelled) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambientLight = new THREE.HemisphereLight(0xdde3dc, 0x131513, 1.15);
    scene.add(ambientLight);

    const orangeLight = new THREE.PointLight(0xb67d5d, 9, 16, 2);
    orangeLight.position.set(2.8, 1.4, 3.2);
    scene.add(orangeLight);

    const greenLight = new THREE.PointLight(0x8ea181, 5, 12, 2);
    greenLight.position.set(-2.2, -2.2, 2.4);
    scene.add(greenLight);

    const coreGeometry = new THREE.IcosahedronGeometry(1.46, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x344039,
      metalness: 0.22,
      roughness: 0.58,
      clearcoat: 0.18,
      clearcoatRoughness: 0.5,
      transparent: true,
      opacity: 0.58
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.scale.set(1, 1.08, 1);
    group.add(core);

    const edgeGeometry = new THREE.EdgesGeometry(coreGeometry, 24);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xc4ccc4,
      transparent: true,
      opacity: 0.16
    });
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    edges.scale.copy(core.scale);
    group.add(edges);

    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0xb67d5d,
      transparent: true,
      opacity: 0.34
    });
    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(2.08, 0.014, 8, 96),
      orbitMaterial
    );
    orbit.rotation.set(1.08, 0.2, -0.28);
    group.add(orbit);

    const secondaryOrbitMaterial = new THREE.MeshBasicMaterial({
      color: 0x91a88a,
      transparent: true,
      opacity: 0.16
    });
    const secondaryOrbit = new THREE.Mesh(
      new THREE.TorusGeometry(1.78, 0.009, 8, 72),
      secondaryOrbitMaterial
    );
    secondaryOrbit.rotation.set(0.2, 1.04, 0.72);
    group.add(secondaryOrbit);

    const pointCount = 180;
    const positions = new Float32Array(pointCount * 3);
    for (let index = 0; index < pointCount; index += 1) {
      const column = index % 18;
      const row = Math.floor(index / 18);
      positions[index * 3] = (column - 8.5) * 0.34;
      positions[index * 3 + 1] = (row - 4.5) * 0.34;
      positions[index * 3 + 2] = Math.sin(column * 0.8 + row * 0.55) * 0.18 - 1.3;
    }
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xa8b6a5,
      size: 0.018,
      transparent: true,
      opacity: 0.2,
      sizeAttenuation: true
    });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    group.add(points);

    let pointerX = 0;
    let pointerY = 0;
    let frameId = 0;
    let isVisible = true;
    const clock = new THREE.Clock();

    const placeScene = (width: number) => {
      group.position.set(width < 760 ? 0.9 : 1.55, width < 760 ? 0.5 : 0.05, 0);
      group.scale.setScalar(width < 520 ? 0.72 : width < 920 ? 0.88 : 1);
    };

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      placeScene(width);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 0.35;
      pointerY = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 0.24;
    };

    const render = () => {
      if (!isVisible) {
        frameId = window.requestAnimationFrame(render);
        return;
      }

      const elapsed = clock.getElapsedTime();
      group.rotation.y += (pointerX + elapsed * 0.045 - group.rotation.y) * 0.018;
      group.rotation.x += (-pointerY + Math.sin(elapsed * 0.32) * 0.055 - group.rotation.x) * 0.022;
      orbit.rotation.z = -0.28 + Math.sin(elapsed * 0.22) * 0.12;
      secondaryOrbit.rotation.y = 1.04 + elapsed * 0.025;
      points.rotation.z = Math.sin(elapsed * 0.18) * 0.08;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    visibilityObserver.observe(host);

    if (reduceMotion) {
      renderer.render(scene, camera);
    } else {
      host.addEventListener("pointermove", onPointerMove, { passive: true });
      render();
    }

    disposeScene = () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(frameId);
      coreGeometry.dispose();
      coreMaterial.dispose();
      edgeGeometry.dispose();
      edgeMaterial.dispose();
      orbit.geometry.dispose();
      orbitMaterial.dispose();
      secondaryOrbit.geometry.dispose();
      secondaryOrbitMaterial.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
    });

    return () => {
      cancelled = true;
      disposeScene?.();
    };
  }, []);

  return <div ref={hostRef} className="ambient-scene" aria-hidden="true" />;
}
