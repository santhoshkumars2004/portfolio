import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * HeroExperience3D
 * A performant, interactive WebGL backdrop built with Three.js + react-three-fiber.
 * - A morphing "core" orb (distorted icosahedron) in the slate / electric-blue palette
 * - A counter-rotating wireframe shell for depth
 * - Orbiting geometric accents
 * - A parallax particle swarm + sparkles
 * - Mouse-reactive camera parallax (works even though the canvas is pointer-events-none)
 * Degrades gracefully on mobile and respects prefers-reduced-motion.
 */

// Shared, normalized pointer (-1..1) updated from the window so parallax works
// even though the canvas sits behind the content with pointer-events disabled.
const usePointer = () => {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (clientX, clientY) => {
      pointer.current.x = (clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((clientY / window.innerHeight) * 2 - 1);
    };
    const onMouse = (e) => handleMove(e.clientX, e.clientY);
    const onTouch = (e) => {
      if (e.touches && e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return pointer;
};

// Camera rig: smoothly eases the camera toward the pointer for a parallax feel.
const Rig = ({ pointer, intensity = 0.7 }) => {
  useFrame((state, delta) => {
    const damp = Math.min(1, delta * 2.2);
    const targetX = pointer.current.x * intensity;
    const targetY = pointer.current.y * (intensity * 0.6);
    state.camera.position.x += (targetX - state.camera.position.x) * damp;
    state.camera.position.y += (targetY - state.camera.position.y) * damp;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// The central morphing orb.
const CoreOrb = ({ detail = 6, reducedMotion = false }) => {
  const ref = useRef();

  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * 0.14;
    ref.current.rotation.x += delta * 0.05;
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.35, detail]} />
        <MeshDistortMaterial
          color="#1d4ed8"
          emissive="#0e7490"
          emissiveIntensity={0.35}
          roughness={0.18}
          metalness={0.65}
          distort={reducedMotion ? 0.18 : 0.38}
          speed={reducedMotion ? 0 : 1.7}
        />
      </mesh>
    </Float>
  );
};

// A translucent wireframe shell that counter-rotates around the orb.
const WireShell = ({ reducedMotion = false }) => {
  const ref = useRef();

  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y -= delta * 0.1;
    ref.current.rotation.z += delta * 0.04;
  });

  return (
    <mesh ref={ref} scale={1.95}>
      <icosahedronGeometry args={[1.35, 1]} />
      <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.12} />
    </mesh>
  );
};

// Small geometric accents orbiting the core.
const OrbitingAccents = ({ reducedMotion = false }) => {
  const group = useRef();

  useFrame((_, delta) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y += delta * 0.18;
  });

  const accents = useMemo(
    () => [
      { pos: [2.8, 0.6, -0.5], color: '#3b82f6', geo: 'octa', size: 0.26 },
      { pos: [-2.9, -0.4, 0.4], color: '#22d3ee', geo: 'tetra', size: 0.3 },
      { pos: [0.4, 2.4, -1.2], color: '#60a5fa', geo: 'octa', size: 0.22 },
      { pos: [-0.8, -2.5, -0.8], color: '#0ea5e9', geo: 'tetra', size: 0.24 },
    ],
    []
  );

  return (
    <group ref={group}>
      {accents.map((a, i) => (
        <Float key={i} speed={1.4} rotationIntensity={0.8} floatIntensity={1.1}>
          <mesh position={a.pos}>
            {a.geo === 'octa' ? (
              <octahedronGeometry args={[a.size, 0]} />
            ) : (
              <tetrahedronGeometry args={[a.size, 0]} />
            )}
            <meshStandardMaterial
              color={a.color}
              emissive={a.color}
              emissiveIntensity={0.4}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Parallax particle swarm built from a single buffer for performance.
const ParticleSwarm = ({ count = 900, reducedMotion = false }) => {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread particles in a wide, shallow volume for depth.
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * 0.015;
    ref.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#7dd3fc"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const Scene = ({ pointer, quality }) => {
  const { detail, particles, sparkles, reducedMotion } = quality;

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[6, 6, 6]} intensity={1.1} color="#3b82f6" />
      <pointLight position={[-6, -4, -4]} intensity={0.6} color="#22d3ee" />
      <spotLight position={[0, 8, 4]} intensity={0.7} angle={0.5} penumbra={1} color="#ffffff" />

      <CoreOrb detail={detail} reducedMotion={reducedMotion} />
      <WireShell reducedMotion={reducedMotion} />
      <OrbitingAccents reducedMotion={reducedMotion} />
      <ParticleSwarm count={particles} reducedMotion={reducedMotion} />

      {sparkles > 0 && (
        <Sparkles
          count={sparkles}
          scale={[14, 9, 6]}
          size={2.2}
          speed={reducedMotion ? 0 : 0.35}
          opacity={0.7}
          color="#67e8f9"
        />
      )}

      <Rig pointer={pointer} />
    </>
  );
};

const HeroExperience3D = () => {
  const pointer = usePointer();
  const [quality, setQuality] = useState(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setQuality({
      reducedMotion,
      detail: isMobile ? 4 : 6,
      particles: isMobile ? 350 : 900,
      sparkles: isMobile ? 0 : 70,
      dpr: isMobile ? [1, 1.2] : [1, 1.8],
    });
  }, []);

  if (!quality) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={quality.dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene pointer={pointer} quality={quality} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroExperience3D;
