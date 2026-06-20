import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import NPC from '../game/NPC';
import Interactable from '../game/Interactable';
import SpeechBubble from '../ui/SpeechBubble';
import { Toon, Ink } from '../toon/toon';
import { COLORS, DIALOG, JOBS } from '../config';
import { actions } from '../store/gameStore';
import { sfx } from '../audio/sfx';

const X = 100;
const FLIP = [0, Math.PI, 0]; // text on this +Z wall must face -Z toward the player

function BlinkDot({ position, color = '#F2994A' }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.material.opacity = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 4));
  });
  return (
    <mesh ref={ref} position={position}>
      <circleGeometry args={[0.12, 16]} />
      <meshBasicMaterial color={color} transparent opacity={1} toneMapped={false} />
    </mesh>
  );
}

/** A pinned job application that announces its status when interacted with. */
function JobPin({ id, x, job }) {
  return (
    <>
      <Interactable
        id={id}
        position={[x, 0, 4.0]}
        radius={2.6}
        label={`Check: ${job.label}`}
        hintOffset={[0, 2.7, 0]}
        onInteract={() => {
          actions.openDialog(id, [job.label, `Status: ${job.status}`, 'Applied. Waiting to hear back.'], 'My Applications');
          sfx.kit?.ding();
        }}
      >
        {/* paper */}
        <mesh position={[0, 2.2, -0.16]} rotation={FLIP}>
          <planeGeometry args={[1.2, 1.0]} />
          <Toon color={COLORS.white} />
        </mesh>
        <mesh position={[0, 2.2, -0.165]}>
          <boxGeometry args={[1.3, 1.1, 0.04]} />
          <Toon color="#d9d2c2" />
          <Ink thickness={0.01} />
        </mesh>
        {/* pin */}
        <mesh position={[0, 2.62, -0.2]}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshBasicMaterial color={COLORS.terracotta} />
        </mesh>
        <Text position={[0, 2.34, -0.18]} rotation={FLIP} fontSize={0.15} color={COLORS.ink} anchorX="center" anchorY="middle" maxWidth={1.05}>
          {job.label}
        </Text>
        <Text position={[0, 1.95, -0.18]} rotation={FLIP} fontSize={0.12} color="#C77B2B" anchorX="center" anchorY="middle">
          {job.status}
        </Text>
      </Interactable>
      <SpeechBubble id={id} anchor={[x, 3.4, 3.4]} />
    </>
  );
}

/**
 * ZONE 5 — THE JOB BOARD. A community bulletin wall covered in applications,
 * an "OPEN TO WORK" banner, and a weary fellow job-seeker resting on a bench.
 */
export default function Zone5_JobBoard() {
  return (
    <>
      {/* board posts */}
      {[X - 4.4, X + 4.4].map((px, i) => (
        <mesh key={i} position={[px, 1.6, 4.2]} castShadow>
          <boxGeometry args={[0.22, 3.2, 0.22]} />
          <Toon color={COLORS.woodDark} />
          <Ink thickness={0.012} />
        </mesh>
      ))}
      {/* cork board */}
      <mesh position={[X, 2.6, 4.15]} castShadow>
        <boxGeometry args={[9.4, 3.6, 0.18]} />
        <Toon color="#caa56f" />
        <Ink thickness={0.016} />
      </mesh>
      <mesh position={[X, 2.6, 4.05]}>
        <boxGeometry args={[9.0, 3.2, 0.04]} />
        <Toon color="#b8895a" />
      </mesh>
      {/* header */}
      <mesh position={[X, 4.2, 4.0]} rotation={FLIP}>
        <planeGeometry args={[5.2, 0.6]} />
        <Toon color={COLORS.ink} />
      </mesh>
      <Text position={[X, 4.2, 3.97]} rotation={FLIP} fontSize={0.34} color={COLORS.yellow} anchorX="center" anchorY="middle" letterSpacing={0.06}>
        THE JOB BOARD
      </Text>

      {/* OPEN TO WORK banner */}
      <mesh position={[X, 1.3, 3.95]} rotation={FLIP}>
        <planeGeometry args={[4.6, 1.1]} />
        <Toon color={COLORS.white} />
      </mesh>
      <mesh position={[X, 1.3, 3.96]}>
        <boxGeometry args={[4.8, 1.3, 0.04]} />
        <Toon color={COLORS.terracotta} />
        <Ink thickness={0.012} />
      </mesh>
      <BlinkDot position={[X - 2.0, 1.66, 3.9]} />
      <Text position={[X + 0.18, 1.62, 3.9]} rotation={FLIP} fontSize={0.26} color={COLORS.terracotta} anchorX="center" anchorY="middle" letterSpacing={0.04}>
        OPEN TO WORK
      </Text>
      <Text position={[X, 1.12, 3.9]} rotation={FLIP} fontSize={0.17} color={COLORS.ink} anchorX="center" anchorY="middle">
        LLM Backend · AI Engineering
      </Text>

      {/* four application pins */}
      {JOBS.map((job, i) => (
        <JobPin key={job.id} id={`job-${job.id}`} x={X + [-3.0, -1.0, 1.0, 3.0][i]} job={job} />
      ))}

      {/* rejection papers scattered on the ground */}
      {[[-2.4, 2.1, 0.3], [1.8, 2.4, -0.5], [-0.6, 1.6, 0.9], [3.0, 2.6, -0.2]].map((p, i) => (
        <mesh key={i} position={[X + p[0], 0.03, p[1]]} rotation={[-Math.PI / 2, 0, p[2]]}>
          <planeGeometry args={[0.5, 0.65]} />
          <Toon color={COLORS.white} />
        </mesh>
      ))}

      {/* bench on the opposite sidewalk */}
      <group position={[99.5, 0, -3.0]}>
        <mesh position={[0, 0.46, 0]} castShadow>
          <boxGeometry args={[2.2, 0.12, 0.7]} />
          <Toon color={COLORS.wood} />
          <Ink thickness={0.012} />
        </mesh>
        <mesh position={[0, 0.84, -0.3]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[2.2, 0.6, 0.1]} />
          <Toon color={COLORS.wood} />
          <Ink thickness={0.012} />
        </mesh>
        {[-0.9, 0.9].map((lx, i) => (
          <mesh key={i} position={[lx, 0.23, 0]}>
            <boxGeometry args={[0.14, 0.46, 0.6]} />
            <Toon color={COLORS.woodDark} />
          </mesh>
        ))}
      </group>

      {/* weary job-seeker, head down */}
      <NPC
        id="sad"
        position={[99.5, 0, -3.0]}
        facing={0}
        dialog={DIALOG.sad}
        speaker="On the bench"
        label="Sit and talk"
        colors={{ shirt: '#6B7280', pants: '#3a3f48', hair: '#2E2620' }}
        radius={2.8}
        poseExtra={{ sitting: true, headDown: true }}
        bubbleAnchor={[0, 2.6, 0]}
      />
    </>
  );
}
