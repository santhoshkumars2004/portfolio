import React, { useMemo } from 'react';
import { Toon, Ink } from '../toon/toon';
import { COLORS, LAYOUT } from '../config';

/**
 * Street — the continuous road, sidewalks, curbs and faded lane markings that
 * the whole neighborhood sits on. Runs along +X from the start to the staircase.
 */
export default function Street() {
  const roadEndX = LAYOUT.roofStart + 2;
  const roadLen = roadEndX - LAYOUT.start + 8;
  const roadMidX = (LAYOUT.start + roadEndX) / 2;

  const dashes = useMemo(() => {
    const arr = [];
    for (let x = LAYOUT.start; x < roadEndX; x += 4) arr.push(x);
    return arr;
  }, [roadEndX]);

  return (
    <group>
      {/* base ground (grassy earth tone beneath everything) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[roadMidX, -0.05, 0]} receiveShadow>
        <planeGeometry args={[roadLen + 60, 70]} />
        <Toon color="#A7B79A" />
      </mesh>

      {/* road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[roadMidX, 0.01, 0]} receiveShadow>
        <planeGeometry args={[roadLen, 7]} />
        <Toon color={COLORS.road} />
      </mesh>

      {/* dashed center line */}
      {dashes.map((x) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.02, 0]}>
          <planeGeometry args={[1.6, 0.18]} />
          <Toon color={COLORS.roadLine} />
        </mesh>
      ))}

      {/* sidewalks */}
      {[1, -1].map((side) => (
        <mesh
          key={side}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[roadMidX, 0.06, side * 4.5]}
          receiveShadow
        >
          <planeGeometry args={[roadLen, 2.2]} />
          <Toon color={COLORS.sidewalk} />
        </mesh>
      ))}

      {/* curbs */}
      {[1, -1].map((side) => (
        <mesh key={`c${side}`} position={[roadMidX, 0.04, side * 3.5]} castShadow receiveShadow>
          <boxGeometry args={[roadLen, 0.12, 0.16]} />
          <Toon color="#BBB3A2" />
          <Ink thickness={0.01} />
        </mesh>
      ))}
    </group>
  );
}
