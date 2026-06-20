import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Stars } from '@react-three/drei';
import Interactable from '../game/Interactable';
import { Toon, Ink } from '../toon/toon';
import { COLORS, LINKS } from '../config';
import { actions, useGame } from '../store/gameStore';
import { sfx } from '../audio/sfx';

/* ---- staircase from street level up to the rooftop (x 120 → 126) ---- */
function Staircase() {
  const steps = 9;
  const top = 3.4;
  return (
    <group>
      {Array.from({ length: steps }).map((_, i) => {
        const h = (top * (i + 1)) / steps;
        const x = 120 + (6 * (i + 0.5)) / steps;
        return (
          <mesh key={i} position={[x, h / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[6 / steps + 0.04, h, 9]} />
            <Toon color={i % 2 ? '#BFB7A6' : '#C8C0AE'} />
            <Ink thickness={0.01} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ---- the building the rooftop sits on + the deck slab ---- */
function Rooftop() {
  return (
    <group>
      <mesh position={[132.5, 1.65, -2]} castShadow receiveShadow>
        <boxGeometry args={[13, 3.3, 14]} />
        <Toon color={COLORS.cream} />
        <Ink thickness={0.014} />
      </mesh>
      {/* deck */}
      <mesh position={[132.5, 3.36, 0]} receiveShadow>
        <boxGeometry args={[13, 0.16, 9.4]} />
        <Toon color="#9a8f7c" />
        <Ink thickness={0.012} />
      </mesh>
      {/* parapet walls */}
      {[
        [132.5, 4.0, 4.6, 13, 1.3, 0.3],
        [132.5, 4.0, -4.6, 13, 1.3, 0.3],
        [139.0, 4.0, 0, 0.3, 1.3, 9.4],
      ].map((p, i) => (
        <mesh key={i} position={[p[0], p[1], p[2]]}>
          <boxGeometry args={[p[3], p[4], p[5]]} />
          <Toon color={COLORS.cream} />
          <Ink thickness={0.012} />
        </mesh>
      ))}
    </group>
  );
}

/* ---- gently pulsing satellite dish ---- */
function SatelliteDish({ position }) {
  const blip = useRef();
  useFrame((s) => {
    if (blip.current) {
      const p = 0.5 + 0.5 * Math.sin(s.clock.elapsedTime * 2.2);
      blip.current.material.opacity = 0.3 + 0.7 * p;
      blip.current.scale.setScalar(0.6 + p * 0.7);
    }
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 1, 8]} />
        <Toon color={COLORS.metal} />
      </mesh>
      <mesh position={[0, 1.0, 0.1]} rotation={[-0.7, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2.4]} />
        <Toon color={COLORS.white} />
        <Ink thickness={0.012} />
      </mesh>
      <mesh ref={blip} position={[0, 1.25, 0.45]}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshBasicMaterial color={COLORS.terracotta} transparent opacity={1} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ---- the paper plane that opens the contact card ---- */
function PaperPlane() {
  const ref = useRef();
  useFrame((s) => {
    if (ref.current) {
      const t = s.clock.elapsedTime;
      ref.current.position.y = 3.85 + Math.sin(t * 1.6) * 0.12;
      ref.current.rotation.z = Math.sin(t * 1.2) * 0.12;
      ref.current.rotation.y = -0.5 + Math.sin(t * 0.8) * 0.15;
    }
  });
  return (
    <Interactable
      id="contact-plane"
      position={[129, 0, 1.8]}
      radius={3.0}
      priority={1}
      label="Read the note"
      hintOffset={[0, 4.4, 0]}
      onInteract={() => {
        actions.openModal('contact', LINKS);
        sfx.kit?.swoosh();
      }}
    >
      <group ref={ref} position={[0, 3.85, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.28, 0.9, 4]} />
          <Toon color={COLORS.white} />
          <Ink thickness={0.012} />
        </mesh>
        <mesh position={[0, -0.02, -0.2]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
          <coneGeometry args={[0.16, 0.5, 4]} />
          <Toon color="#e8e2d4" />
        </mesh>
      </group>
    </Interactable>
  );
}

/* ---- the hidden rubber duck easter egg ---- */
function RubberDuck() {
  return (
    <Interactable
      id="duck"
      position={[137.4, 0, 3.4]}
      radius={2.0}
      priority={6}
      label="...is that a duck?"
      hintOffset={[0, 4.0, 0]}
      onInteract={() => {
        actions.findDuck();
        actions.toast('🦆 You found the rubber duck! Quack!');
        sfx.kit?.quack();
      }}
    >
      <group position={[0, 3.45, 0]} scale={0.6}>
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.3, 14, 12]} />
          <Toon color={COLORS.yellow} />
          <Ink thickness={0.012} />
        </mesh>
        <mesh position={[0.05, 0.42, 0.12]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <Toon color={COLORS.yellow} />
          <Ink thickness={0.012} />
        </mesh>
        <mesh position={[0.05, 0.42, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.07, 0.16, 8]} />
          <Toon color={COLORS.terracotta} />
        </mesh>
        <mesh position={[0.13, 0.46, 0.22]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color={COLORS.ink} />
        </mesh>
      </group>
    </Interactable>
  );
}

/* ---- evening skyline silhouettes beyond the rooftop ---- */
function Skyline() {
  const boxes = useMemo(() => {
    const out = [];
    let s = 91;
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    for (let i = 0; i < 16; i++) {
      const far = rnd() > 0.5;
      out.push({
        x: 108 + rnd() * 70,
        z: (far ? 1 : -1) * (16 + rnd() * 22),
        w: 3 + rnd() * 4,
        h: 6 + rnd() * 12,
        d: 3 + rnd() * 4,
      });
    }
    return out;
  }, []);
  return (
    <group>
      {boxes.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <Toon color="#46506E" />
        </mesh>
      ))}
    </group>
  );
}

/* ---- stars, only shown once the sky has gone to evening ---- */
function EveningStars() {
  const zone = useGame((s) => s.zone);
  if (zone < 4) return null;
  return <Stars radius={120} depth={40} count={900} factor={3.5} saturation={0} fade speed={0.6} />;
}

/**
 * ZONE 6 — THE ROOFTOP. The quiet evening finale. Climb the stairs to an
 * overlook, read the paper plane to get in touch, and maybe spot a rubber duck.
 */
export default function Zone6_Rooftop() {
  const textRef = useRef();
  useFrame((s) => {
    if (textRef.current) textRef.current.position.y = 5.2 + Math.sin(s.clock.elapsedTime * 0.8) * 0.1;
  });

  return (
    <>
      <Staircase />
      <Rooftop />
      <Skyline />
      <EveningStars />

      <SatelliteDish position={[136.5, 3.44, -3.2]} />
      <PaperPlane />
      <RubberDuck />

      {/* rooftop props: water tank + AC units + a low ledge to sit on */}
      <mesh position={[134, 4.3, -3.4]} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 1.6, 14]} />
        <Toon color={COLORS.metal} />
        <Ink thickness={0.012} />
      </mesh>
      {[[130.5, -3.6], [138, 3.0]].map((p, i) => (
        <mesh key={i} position={[p[0], 3.72, p[1]]} castShadow>
          <boxGeometry args={[1.1, 0.7, 0.9]} />
          <Toon color="#aab0b6" />
          <Ink thickness={0.012} />
        </mesh>
      ))}
      <mesh position={[131, 3.66, 3.8]} castShadow>
        <boxGeometry args={[3, 0.5, 0.6]} />
        <Toon color={COLORS.wood} />
        <Ink thickness={0.012} />
      </mesh>

      {/* string lights across the deck */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[127 + i * 1.1, 4.7 - Math.sin((i / 9) * Math.PI) * 0.3, 4.3]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color={i % 2 ? COLORS.yellow : '#FFE3A3'} toneMapped={false} />
        </mesh>
      ))}

      {/* floating closing words, facing the arriving player */}
      <group ref={textRef} position={[136.5, 5.2, 0]}>
        <Text rotation={[0, -Math.PI / 2, 0]} position={[0, 0.35, 0]} fontSize={0.42} color={COLORS.white} anchorX="center" anchorY="middle" maxWidth={8} textAlign="center" outlineWidth={0.01} outlineColor={COLORS.ink}>
          Still building. Still learning. Still applying.
        </Text>
        <Text rotation={[0, -Math.PI / 2, 0]} position={[0, -0.45, 0]} fontSize={0.5} color={COLORS.yellow} anchorX="center" anchorY="middle" outlineWidth={0.012} outlineColor={COLORS.ink}>
          But I won't stop.
        </Text>
      </group>
    </>
  );
}
