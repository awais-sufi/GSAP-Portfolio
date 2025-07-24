"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FlowingParticlesBackground() {
  const containerRef = useRef(null);
  const animationRef = useRef();
  const particlesRef = useRef();
  const mouseOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let scene, camera, renderer;

    const init = () => {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.z = 200;

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);

      const geometry = new THREE.BufferGeometry();
      const positions = [];
      const colors = [];

      const colorTop = new THREE.Color(0xff66cc); // pink
      const colorBottom = new THREE.Color(0x66ccff); // blue

      const count = 1500;
      for (let i = 0; i < count; i++) {
        const x = THREE.MathUtils.randFloatSpread(800);
        const y = THREE.MathUtils.randFloatSpread(800);
        const z = THREE.MathUtils.randFloatSpread(800);
        positions.push(x, y, z);

        const blend = (y + 400) / 800;
        const color = colorBottom.clone().lerp(colorTop, blend);
        colors.push(color.r, color.g, color.b);
      }

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );

      const material = new THREE.PointsMaterial({
        size: 1.4,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      particlesRef.current = particles;
      scene.add(particles);

      animate();
    };

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const particles = particlesRef.current;

      if (particles) {
        // Always-rotating base
        particles.rotation.y += 0.0007;
        particles.rotation.x += 0.0004;

        // Add a bit of dynamic rotation based on last mouse offset
        particles.rotation.y += mouseOffset.current.x * 0.0005;
        particles.rotation.x += mouseOffset.current.y * 0.0003;
      }

      renderer.render(scene, camera);
    };

    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseOffset.current.x = x;
      mouseOffset.current.y = y;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    init();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#000",
        zIndex: -10,
      }}
    />
  );
}
