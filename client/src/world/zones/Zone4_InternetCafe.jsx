import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import NPC from '../game/NPC';
import Interactable from '../game/Interactable';
import { Toon, Ink } from '../toon/toon';
import { COLORS, PROJECTS } from '../config';
import { actions } from '../store/gameStore';
import { sfx } from '../audio/sfx';

const X = 76;

/** A GitHub-style contribution graph baked into a canvas texture. */
function useCommitGraph() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 280;
    c.height = 88;
    const g = c.getContext('2d');
    g.fillStyle = '#14181c';
    g.fillRect(0, 0, c.width, c.height);
    const greens = ['#1c2620', '#2e6b3f', '#3fae5a', '#57d977', '#9bf2ad'];
    let s = 7;
    const rnd = () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    };
    for (let col = 0; col < 52; col++) {
      for (let row = 0; row < 7; row++) {
        const lvl = Math.min(4, Math.floor(rnd() * rnd() * 5.5));
        g.fillStyle = greens[lvl];
        g.fillRect(6 + col * 5.1, 8 + row * 5.1 * 1.4, 4, 4 * 1.4);
      }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Monitor({ position, rotation, w = 1.6, h = 1.0, children, screen = '#0f1620' }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={[w + 0.12, h + 0.12, 0.08]} />
        <Toon color={COLORS.ink} />
        <Ink thickness={0.012} />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial color={screen} />
      </mesh>
      {children}
    </group>
  );
}

/**
 * ZONE 4 — STACKSENSE LABS. A 24/7 internet café where a focused Santhosh hacks
 * at a glowing terminal. The PC opens the StackSense project; the wall monitors
 * show a live commit graph and code.
 */
export default function Zone4_InternetCafe() {
  const graph = useCommitGraph();

  return (
    <>
      {/* tiled floor */}
      <mesh position={[X, 0.02, 6.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 6.4]} />
        <Toon color="#46505a" />
      </mesh>

      {/* shell: side + back walls + roof */}
      {[70, 82].map((wx, i) => (
        <mesh key={i} position={[wx, 2.2, 6.2]} castShadow>
          <boxGeometry args={[0.3, 4.4, 6.4]} />
          <Toon color="#3a444e" />
          <Ink thickness={0.012} />
        </mesh>
      ))}
      <mesh position={[X, 2.2, 9.3]} castShadow>
        <boxGeometry args={[12.3, 4.4, 0.3]} />
        <Toon color="#2f3841" />
        <Ink thickness={0.012} />
      </mesh>
      <mesh position={[X, 4.5, 6.2]}>
        <boxGeometry args={[12.3, 0.3, 6.7]} />
        <Toon color="#262d35" />
        <Ink thickness={0.012} />
      </mesh>

      {/* neon sign over the entrance */}
      <mesh position={[X, 4.0, 3.05]}>
        <boxGeometry args={[11.5, 1.1, 0.18]} />
        <Toon color={COLORS.ink} />
        <Ink thickness={0.014} />
      </mesh>
      <Text position={[X, 4.15, 2.94]} rotation={[0, Math.PI, 0]} fontSize={0.46} color={COLORS.teal} anchorX="center" anchorY="middle" letterSpacing={0.04}>
        STACKSENSE LABS
      </Text>
      <Text position={[X, 3.6, 2.94]} rotation={[0, Math.PI, 0]} fontSize={0.26} color={COLORS.yellow} anchorX="center" anchorY="middle">
        Open 24 / 7
      </Text>

      {/* interior glow */}
      <pointLight position={[X, 3.6, 6.5]} color="#56CCF2" intensity={9} distance={11} decay={2} />
      <pointLight position={[X, 1.6, 8]} color="#9bf2ad" intensity={5} distance={6} decay={2} />

      {/* desk */}
      <mesh position={[X, 0.95, 8.4]} castShadow receiveShadow>
        <boxGeometry args={[7, 0.16, 1.2]} />
        <Toon color={COLORS.woodDark} />
        <Ink thickness={0.012} />
      </mesh>
      {[X - 3.2, X + 3.2].map((lx, i) => (
        <mesh key={i} position={[lx, 0.45, 8.4]}>
          <boxGeometry args={[0.16, 0.9, 1]} />
          <Toon color={COLORS.woodDark} />
        </mesh>
      ))}

      {/* wall monitors */}
      <Monitor position={[X - 3.4, 2.8, 9.05]} rotation={[0, Math.PI, 0]} w={2.0} h={1.2}>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[1.8, 0.62]} />
          <meshBasicMaterial map={graph} toneMapped={false} />
        </mesh>
        <Text position={[0, -0.42, 0.07]} fontSize={0.13} color="#9bf2ad" anchorX="center" anchorY="middle">
          1,200+ commits this year
        </Text>
      </Monitor>

      <Monitor position={[X + 3.4, 2.8, 9.05]} rotation={[0, Math.PI, 0]} w={2.0} h={1.2}>
        {['def answer(q, repo):', '  ctx = retrieve(q, repo)', '  return llm(ctx, q)  # grounded', '', '>>> ship it.'].map((ln, i) => (
          <Text key={i} position={[-0.82, 0.36 - i * 0.2, 0.07]} fontSize={0.105} color="#7FE0A0" anchorX="left" anchorY="middle">
            {ln}
          </Text>
        ))}
      </Monitor>

      {/* desk monitor (the interactive PC) */}
      <Monitor position={[X, 1.85, 8.55]} rotation={[0, Math.PI, 0]} w={1.5} h={0.95} screen="#0b1b14">
        <Text position={[0, 0.16, 0.07]} fontSize={0.16} color={COLORS.yellow} anchorX="center" anchorY="middle">
          StackSense
        </Text>
        <Text position={[0, -0.12, 0.07]} fontSize={0.1} color="#7FE0A0" anchorX="center" anchorY="middle">
          ask any codebase ▸
        </Text>
      </Monitor>
      <mesh position={[X, 1.06, 8.2]}>
        <boxGeometry args={[0.7, 0.04, 0.26]} />
        <Toon color={COLORS.ink} />
      </mesh>

      {/* seated Santhosh, focused on the screen */}
      <NPC
        id="cafe-santhosh"
        position={[X, 0, 7.5]}
        facing={0}
        interactive={false}
        colors={{ shirt: '#5B8C82', pants: '#2B3340', hair: '#2E2620' }}
        poseExtra={{ sitting: true }}
      />
      {/* stool */}
      <mesh position={[X, 0.5, 7.4]}>
        <cylinderGeometry args={[0.28, 0.28, 0.12, 14]} />
        <Toon color={COLORS.terracotta} />
        <Ink thickness={0.012} />
      </mesh>

      {/* interactable PC */}
      <Interactable
        id="pc-stacksense"
        position={[X, 0, 7.9]}
        radius={2.8}
        label="Open StackSense"
        hintOffset={[0, 2.4, 0]}
        onInteract={() => {
          actions.openModal('project', PROJECTS.stacksense);
          sfx.kit?.ding();
        }}
      />

      {/* a quiet hint NPC line via café owner could go here; keep it minimal */}
      <Text position={[X, 0.06, 4.2]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.34} color="#5a646e" anchorX="center" anchorY="middle">
        — terminals open all night —
      </Text>
    </>
  );
}
