import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PALETTE, TRAVEL } from '../config';

/**
 * Character — a procedural low-poly cyber-runner built entirely from primitives
 * (no external GLB needed). Animates a run cycle, idle breathing, and a few
 * zone-specific actions (wave, punch, look-up) driven by the shared scroll ref.
 *
 * Props:
 *  - liveRef: ref from useScrollZone ({ offset, velocity, zone, moving })
 *  - cheatRef: ref holding { active: boolean, start: number } for the easter egg
 *  - onClick: click handler (easter-egg counter)
 */
const Character = React.forwardRef(({ liveRef, cheatRef, onClick }, externalRef) => {
  const root = useRef();
  const bob = useRef();
  const torso = useRef();
  const head = useRef();
  const armL = useRef();
  const armR = useRef();
  const legL = useRef();
  const legR = useRef();
  const cap = useRef();
  const visor = useRef();

  // expose root to parent (camera rig follows it)
  React.useImperativeHandle(externalRef, () => root.current);

  const runAmt = useRef(0); // 0 idle .. 1 running
  const phase = useRef(0);

  const mats = useMemo(() => {
    return {
      body: new THREE.MeshStandardMaterial({
        color: PALETTE.deepNavy,
        metalness: 0.6,
        roughness: 0.35,
      }),
      accent: new THREE.MeshStandardMaterial({
        color: PALETTE.cyan,
        emissive: new THREE.Color(PALETTE.cyan),
        emissiveIntensity: 1.6,
        metalness: 0.3,
        roughness: 0.2,
      }),
      accent2: new THREE.MeshStandardMaterial({
        color: PALETTE.purple,
        emissive: new THREE.Color(PALETTE.purple),
        emissiveIntensity: 1.2,
        metalness: 0.3,
        roughness: 0.25,
      }),
      visor: new THREE.MeshStandardMaterial({
        color: PALETTE.cyan,
        emissive: new THREE.Color(PALETTE.cyan),
        emissiveIntensity: 2.4,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    if (!root.current) return;
    const live = liveRef.current;
    const t = state.clock.elapsedTime;

    // Forward travel along -Z, synced to scroll offset.
    const targetZ = -live.offset * TRAVEL;
    root.current.position.z += (targetZ - root.current.position.z) * Math.min(1, delta * 6);
    root.current.position.x = 0;

    // Run/idle blend.
    const wantRun = live.moving ? 1 : 0;
    runAmt.current += (wantRun - runAmt.current) * Math.min(1, delta * 6);
    const run = runAmt.current;

    // Cadence: faster when scrolling hard.
    const speed = 9 + Math.min(Math.abs(live.velocity) * 30, 8);
    phase.current += delta * speed * (0.35 + run);
    const p = phase.current;

    const swing = Math.sin(p);
    const swing2 = Math.sin(p + Math.PI);

    // Legs: opposite-phase swing scaled by run amount.
    if (legL.current) legL.current.rotation.x = swing * 0.9 * run;
    if (legR.current) legR.current.rotation.x = swing2 * 0.9 * run;

    // Arms: opposite to legs.
    const zone = live.zone;
    const armBase = 0.7 * run;
    if (armL.current) armL.current.rotation.x = swing2 * armBase;
    if (armR.current) armR.current.rotation.x = swing * armBase;

    // Vertical bob + slight forward lean while running.
    if (bob.current) {
      const idleBreath = Math.sin(t * 1.6) * 0.03;
      bob.current.position.y = Math.abs(Math.sin(p)) * 0.12 * run + idleBreath;
      bob.current.rotation.x = run * 0.12;
    }

    // --- Zone actions (only assert strongly when not sprinting) ---
    const calm = 1 - run;

    // Zone 0 — wave hello with right arm when idle at the start.
    if (zone === 0 && calm > 0.4 && armR.current) {
      const wave = Math.sin(t * 6) * 0.5 - 1.6;
      armR.current.rotation.x = THREE.MathUtils.lerp(armR.current.rotation.x, wave, calm * 0.6);
      armR.current.rotation.z = THREE.MathUtils.lerp(armR.current.rotation.z, 0.3, calm * 0.6);
    } else if (armR.current) {
      armR.current.rotation.z = THREE.MathUtils.lerp(armR.current.rotation.z, 0, 0.2);
    }

    // Zone 1 — punch the skill orbs.
    if (zone === 1 && armR.current) {
      const punch = (Math.sin(t * 5) > 0.6 ? 1 : 0) * calm;
      armR.current.rotation.x = THREE.MathUtils.lerp(
        armR.current.rotation.x,
        -1.8 * punch,
        0.4
      );
    }

    // Zone 4 — look up at the stars.
    if (head.current) {
      const lookUp = zone === 4 ? calm * -0.5 : 0;
      head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, lookUp, 0.1);
    }

    // Zone 3 — graduation cap appears, then fades to a Cisco-blue glow.
    if (cap.current) {
      const show = zone === 3 ? 1 : 0;
      cap.current.scale.setScalar(
        THREE.MathUtils.lerp(cap.current.scale.x, show, Math.min(1, delta * 5))
      );
      cap.current.visible = cap.current.scale.x > 0.02;
    }

    // Face the camera a touch at the very start (look at viewer).
    const faceCam = zone === 0 ? calm * 0.5 : 0;
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, faceCam, 0.05);

    // --- Easter egg: cheat-code spin + glow ---
    const cheat = cheatRef.current;
    if (cheat.active) {
      if (cheat.start == null) cheat.start = t;
      const elapsed = t - cheat.start;
      if (elapsed < 2.6) {
        root.current.rotation.y += delta * 14;
        const pulse = 1 + Math.sin(elapsed * 18) * 0.12;
        bob.current.scale.setScalar(pulse);
        mats.accent.emissiveIntensity = 2 + Math.sin(elapsed * 20) * 1.5;
        mats.visor.emissiveIntensity = 3 + Math.sin(elapsed * 25) * 2;
      } else {
        cheat.active = false;
        cheat.start = null;
        bob.current.scale.setScalar(1);
        mats.accent.emissiveIntensity = 1.6;
        mats.visor.emissiveIntensity = 2.4;
        root.current.rotation.y = 0;
      }
    }

    // Visor flicker for life.
    if (visor.current) {
      mats.visor.emissiveIntensity = (cheat.active ? mats.visor.emissiveIntensity : 2.2) + Math.sin(t * 12) * 0.2;
    }
  });

  // Helper: a limb that pivots from its top.
  const Limb = React.forwardRef(({ length, width, depth, material, position }, ref) => (
    <group ref={ref} position={position}>
      <mesh position={[0, -length / 2, 0]} material={material} castShadow>
        <boxGeometry args={[width, length, depth]} />
      </mesh>
    </group>
  ));

  return (
    <group
      ref={root}
      position={[0, 0, 0]}
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'none';
      }}
    >
      {/* bob group carries breathing + run bounce */}
      <group ref={bob} position={[0, 1.05, 0]}>
        {/* Torso */}
        <mesh ref={torso} position={[0, 0.4, 0]} material={mats.body} castShadow>
          <boxGeometry args={[0.62, 0.8, 0.36]} />
        </mesh>
        {/* Chest accent line */}
        <mesh position={[0, 0.46, 0.19]} material={mats.accent}>
          <boxGeometry args={[0.4, 0.08, 0.04]} />
        </mesh>
        <mesh position={[0, 0.26, 0.19]} material={mats.accent2}>
          <boxGeometry args={[0.22, 0.05, 0.04]} />
        </mesh>

        {/* Hips */}
        <mesh position={[0, -0.02, 0]} material={mats.body} castShadow>
          <boxGeometry args={[0.56, 0.26, 0.34]} />
        </mesh>

        {/* Head */}
        <group ref={head} position={[0, 0.96, 0]}>
          <mesh material={mats.body} castShadow>
            <boxGeometry args={[0.42, 0.42, 0.42]} />
          </mesh>
          {/* Visor */}
          <mesh ref={visor} position={[0, 0.02, 0.21]} material={mats.visor}>
            <boxGeometry args={[0.34, 0.1, 0.05]} />
          </mesh>
          {/* Graduation cap (zone 4) */}
          <group ref={cap} position={[0, 0.28, 0]} scale={0}>
            <mesh material={mats.accent2}>
              <boxGeometry args={[0.5, 0.06, 0.5]} />
            </mesh>
            <mesh position={[0, -0.08, 0]} material={mats.body}>
              <cylinderGeometry args={[0.16, 0.18, 0.12, 8]} />
            </mesh>
            <mesh position={[0.18, 0.04, 0.18]} material={mats.accent}>
              <sphereGeometry args={[0.04, 8, 8]} />
            </mesh>
          </group>
        </group>

        {/* Shoulders + arms */}
        <Limb ref={armL} length={0.7} width={0.16} depth={0.16} material={mats.body} position={[-0.42, 0.72, 0]} />
        <Limb ref={armR} length={0.7} width={0.16} depth={0.16} material={mats.body} position={[0.42, 0.72, 0]} />

        {/* Legs */}
        <Limb ref={legL} length={0.8} width={0.2} depth={0.2} material={mats.body} position={[-0.16, -0.05, 0]} />
        <Limb ref={legR} length={0.8} width={0.2} depth={0.2} material={mats.body} position={[0.16, -0.05, 0]} />
      </group>

      {/* Neon ground halo that travels with the character */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[1.1, 32]} />
        <meshBasicMaterial color={PALETTE.cyan} transparent opacity={0.12} />
      </mesh>
    </group>
  );
});

export default Character;
