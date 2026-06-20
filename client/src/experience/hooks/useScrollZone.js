import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';

/**
 * useScrollZone
 * Maps the ScrollControls offset (0..1) to a discrete "city zone" and exposes
 * smooth, frame-synced values without causing a React re-render every frame.
 *
 * Must be used inside a <ScrollControls> context.
 *
 * @param {number} zoneCount total number of zones (default 5)
 * @returns {{
 *   scroll: object,                 // drei scroll object (offset, range, etc.)
 *   liveRef: React.MutableRefObject, // { offset, velocity, zone, zoneProgress } updated each frame
 *   zone: number,                    // current integer zone (React state, updates on change only)
 *   isMoving: boolean                // true while the user is actively scrolling
 * }}
 */
export function useScrollZone(zoneCount = 5) {
  const scroll = useScroll();
  const liveRef = useRef({ offset: 0, velocity: 0, zone: 0, zoneProgress: 0, moving: false });
  const lastOffset = useRef(0);
  const moveTimer = useRef(0);

  const [zone, setZone] = useState(0);

  const setZoneSafe = useCallback((z) => {
    setZone((prev) => (prev === z ? prev : z));
  }, []);

  useFrame((_, delta) => {
    const offset = scroll.offset; // 0..1
    const rawVel = (offset - lastOffset.current) / Math.max(delta, 0.0001);
    lastOffset.current = offset;

    // Smooth the velocity a little for stable run/idle decisions.
    const live = liveRef.current;
    live.velocity += (rawVel - live.velocity) * Math.min(1, delta * 8);
    live.offset = offset;

    // Map offset to zone. Each zone occupies an equal slice of the scroll range.
    const scaled = offset * (zoneCount - 1);
    const currentZone = Math.round(scaled);
    const zoneProgress = scaled - Math.floor(scaled);
    live.zone = currentZone;
    live.zoneProgress = zoneProgress;

    // Movement detection with a short cooldown so idle doesn't flicker.
    const moving = Math.abs(live.velocity) > 0.01;
    if (moving) {
      moveTimer.current = 0.25;
      live.moving = true;
    } else if (moveTimer.current > 0) {
      moveTimer.current -= delta;
      live.moving = moveTimer.current > 0;
    } else {
      live.moving = false;
    }

    setZoneSafe(currentZone);
  });

  return { scroll, liveRef, zone };
}

export default useScrollZone;
