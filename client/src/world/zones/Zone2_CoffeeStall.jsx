import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import NPC from '../game/NPC';
import { Toon, Ink } from '../toon/toon';
import { COLORS, DIALOG, CHAI_MENU } from '../config';

function Steam({ position }) {
  const a = useRef();
  const b = useRef();
  const c = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const puffs = [a.current, b.current, c.current];
    puffs.forEach((m, i) => {
      if (!m) return;
      const p = ((t * 0.5 + i * 0.4) % 1);
      m.position.y = p * 1.2;
      m.position.x = Math.sin((p + i) * 4) * 0.12;
      const s = 0.12 + p * 0.22;
      m.scale.setScalar(s);
      m.material.opacity = 0.5 * (1 - p);
    });
  });
  return (
    <group position={position}>
      {[a, b, c].map((r, i) => (
        <mesh key={i} ref={r}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color={COLORS.white} transparent opacity={0.4} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * ZONE 2 — THE CHAI STALL. A roadside tea stall with a striped awning, a menu
 * board listing Santhosh's "blend" (skills), and a chatty chai uncle.
 */
export default function Zone2_CoffeeStall() {
  return (
    <>
      <group position={[26, 0, 0]}>
      {/* counter */}
      <mesh position={[0, 0.55, -3.4]} castShadow receiveShadow>
        <boxGeometry args={[6, 1.1, 1.3]} />
        <Toon color={COLORS.wood} />
        <Ink thickness={0.012} />
      </mesh>
      {/* countertop */}
      <mesh position={[0, 1.16, -3.3]} castShadow>
        <boxGeometry args={[6.3, 0.12, 1.6]} />
        <Toon color={COLORS.woodDark} />
        <Ink thickness={0.012} />
      </mesh>

      {/* posts + striped awning */}
      {[-2.9, 2.9].map((x, i) => (
        <mesh key={i} position={[x, 1.5, -4.0]}>
          <cylinderGeometry args={[0.08, 0.08, 3, 8]} />
          <Toon color={COLORS.woodDark} />
        </mesh>
      ))}
      <group position={[0, 2.9, -3.4]} rotation={[0.32, 0, 0]}>
        {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} castShadow>
            <boxGeometry args={[1, 0.08, 2.2]} />
            <Toon color={i % 2 ? COLORS.terracotta : COLORS.cream} />
          </mesh>
        ))}
        <Ink thickness={0.01} />
      </group>

      {/* back wall + menu board */}
      <mesh position={[0, 2.0, -4.6]}>
        <boxGeometry args={[6.2, 4, 0.2]} />
        <Toon color={COLORS.brick} />
        <Ink thickness={0.012} />
      </mesh>
      <mesh position={[0, 2.4, -4.45]}>
        <boxGeometry args={[3.4, 2.2, 0.08]} />
        <Toon color={COLORS.ink} />
      </mesh>
      <Text position={[0, 3.2, -4.4]} fontSize={0.3} color={COLORS.yellow} anchorX="center" anchorY="middle">
        CHAI MENU
      </Text>
      {CHAI_MENU.map((line, i) => (
        <Text
          key={i}
          position={[0, 2.6 - i * 0.42, -4.4]}
          fontSize={0.2}
          color={COLORS.white}
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
        >
          {line}
        </Text>
      ))}

      {/* kettle + steam */}
      <mesh position={[-2, 1.4, -3.3]} castShadow>
        <cylinderGeometry args={[0.32, 0.36, 0.5, 12]} />
        <Toon color={COLORS.metal} />
        <Ink thickness={0.012} />
      </mesh>
      <Steam position={[-2, 1.7, -3.3]} />

      {/* cups */}
      {[-0.6, -0.2, 0.2].map((x, i) => (
        <mesh key={i} position={[x, 1.32, -3.0]} castShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.16, 10]} />
          <Toon color={COLORS.white} />
        </mesh>
      ))}
      </group>

      {/* chai uncle behind the counter (absolute coords for interaction registry) */}
      <NPC
        id="chai"
        position={[26.5, 0, -3.9]}
        facing={0}
        dialog={DIALOG.chai}
        speaker="Chai Uncle"
        label="Order a chai"
        colors={{ shirt: '#D98C45', pants: '#5a4632', hair: '#1c1712' }}
        radius={3.2}
        bubbleAnchor={[0, 3.1, 0]}
      />
    </>
  );
}
