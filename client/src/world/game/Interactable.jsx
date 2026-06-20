import React, { useEffect, useRef } from 'react';
import { register, unregister } from '../game/interactions';
import { useGame } from '../store/gameStore';
import InteractHint from '../ui/InteractHint';

/**
 * Interactable — registers a world position with the interaction system and
 * shows the floating "PRESS E" hint when the player is the closest in range.
 * Children render the actual 3D object.
 */
export default function Interactable({
  id,
  position = [0, 0, 0],
  radius = 2.6,
  priority = 0,
  label = 'Interact',
  onInteract,
  hintOffset = [0, 2.4, 0],
  children,
}) {
  const active = useGame((s) => s.activeTargetId === id);
  const cb = useRef(onInteract);
  cb.current = onInteract;

  useEffect(() => {
    register({
      id,
      x: position[0],
      z: position[2],
      radius,
      priority,
      label,
      onInteract: () => cb.current && cb.current(),
    });
    return () => unregister(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, position[0], position[2], radius, priority, label]);

  return (
    <group position={position}>
      {children}
      {active && <InteractHint position={hintOffset} label={label} />}
    </group>
  );
}
