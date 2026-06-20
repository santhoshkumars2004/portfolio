import React, { useMemo } from 'react';
import { Toon, Ink } from '../toon/toon';
import { COLORS } from '../config';

// deterministic pseudo-random so the skyline is stable across renders
const rand = (i) => {
  const x = Math.sin(i * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

const FACADES = [COLORS.cream, COLORS.green, COLORS.terracotta, COLORS.brick, '#D9C9A8', '#A9C0B4'];

/**
 * Building — a single toon facade with a window grid, door, parapet and a
 * rooftop water tank. Its "front" faces +Z; the row rotates it to face the street.
 */
export function Building({ position = [0, 0, 0], rotation = 0, w = 9, h = 10, d = 6, color = COLORS.cream, seed = 1, door = true }) {
  const windows = useMemo(() => {
    const arr = [];
    const cols = Math.max(2, Math.floor(w / 2.4));
    const rows = Math.max(2, Math.floor(h / 2.6));
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const lit = rand(seed * 13.7 + r * 7.3 + c * 3.1) > 0.62;
        arr.push({
          x: (c - (cols - 1) / 2) * (w / cols),
          y: 1.8 + r * ((h - 2.6) / Math.max(1, rows - 1 + 0.4)),
          lit,
        });
      }
    }
    return arr;
  }, [w, h, seed]);

  const z = d / 2 + 0.02;

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* body */}
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <Toon color={color} />
        <Ink thickness={0.03} />
      </mesh>
      {/* parapet */}
      <mesh position={[0, h + 0.18, 0]} castShadow>
        <boxGeometry args={[w + 0.3, 0.5, d + 0.3]} />
        <Toon color="#8d8473" />
      </mesh>
      {/* rooftop water tank */}
      <mesh position={[w * 0.25, h + 1.1, -d * 0.1]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 1.2, 10]} />
        <Toon color="#9aa0a6" />
        <Ink thickness={0.02} />
      </mesh>

      {/* windows */}
      {windows.map((win, i) => (
        <mesh key={i} position={[win.x, win.y, z]}>
          <planeGeometry args={[1.0, 1.2]} />
          {win.lit ? (
            <meshBasicMaterial color={COLORS.yellow} toneMapped={false} />
          ) : (
            <Toon color={COLORS.teal} />
          )}
        </mesh>
      ))}
      {/* window frames */}
      {windows.map((win, i) => (
        <mesh key={`f${i}`} position={[win.x, win.y, z - 0.01]}>
          <planeGeometry args={[1.18, 1.38]} />
          <Toon color="#6f6757" />
        </mesh>
      ))}

      {/* door */}
      {door && (
        <mesh position={[0, 1.1, z]}>
          <planeGeometry args={[1.4, 2.2]} />
          <Toon color={COLORS.woodDark} />
        </mesh>
      )}
    </group>
  );
}

/**
 * Buildings — fills both sides of the street with a continuous skyline,
 * leaving gaps for the café alcove and the staircase at the end.
 */
export default function Buildings() {
  const list = useMemo(() => {
    const out = [];
    let i = 0;
    for (const side of [1, -1]) {
      let x = -8;
      while (x < 116) {
        const w = 8 + rand(i * 2.1) * 4;
        const h = 7 + rand(i * 3.3) * 7;
        const d = 6;
        const color = FACADES[Math.floor(rand(i * 5.7) * FACADES.length) % FACADES.length];
        const cx = x + w / 2;

        // gaps: café alcove (+Z side) and home/cisco zone fronts (-Z side)
        const skipCafe = side === 1 && cx > 66 && cx < 86;
        const skipHome = side === -1 && cx > -7 && cx < 9;
        const skipCisco = side === -1 && cx > 43 && cx < 63;

        if (!skipCafe && !skipHome && !skipCisco) {
          out.push({
            key: `b${i}`,
            position: [cx, 0, side * (6.0 + d / 2)],
            rotation: side === 1 ? Math.PI : 0,
            w,
            h,
            d,
            color,
            seed: i + 1,
          });
        }
        x += w + 0.8;
        i += 1;
      }
    }
    return out;
  }, []);

  return (
    <group>
      {list.map((b) => (
        <Building {...b} />
      ))}
    </group>
  );
}
