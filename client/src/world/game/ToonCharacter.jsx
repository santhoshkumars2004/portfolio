import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Toon, Ink } from '../toon/toon';
import { COLORS } from '../config';

const damp = THREE.MathUtils.damp;

/**
 * ToonCharacter — a parametric low-poly, cel-shaded humanoid with a big head
 * and a small body. Shared by the player and every NPC. All motion is driven
 * by `poseRef.current` so parents update one object instead of many props:
 *   { speed, moving, sitting, wave, dance, yawn, lookUp }
 */
export default function ToonCharacter({
  colors = {},
  poseRef,
  backpack = false,
  castShadow = true,
}) {
  const c = {
    shirt: colors.shirt || COLORS.white,
    pants: colors.pants || COLORS.pants,
    hair: colors.hair || COLORS.hair,
    skin: colors.skin || COLORS.skin,
    pack: colors.pack || COLORS.pack,
    shoe: colors.shoe || COLORS.ink,
  };

  const bob = useRef();
  const upper = useRef();
  const head = useRef();
  const mouth = useRef();
  const armL = useRef();
  const armR = useRef();
  const legL = useRef();
  const legR = useRef();
  const phase = useRef(0);
  const fallbackPose = useMemo(() => ({ speed: 0, moving: false }), []);

  useFrame((state, dt) => {
    const p = (poseRef && poseRef.current) || fallbackPose;
    const t = state.clock.elapsedTime;
    const moving = p.moving;
    const sp = THREE.MathUtils.clamp(p.speed || 0, 0, 1.6);
    const sitting = p.sitting;

    // gait
    const cadence = 6 + sp * 5;
    phase.current += dt * (moving ? cadence : 2);
    const swing = Math.sin(phase.current);
    const swingB = Math.sin(phase.current + Math.PI);
    const amp = moving ? Math.min(0.85, 0.4 + sp * 0.5) : 0;

    if (sitting) {
      if (legL.current) legL.current.rotation.x = damp(legL.current.rotation.x, 1.45, 8, dt);
      if (legR.current) legR.current.rotation.x = damp(legR.current.rotation.x, 1.3, 8, dt);
      if (upper.current) upper.current.rotation.x = damp(upper.current.rotation.x, -0.05, 8, dt);
      if (armL.current) armL.current.rotation.x = damp(armL.current.rotation.x, -0.25, 8, dt);
      if (armR.current) armR.current.rotation.x = damp(armR.current.rotation.x, -0.25, 8, dt);
    } else {
      if (legL.current) legL.current.rotation.x = swing * amp;
      if (legR.current) legR.current.rotation.x = swingB * amp;
      if (armL.current) armL.current.rotation.x = swingB * amp * 0.85;
      if (armR.current) armR.current.rotation.x = swing * amp * 0.85;
      // lean forward when running
      if (upper.current) {
        const lean = p.running ? 0.28 : moving ? 0.12 : 0;
        upper.current.rotation.x = damp(upper.current.rotation.x, lean, 6, dt);
      }
    }

    // bob / breathing
    if (bob.current) {
      const walkBob = moving ? Math.abs(Math.sin(phase.current)) * 0.09 * (0.5 + sp) : 0;
      const breath = Math.sin(t * 1.8) * 0.02;
      const hop = p.dance ? Math.abs(Math.sin(t * 9)) * 0.28 : 0;
      bob.current.position.y = breath + walkBob + hop;
    }

    // head idle look / look-up
    if (head.current) {
      const lookX = p.headDown ? 0.55 : p.lookUp ? -0.4 : p.yawn ? -0.2 : Math.sin(t * 0.6) * 0.04;
      const lookY = !moving && !sitting ? Math.sin(t * 0.3) * 0.25 : 0;
      head.current.rotation.x = damp(head.current.rotation.x, lookX, 4, dt);
      head.current.rotation.y = damp(head.current.rotation.y, p.headDown ? 0 : lookY, 3, dt);
    }

    // mouth (yawn)
    if (mouth.current) {
      const open = p.yawn ? 0.9 : 0.0;
      mouth.current.scale.y = damp(mouth.current.scale.y, 1 + open * 3, 6, dt);
    }

    // wave
    if (p.wave && armR.current) {
      armR.current.rotation.x = THREE.MathUtils.lerp(armR.current.rotation.x, Math.sin(t * 8) * 0.4 - 1.9, 0.3);
      armR.current.rotation.z = THREE.MathUtils.lerp(armR.current.rotation.z, 0.4, 0.2);
    } else if (armR.current && !sitting) {
      armR.current.rotation.z = THREE.MathUtils.lerp(armR.current.rotation.z, 0, 0.15);
    }

    // dance (easter egg)
    if (p.dance) {
      if (armL.current) armL.current.rotation.x = -2.2 + Math.sin(t * 12) * 0.7;
      if (armR.current) {
        armR.current.rotation.x = -2.2 + Math.cos(t * 12) * 0.7;
        armR.current.rotation.z = 0.3;
      }
      if (head.current) head.current.rotation.z = Math.sin(t * 10) * 0.2;
    } else if (head.current) {
      head.current.rotation.z = damp(head.current.rotation.z, 0, 6, dt);
    }
  });

  const Limb = ({ refObj, len, w, d, color, pos, shoe }) => (
    <group ref={refObj} position={pos}>
      <mesh position={[0, -len / 2, 0]} castShadow={castShadow}>
        <boxGeometry args={[w, len, d]} />
        <Toon color={color} />
      </mesh>
      {shoe && (
        <mesh position={[0, -len, d * 0.3]} castShadow={castShadow}>
          <boxGeometry args={[w * 1.15, w * 0.7, d * 1.7]} />
          <Toon color={c.shoe} />
        </mesh>
      )}
    </group>
  );

  return (
    <group ref={bob}>
      {/* legs */}
      <Limb refObj={legL} len={0.72} w={0.18} d={0.2} color={c.pants} pos={[-0.13, 0.72, 0]} shoe />
      <Limb refObj={legR} len={0.72} w={0.18} d={0.2} color={c.pants} pos={[0.13, 0.72, 0]} shoe />

      {/* upper body tilts as one */}
      <group ref={upper} position={[0, 0.92, 0]}>
        {/* torso */}
        <mesh position={[0, 0.28, 0]} castShadow={castShadow}>
          <boxGeometry args={[0.5, 0.6, 0.32]} />
          <Toon color={c.shirt} />
          <Ink thickness={0.02} />
        </mesh>

        {/* backpack */}
        {backpack && (
          <mesh position={[0, 0.26, -0.24]} castShadow={castShadow}>
            <boxGeometry args={[0.42, 0.5, 0.18]} />
            <Toon color={c.pack} />
            <Ink thickness={0.018} />
          </mesh>
        )}

        {/* arms */}
        <Limb refObj={armL} len={0.56} w={0.13} d={0.15} color={c.shirt} pos={[-0.32, 0.5, 0]} />
        <Limb refObj={armR} len={0.56} w={0.13} d={0.15} color={c.shirt} pos={[0.32, 0.5, 0]} />

        {/* head (intentionally big) */}
        <group ref={head} position={[0, 0.95, 0]}>
          <mesh castShadow={castShadow}>
            <boxGeometry args={[0.62, 0.6, 0.58]} />
            <Toon color={c.skin} />
            <Ink thickness={0.024} />
          </mesh>
          {/* hair */}
          <mesh position={[0, 0.27, 0]} castShadow={castShadow}>
            <boxGeometry args={[0.66, 0.22, 0.62]} />
            <Toon color={c.hair} />
          </mesh>
          <mesh position={[0, 0.06, -0.31]}>
            <boxGeometry args={[0.66, 0.5, 0.06]} />
            <Toon color={c.hair} />
          </mesh>
          {/* eyes */}
          <mesh position={[-0.14, 0.02, 0.3]}>
            <boxGeometry args={[0.08, 0.12, 0.04]} />
            <Toon color={COLORS.ink} />
          </mesh>
          <mesh position={[0.14, 0.02, 0.3]}>
            <boxGeometry args={[0.08, 0.12, 0.04]} />
            <Toon color={COLORS.ink} />
          </mesh>
          {/* mouth */}
          <mesh ref={mouth} position={[0, -0.16, 0.3]}>
            <boxGeometry args={[0.14, 0.04, 0.04]} />
            <Toon color="#7a4a3a" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
