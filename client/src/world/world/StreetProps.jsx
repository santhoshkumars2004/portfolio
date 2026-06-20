import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Toon, Ink } from '../toon/toon';
import { COLORS } from '../config';

/* ---------------- reusable props ---------------- */

export function Cat({ color = COLORS.cat, look = 0 }) {
  const tail = useRef();
  useFrame((s) => {
    if (tail.current) tail.current.rotation.z = Math.sin(s.clock.elapsedTime * 1.4) * 0.25 + 0.4;
  });
  return (
    <group rotation={[0, look, 0]}>
      <mesh position={[0, 0.16, 0]} castShadow>
        <boxGeometry args={[0.45, 0.26, 0.24]} />
        <Toon color={color} />
        <Ink thickness={0.012} />
      </mesh>
      <mesh position={[0.22, 0.3, 0]} castShadow>
        <boxGeometry args={[0.22, 0.22, 0.22]} />
        <Toon color={color} />
        <Ink thickness={0.012} />
      </mesh>
      {/* ears */}
      <mesh position={[0.16, 0.44, 0.07]}>
        <coneGeometry args={[0.05, 0.1, 4]} />
        <Toon color={color} />
      </mesh>
      <mesh position={[0.16, 0.44, -0.07]}>
        <coneGeometry args={[0.05, 0.1, 4]} />
        <Toon color={color} />
      </mesh>
      {/* eyes */}
      <mesh position={[0.33, 0.32, 0.06]}>
        <boxGeometry args={[0.03, 0.05, 0.02]} />
        <Toon color={COLORS.yellow} />
      </mesh>
      <mesh position={[0.33, 0.32, -0.06]}>
        <boxGeometry args={[0.03, 0.05, 0.02]} />
        <Toon color={COLORS.yellow} />
      </mesh>
      {/* tail */}
      <group ref={tail} position={[-0.22, 0.2, 0]}>
        <mesh position={[-0.1, 0.08, 0]}>
          <boxGeometry args={[0.28, 0.06, 0.06]} />
          <Toon color={color} />
        </mesh>
      </group>
    </group>
  );
}

export function VendingMachine({ position = [0, 0, 0], rotation = 0, color = COLORS.teal }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[1.1, 1.9, 0.7]} />
        <Toon color={color} />
        <Ink thickness={0.018} />
      </mesh>
      {/* glowing product window */}
      <mesh position={[-0.15, 1.05, 0.36]}>
        <planeGeometry args={[0.62, 1.2]} />
        <meshBasicMaterial color="#fff4cf" toneMapped={false} />
      </mesh>
      {/* slots */}
      {[0.4, 0.0, -0.4].map((y, i) => (
        <mesh key={i} position={[-0.15, 1.15 + y, 0.37]}>
          <planeGeometry args={[0.5, 0.16]} />
          <Toon color={COLORS.terracotta} />
        </mesh>
      ))}
      {/* dispenser */}
      <mesh position={[0.32, 0.55, 0.36]}>
        <planeGeometry args={[0.4, 0.7]} />
        <Toon color="#2c2c30" />
      </mesh>
    </group>
  );
}

