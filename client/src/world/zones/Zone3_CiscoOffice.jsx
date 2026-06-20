import React from 'react';
import { Text } from '@react-three/drei';
import { Building } from '../world/Buildings';
import NPC from '../game/NPC';
import Interactable from '../game/Interactable';
import { Toon, Ink } from '../toon/toon';
import { COLORS, DIALOG, PROJECTS } from '../config';
import { actions } from '../store/gameStore';
import { sfx } from '../audio/sfx';

const X = 52;

/** A standing display panel that opens a project modal when interacted with. */
function ProjectBoard({ id, x, project }) {
  return (
    <Interactable
      id={id}
      position={[x, 0, -3.6]}
      radius={2.6}
      label={`View ${project.title}`}
      hintOffset={[0, 2.6, 0]}
      onInteract={() => {
        actions.openModal('project', project);
        sfx.kit?.ding();
      }}
    >
      {[-0.7, 0.7].map((px, i) => (
        <mesh key={i} position={[px, 0.8, 0]}>
          <boxGeometry args={[0.1, 1.6, 0.1]} />
          <Toon color={COLORS.metal} />
        </mesh>
      ))}
      <mesh position={[0, 1.7, 0]} castShadow>
        <boxGeometry args={[1.9, 1.4, 0.12]} />
        <Toon color={COLORS.white} />
        <Ink thickness={0.014} />
      </mesh>
      <mesh position={[0, 2.2, 0.07]}>
        <planeGeometry args={[1.9, 0.4]} />
        <Toon color={project.color} />
      </mesh>
      <Text position={[0, 2.2, 0.09]} fontSize={0.18} color={COLORS.white} anchorX="center" anchorY="middle" maxWidth={1.7}>
        {project.title}
      </Text>
      <Text position={[0, 1.6, 0.09]} fontSize={0.12} color={COLORS.ink} anchorX="center" anchorY="middle" maxWidth={1.7}>
        {project.tag}
      </Text>
      <Text position={[0, 1.15, 0.09]} fontSize={0.1} color={COLORS.terracotta} anchorX="center" anchorY="middle">
        ▸ press E
      </Text>
    </Interactable>
  );
}

/**
 * ZONE 3 — CISCO SYSTEMS. The office where Santhosh works as a Graduate
 * Engineer. A manager greets you, and two boards showcase work projects.
 */
export default function Zone3_CiscoOffice() {
  return (
    <>
      {/* office tower */}
      <Building position={[X, 0, -9]} rotation={0} w={17} h={15} d={6} color="#C2CBD0" seed={7} door={false} />

      {/* glass entrance */}
      <mesh position={[X, 1.6, -5.92]}>
        <planeGeometry args={[5, 3.2]} />
        <Toon color="#7FA9B8" />
      </mesh>
      {[-1.0, 1.0].map((x, i) => (
        <mesh key={i} position={[X + x, 1.3, -5.88]}>
          <boxGeometry args={[1.7, 2.6, 0.08]} />
          <Toon color="#3E5662" />
          <Ink thickness={0.012} />
        </mesh>
      ))}

      {/* rooftop CISCO SYSTEMS sign */}
      <mesh position={[X, 15.6, -6.2]}>
        <boxGeometry args={[10, 1.6, 0.3]} />
        <Toon color={COLORS.white} />
        <Ink thickness={0.014} />
      </mesh>
      <Text position={[X, 15.6, -6.02]} fontSize={0.85} color="#1BA0D7" anchorX="center" anchorY="middle" letterSpacing={0.05}>
        CISCO SYSTEMS
      </Text>
      {/* little antenna bridge under the logo */}
      <mesh position={[X, 14.7, -6.1]}>
        <boxGeometry args={[3, 0.12, 0.12]} />
        <Toon color="#1BA0D7" />
      </mesh>

      {/* manager */}
      <NPC
        id="manager"
        position={[49.6, 0, -3.7]}
        facing={0}
        dialog={DIALOG.manager}
        speaker="Manager"
        label="Talk to Manager"
        colors={{ shirt: '#EDEDE7', pants: '#2B3340', hair: '#1c1712' }}
        radius={2.9}
      />
      {/* lanyard ID badge floating near the manager's chest */}
      <mesh position={[49.6, 1.55, -3.46]}>
        <planeGeometry args={[0.26, 0.34]} />
        <Toon color={COLORS.yellow} />
      </mesh>

      {/* project boards */}
      <ProjectBoard id="proj-psb" x={53.4} project={PROJECTS.psb} />
      <ProjectBoard id="proj-cusp" x={55.8} project={PROJECTS.cusp} />
    </>
  );
}
