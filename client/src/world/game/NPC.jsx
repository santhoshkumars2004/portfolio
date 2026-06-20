import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import ToonCharacter from '../game/ToonCharacter';
import Interactable from '../game/Interactable';
import SpeechBubble from '../ui/SpeechBubble';
import { actions } from '../store/gameStore';

/**
 * NPC — a cel-shaded character that either stands and talks (interactive) or
 * wanders a looping path in the background. Interactive NPCs open a speech
 * bubble above their head when the player presses E nearby.
 */
export default function NPC({
  id,
  position = [0, 0, 0],
  dialog = [],
  speaker = 'NPC',
  colors,
  facing = Math.PI,
  radius = 2.8,
  label = 'Talk',
  hintOffset = [0, 2.6, 0],
  bubbleAnchor = [0, 3, 0],
  path = null,
  speed = 1.0,
  interactive = true,
  poseExtra,
}) {
  const group = useRef();
  const pose = useRef({ speed: 0, moving: false, ...(poseExtra || {}) });
  const idx = useRef(0);

  const waypoints = useMemo(() => path, [path]);

  useFrame((_, dt) => {
    if (!group.current) return;
    if (waypoints && waypoints.length > 1) {
      const [tx, tz] = waypoints[idx.current];
      const gx = group.current.position.x;
      const gz = group.current.position.z;
      const dx = tx - gx;
      const dz = tz - gz;
      const dist = Math.hypot(dx, dz);
      if (dist < 0.25) {
        idx.current = (idx.current + 1) % waypoints.length;
      } else {
        const step = Math.min(dist, speed * dt);
        group.current.position.x += (dx / dist) * step;
        group.current.position.z += (dz / dist) * step;
        group.current.rotation.y = Math.atan2(dx, dz);
      }
      pose.current.moving = true;
      pose.current.speed = 0.7;
    } else {
      group.current.rotation.y = facing;
      pose.current.moving = false;
      pose.current.speed = 0;
    }
  });

  const body = (
    <group ref={group} position={position}>
      <ToonCharacter poseRef={pose} colors={colors} />
    </group>
  );

  if (!interactive) return body;

  return (
    <>
      {body}
      <Interactable
        id={id}
        position={position}
        radius={radius}
        label={label}
        hintOffset={hintOffset}
        onInteract={() => actions.openDialog(id, dialog, speaker)}
      />
      <SpeechBubble id={id} anchor={[position[0], position[1] + bubbleAnchor[1], position[2]]} />
    </>
  );
}