export function Planter({ position = [0, 0, 0] }) {
  const leaves = useRef();
  useFrame((s) => {
    if (leaves.current) leaves.current.rotation.z = Math.sin(s.clock.elapsedTime * 1.1) * 0.04;
  });
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.1, 0.6, 0.7]} />
        <Toon color={COLORS.terracotta} />
        <Ink thickness={0.014} />
      </mesh>
      <group ref={leaves} position={[0, 0.6, 0]}>
        {[-0.3, 0, 0.3].map((x, i) => (
          <mesh key={i} position={[x, 0.4 + (i % 2) * 0.2, 0]} castShadow>
            <icosahedronGeometry args={[0.34, 0]} />
            <Toon color={i % 2 ? '#86a87f' : COLORS.leaf} />
          </mesh>
        ))}
        {/* tall leaf blades */}
        {[-0.2, 0.1, 0.3].map((x, i) => (
          <mesh key={`b${i}`} position={[x, 0.7, 0]} rotation={[0, 0, (i - 1) * 0.3]}>
            <boxGeometry args={[0.08, 0.8, 0.04]} />
            <Toon color={COLORS.leaf} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function Bicycle({ position = [0, 0, 0], rotation = 0, color = COLORS.teal }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {[-0.5, 0.5].map((x, i) => (
        <mesh key={i} position={[x, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.4, 0.05, 8, 18]} />
          <Toon color={COLORS.ink} />
        </mesh>
      ))}
      <mesh position={[0, 0.55, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.9, 0.07, 0.07]} />
        <Toon color={color} />
      </mesh>
      <mesh position={[0.5, 0.8, 0]}>
        <boxGeometry args={[0.07, 0.5, 0.07]} />
        <Toon color={color} />
      </mesh>
      <mesh position={[0.5, 1.05, 0.0]}>
        <boxGeometry args={[0.34, 0.06, 0.06]} />
        <Toon color={COLORS.ink} />
      </mesh>
      <mesh position={[-0.45, 0.92, 0]}>
        <boxGeometry args={[0.3, 0.08, 0.16]} />
        <Toon color={COLORS.ink} />
      </mesh>
    </group>
  );
}

export function TrashCan({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.26, 0.8, 12]} />
        <Toon color="#6b8f6a" />
        <Ink thickness={0.012} />
      </mesh>
      <mesh position={[0, 0.83, 0]}>
        <cylinderGeometry args={[0.33, 0.33, 0.1, 12]} />
        <Toon color="#56705a" />
      </mesh>
    </group>
  );
}

export function Boxes({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.7, 0.6, 0.6]} />
        <Toon color={COLORS.wood} />
        <Ink thickness={0.012} />
      </mesh>
      <mesh position={[0.1, 0.85, 0.05]} rotation={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.55, 0.5, 0.5]} />
        <Toon color="#c79a6a" />
        <Ink thickness={0.012} />
      </mesh>
    </group>
  );
}

function Pole({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 3, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.13, 6, 7]} />
        <Toon color="#8a7f6e" />
        <Ink thickness={0.012} />
      </mesh>
      <mesh position={[0, 5.4, 0]}>
        <boxGeometry args={[1.2, 0.1, 0.1]} />
        <Toon color="#6f6657" />
      </mesh>
      {/* a small transformer box */}
      <mesh position={[0.18, 4.6, 0]}>
        <boxGeometry args={[0.26, 0.4, 0.26]} />
        <Toon color="#5d5547" />
      </mesh>
    </group>
  );
}

function Wire({ a, b }) {
  const ref = useRef();
  const geo = useMemo(() => {
    const mid = new THREE.Vector3((a[0] + b[0]) / 2, Math.min(a[1], b[1]) - 0.9, (a[2] + b[2]) / 2);
    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(...a), mid, new THREE.Vector3(...b));
    return new THREE.TubeGeometry(curve, 14, 0.025, 5, false);
  }, [a, b]);
  useFrame((s) => {
    if (ref.current) ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.8 + a[0]) * 0.05;
  });
  return (
    <mesh ref={ref} geometry={geo}>
      <Toon color="#2f2c28" />
    </mesh>
  );
}

function Laundry({ position = [0, 0, 0] }) {
  const ref = useRef();
  const cloths = useMemo(
    () => [COLORS.teal, COLORS.yellow, COLORS.white, COLORS.terracotta].map((c, i) => ({ c, x: -1.2 + i * 0.8 })),
    []
  );
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.children.forEach((m, i) => {
      m.rotation.x = Math.sin(s.clock.elapsedTime * 1.6 + i) * 0.12;
    });
  });
  return (
    <group position={position}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.02, 0.02]} />
        <Toon color="#2f2c28" />
      </mesh>
      <group ref={ref}>
        {cloths.map((cl, i) => (
          <mesh key={i} position={[cl.x, -0.4, 0]} castShadow>
            <planeGeometry args={[0.55, 0.8]} />
            <Toon color={cl.c} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Poster({ position = [0, 0, 0], rotation = 0, color = COLORS.yellow }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh>
        <planeGeometry args={[0.8, 1.1]} />
        <Toon color={color} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.2, 0.01]}>
        <planeGeometry args={[0.6, 0.3]} />
        <Toon color="#2f2c28" />
      </mesh>
      <mesh position={[0, -0.2, 0.01]}>
        <planeGeometry args={[0.6, 0.1]} />
        <Toon color="#2f2c28" />
      </mesh>
    </group>
  );
}

