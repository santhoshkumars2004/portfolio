import React from 'react';
import { Text } from '@react-three/drei';
import { Building } from '../world/Buildings';
import { Cat } from '../world/StreetProps';
import NPC from '../game/NPC';
import Interactable from '../game/Interactable';
import SpeechBubble from '../ui/SpeechBubble';
import { Toon, Ink } from '../toon/toon';
import { COLORS, DIALOG } from '../config';
import { actions } from '../store/gameStore';
import { sfx } from '../audio/sfx';

/**
 * ZONE 1 — HOME. The apartment with an open door, Mom watering plants outside,
 * a noticeboard pinning Santhosh's résumé, and a cat on the doorstep.
 */
export default function Zone1_Home() {
  return (
    <group>
      {/* apartment block */}
      <Building position={[0, 0, -8.8]} rotation={0} w={13} h={9} d={6} color={COLORS.cream} seed={2} door={false} />

      {/* open doorway */}
      <group position={[0, 0, -5.78]}>
        <mesh position={[0, 1.2, 0]}>
          <planeGeometry args={[1.7, 2.5]} />
          <Toon color="#23201c" />
        </mesh>
        {/* door ajar */}
        <mesh position={[-0.85, 1.2, 0.5]} rotation={[0, 0.9, 0]}>
          <boxGeometry args={[1.6, 2.5, 0.08]} />
          <Toon color={COLORS.woodDark} />
          <Ink thickness={0.014} />
        </mesh>
        {/* warm light from inside */}
        <pointLight position={[0, 1.4, 1]} color="#ffd9a0" intensity={6} distance={6} decay={2} />
        {/* nameplate */}
        <Text position={[0, 2.7, 0.02]} fontSize={0.26} color={COLORS.ink} anchorX="center" anchorY="middle">
          S. KUMAR
        </Text>
      </group>

      {/* Mom */}
      <NPC
        id="mom"
        position={[-2.8, 0, -3.7]}
        facing={0}
        dialog={DIALOG.mom}
        speaker="Mom"
        label="Talk to Mom"
        colors={{ shirt: '#B65C7A', pants: '#7a3450', hair: '#241a16' }}
        radius={2.9}
      />
      {/* planter Mom waters + watering can */}
      <group position={[-2.0, 0, -4.1]}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.9, 0.5, 0.5]} />
          <Toon color={COLORS.terracotta} />
          <Ink thickness={0.012} />
        </mesh>
        {[-0.2, 0.2].map((x, i) => (
          <mesh key={i} position={[x, 0.7, 0]} castShadow>
            <icosahedronGeometry args={[0.28, 0]} />
            <Toon color={COLORS.leaf} />
          </mesh>
        ))}
      </group>
      <group position={[-2.5, 0.9, -3.5]} rotation={[0, 0, -0.5]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.14, 0.3, 8]} />
          <Toon color={COLORS.teal} />
        </mesh>
        <mesh position={[0.14, 0.06, 0]} rotation={[0, 0, -1.1]}>
          <cylinderGeometry args={[0.02, 0.03, 0.3, 6]} />
          <Toon color={COLORS.teal} />
        </mesh>
      </group>

      {/* résumé noticeboard */}
      <Interactable
        id="resume-board"
        position={[3.4, 0, -3.7]}
        radius={2.8}
        label="Read résumé"
        hintOffset={[0, 2.5, 0]}
        onInteract={() => {
          actions.openModal('resume');
          sfx.kit?.ding();
        }}
      >
        {/* posts */}
        {[-0.9, 0.9].map((x, i) => (
          <mesh key={i} position={[x, 0.9, 0]}>
            <boxGeometry args={[0.1, 1.8, 0.1]} />
            <Toon color={COLORS.woodDark} />
          </mesh>
        ))}
        {/* cork board */}
        <mesh position={[0, 1.7, 0]} castShadow>
          <boxGeometry args={[2.2, 1.5, 0.1]} />
          <Toon color="#caa56f" />
          <Ink thickness={0.016} />
        </mesh>
        {/* pinned resume paper */}
        <mesh position={[0, 1.7, 0.07]}>
          <planeGeometry args={[1.0, 1.25]} />
          <Toon color={COLORS.white} />
        </mesh>
        <Text position={[0, 2.1, 0.09]} fontSize={0.16} color={COLORS.terracotta} anchorX="center" anchorY="middle">
          RÉSUMÉ
        </Text>
        {[0.0, -0.15, -0.3, -0.45].map((y, i) => (
          <mesh key={i} position={[0, 1.85 + y, 0.09]}>
            <planeGeometry args={[0.74, 0.05]} />
            <Toon color="#9a9384" />
          </mesh>
        ))}
        <Text position={[0.75, 2.45, 0.1]} fontSize={0.12} color={COLORS.ink} anchorX="center" anchorY="middle" rotation={[0, 0, 0.2]}>
          PINNED
        </Text>
      </Interactable>

      {/* doorstep cat (priority so it's never missed) */}
      <Interactable
        id="cat-home"
        position={[1.4, 0, -2.9]}
        radius={2.6}
        priority={5}
        label="Pet the cat"
        hintOffset={[0, 1.4, 0]}
        onInteract={() => {
          actions.openDialog('cat-home', DIALOG.cat, '🐱');
          sfx.kit?.meow();
        }}
      >
        <Cat look={0.6} />
      </Interactable>
      <SpeechBubble id="cat-home" anchor={[1.4, 1.5, -2.9]} />
    </group>
  );
}
