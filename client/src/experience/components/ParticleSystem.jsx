import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PALETTE } from '../config';

/**
 * ParticleSystem — atmospheric neon rain + floating data motes.
 * Both recenter on the camera each frame so the effect always surrounds the
 * character as it travels down the street. Counts scale down on mobile.
 */
const ParticleSystem = ({ mobile = false }) => {
  const rainCount = mobile ? 280 : 700;
  const moteCount = mobile ? 160 : 420;

  const rainRef = useRef();
  const moteRef = useRef();

  // Rain: vertical line segments (pairs of points).
  const rain = useMemo(() => {
    const positions = new Float32Array(rainCount * 2 * 3);
    const speeds = new Float32Array(rainCount);
    for (let i = 0; i < rainCount; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = Math.random() * 40;
      const z = (Math.random() - 0.5) * 50;
      const len = Math.random() * 0.8 + 0.4;
      positions[i * 6 + 0] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;
      positions[i * 6 + 3] = x;
      positions[i * 6 + 4] = y - len;
      positions[i * 6 + 5] = z;
      speeds[i] = Math.random() * 18 + 14;
    }
    return { positions, speeds };
  }, [rainCount]);

  // Data motes: points drifting upward.
  const motes = useMemo(() => {
    const positions = new Float32Array(moteCount * 3);
    const speeds = new Float32Array(moteCount);
    for (let i = 0; i < moteCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      speeds[i] = Math.random() * 1.2 + 0.3;
    }
    return { positions, speeds };
  }, [moteCount]);

  useFrame((state, delta) => {
    const cam = state.camera.position;

    // Rain
    if (rainRef.current) {
      const pos = rainRef.current.geometry.attributes.position.array;
      for (let i = 0; i < rainCount; i++) {
        const drop = rain.speeds[i] * delta;
        pos[i * 6 + 1] -= drop;
        pos[i * 6 + 4] -= drop;
        if (pos[i * 6 + 1] < cam.y - 6) {
          const x = cam.x + (Math.random() - 0.5) * 50;
          const z = cam.z + (Math.random() - 0.5) * 50;
          const top = cam.y + 30;
          const len = Math.random() * 0.8 + 0.4;
          pos[i * 6 + 0] = x;
          pos[i * 6 + 1] = top;
          pos[i * 6 + 2] = z;
          pos[i * 6 + 3] = x;
          pos[i * 6 + 4] = top - len;
          pos[i * 6 + 5] = z;
        }
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Motes
    if (moteRef.current) {
      const pos = moteRef.current.geometry.attributes.position.array;
      for (let i = 0; i < moteCount; i++) {
        pos[i * 3 + 1] += motes.speeds[i] * delta;
        pos[i * 3 + 0] += Math.sin(state.clock.elapsedTime + i) * 0.002;
        if (pos[i * 3 + 1] > cam.y + 26) {
          pos[i * 3 + 0] = cam.x + (Math.random() - 0.5) * 50;
          pos[i * 3 + 1] = cam.y - 6;
          pos[i * 3 + 2] = cam.z + (Math.random() - 0.5) * 50;
        }
      }
      moteRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <lineSegments ref={rainRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={rain.positions.length / 3}
            array={rain.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={PALETTE.cyan} transparent opacity={0.25} toneMapped={false} />
      </lineSegments>

      <points ref={moteRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={motes.positions.length / 3}
            array={motes.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={PALETTE.cyan}
          size={0.07}
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
};

export default ParticleSystem;