function BlowingPapers() {
  const ref = useRef();
  const papers = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push({
        x: 80 + Math.random() * 40,
        y: 0.2 + Math.random() * 1.2,
        z: -3 + Math.random() * 6,
        r: Math.random() * Math.PI,
        sp: 1.5 + Math.random() * 2,
      });
    }
    return arr;
  }, []);
  useFrame((s, dt) => {
    if (!ref.current) return;
    ref.current.children.forEach((m, i) => {
      const p = papers[i];
      m.position.x += dt * p.sp;
      m.position.y = p.y + Math.sin(s.clock.elapsedTime * 3 + i) * 0.3;
      m.rotation.z += dt * 2;
      m.rotation.x += dt * 1.5;
      if (m.position.x > 122) m.position.x = 78;
    });
  });
  return (
    <group ref={ref}>
      {papers.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]} rotation={[p.r, 0, p.r]}>
          <planeGeometry args={[0.22, 0.3]} />
          <Toon color="#f2efe6" side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * StreetProps — scatters the world with hand-placed detail: telephone poles and
 * drooping wires, vending machines, planters, bikes, cats, trash, boxes, hanging
 * laundry, wall posters and paper scraps blowing past the job board.
 */
export default function StreetProps() {
  const poles = useMemo(() => {
    const arr = [];
    for (let x = -6; x < 116; x += 20) {
      arr.push({ x, side: 1 });
      arr.push({ x: x + 10, side: -1 });
    }
    return arr;
  }, []);

  const wires = useMemo(() => {
    const bySide = { 1: [], '-1': [] };
    poles.forEach((p) => bySide[p.side].push(p));
    const segs = [];
    [1, -1].forEach((side) => {
      const list = bySide[side].sort((a, b) => a.x - b.x);
      for (let i = 0; i < list.length - 1; i++) {
        segs.push({
          a: [list[i].x, 5.4, side * 5.2],
          b: [list[i + 1].x, 5.4, side * 5.2],
        });
      }
    });
    return segs;
  }, [poles]);

  return (
    <group>
      {poles.map((p, i) => (
        <Pole key={i} position={[p.x, 0, p.side * 5.2]} />
      ))}
      {wires.map((w, i) => (
        <Wire key={i} a={w.a} b={w.b} />
      ))}

      {/* vending machines */}
      <VendingMachine position={[14, 0, 5.1]} rotation={Math.PI} color={COLORS.teal} />
      <VendingMachine position={[15.2, 0, 5.1]} rotation={Math.PI} color={COLORS.yellow} />
      <VendingMachine position={[88, 0, -5.1]} rotation={0} color={COLORS.teal} />

      {/* planters at building bases */}
      {[10, 34, 44, 64, 92, 110].map((x, i) => (
        <Planter key={i} position={[x, 0, (i % 2 ? 1 : -1) * 5.0]} />
      ))}

      {/* bikes / scooters leaning */}
      <Bicycle position={[8, 0, 4.7]} rotation={Math.PI * 0.95} color={COLORS.terracotta} />
      <Bicycle position={[40, 0, -4.7]} rotation={0.1} color={COLORS.teal} />
      <Bicycle position={[84, 0, 4.7]} rotation={Math.PI} color={COLORS.yellow} />

      {/* cats on ledges */}
      <group position={[20, 1.4, -5.0]}>
        <Cat look={-Math.PI / 2} />
      </group>
      <group position={[70, 1.4, 5.0]}>
        <Cat color="#caa06a" look={Math.PI / 2} />
      </group>

      {/* trash + boxes near shops */}
      <TrashCan position={[12, 0, 5.0]} />
      <TrashCan position={[58, 0, -5.0]} />
      <Boxes position={[30, 0, 4.9]} />
      <Boxes position={[94, 0, -4.9]} />

      {/* hanging laundry on upper floors */}
      <Laundry position={[24, 5.5, -5.6]} />
      <Laundry position={[62, 6.2, 5.6]} />
      <Laundry position={[104, 5.5, -5.6]} />

      {/* wall posters */}
      <Poster position={[6, 2.2, 5.55]} rotation={Math.PI} color={COLORS.yellow} />
      <Poster position={[36, 2.4, -5.55]} color={COLORS.teal} />
      <Poster position={[36.9, 2.2, -5.55]} color={COLORS.terracotta} />
      <Poster position={[108, 2.3, 5.55]} rotation={Math.PI} color={COLORS.green} />

      <BlowingPapers />
    </group>
  );
}
