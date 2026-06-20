import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { PALETTE, TRAVEL, zoneZ } from '../config';

/* ---------------- deterministic pseudo-random ---------------- */
const mulberry32 = (seed) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/* ---------------- neon window texture (canvas) ---------------- */
const makeWindowTexture = (seed, tint) => {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#05060c';
  ctx.fillRect(0, 0, 64, 128);
  const rnd = mulberry32(seed);
  const cols = 4;
  const rows = 10;
  const pad = 6;
  const cw = (64 - pad * (cols + 1)) / cols;
  const rh = (128 - pad * (rows + 1)) / rows;
  const colors = [tint, '#00f5ff', '#9b59b6', '#ffd27a', '#2d6cff'];
  for (let r = 0; r < rows; r++) {
    for (let col = 0; col < cols; col++) {
      const lit = rnd() > 0.45;
      ctx.fillStyle = lit ? colors[Math.floor(rnd() * colors.length)] : '#0b1020';
      const x = pad + col * (cw + pad);
      const y = pad + r * (rh + pad);
      ctx.fillRect(x, y, cw, rh);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

/* ---------------- single building ---------------- */
const Building = ({ position, size, seed, tint }) => {
  const tex = useMemo(() => makeWindowTexture(seed, tint), [seed, tint]);
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#0a0e1c" metalness={0.5} roughness={0.55} />
      </mesh>
      {/* emissive window face toward the street (-x or +x handled by caller rotation) */}
      <mesh position={[0, 0, size[2] / 2 + 0.02]}>
        <planeGeometry args={[size[0] * 0.9, size[1] * 0.92]} />
        <meshStandardMaterial
          emissive="#ffffff"
          emissiveMap={tex}
          emissiveIntensity={1.3}
          color="#000000"
          toneMapped={false}
        />
      </mesh>
      {/* roof neon rim */}
      <mesh position={[0, size[1] / 2 + 0.05, 0]}>
        <boxGeometry args={[size[0], 0.06, size[2]]} />
        <meshBasicMaterial color={tint} toneMapped={false} />
      </mesh>
    </group>
  );
};

/* ---------------- rows of buildings on both sides ---------------- */
const BuildingRows = () => {
  const buildings = useMemo(() => {
    const rnd = mulberry32(99);
    const list = [];
    const streetHalf = 8;
    for (let z = 6; z > -TRAVEL - 16; z -= rnd() * 6 + 9) {
      for (const side of [-1, 1]) {
        const depth = rnd() * 4 + 4;
        const width = rnd() * 4 + 5;
        const height = rnd() * 30 + 9;
        const tint = rnd() > 0.5 ? PALETTE.cyan : PALETTE.purple;
        const x = side * (streetHalf + depth / 2);
        // rotate so the window face points to the street
        list.push({
          key: `${z}-${side}`,
          position: [x, height / 2, z],
          rotY: side === -1 ? Math.PI / 2 : -Math.PI / 2,
          size: [width, height, depth],
          seed: Math.floor(rnd() * 99999),
          tint,
        });
      }
    }
    return list;
  }, []);

  return (
    <group>
      {buildings.map((b) => (
        <group key={b.key} rotation={[0, b.rotY, 0]} position={b.position}>
          <Building position={[0, 0, 0]} size={b.size} seed={b.seed} tint={b.tint} />
        </group>
      ))}
    </group>
  );
};

/* ---------------- lamppost (emissive, bloom-lit) ---------------- */
const Lamppost = ({ position, color }) => (
  <group position={position}>
    <mesh position={[0, 2, 0]}>
      <cylinderGeometry args={[0.06, 0.08, 4, 6]} />
      <meshStandardMaterial color="#11151f" metalness={0.8} roughness={0.3} />
    </mesh>
    <mesh position={[0, 4, 0]}>
      <sphereGeometry args={[0.18, 12, 12]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  </group>
);

const Lampposts = () => {
  const items = useMemo(() => {
    const arr = [];
    for (let z = 0; z > -TRAVEL; z -= 18) {
      arr.push({ z, color: PALETTE.cyan, x: -7.4 });
      arr.push({ z: z - 9, color: PALETTE.purple, x: 7.4 });
    }
    return arr;
  }, []);
  return (
    <group>
      {items.map((l, i) => (
        <Lamppost key={i} position={[l.x, 0, l.z]} color={l.color} />
      ))}
    </group>
  );
};

/* ---------------- ground: Tron grid + road ---------------- */
const Ground = () => (
  <group>
    <Grid
      position={[0, 0.01, -TRAVEL / 2]}
      args={[60, TRAVEL + 80]}
      cellSize={2}
      cellThickness={0.6}
      cellColor={PALETTE.blue}
      sectionSize={10}
      sectionThickness={1.2}
      sectionColor={PALETTE.cyan}
      fadeDistance={70}
      fadeStrength={1.5}
      infiniteGrid={false}
    />
    {/* dark road strip */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -TRAVEL / 2]} receiveShadow>
      <planeGeometry args={[14, TRAVEL + 80]} />
      <meshStandardMaterial color="#06070d" metalness={0.4} roughness={0.7} />
    </mesh>
    {/* center neon lane lines */}
    {[-0.1, 0.1].map((x, i) => (
      <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x * 60, 0.02, -TRAVEL / 2]}>
        <planeGeometry args={[0.12, TRAVEL + 80]} />
        <meshBasicMaterial color={PALETTE.cyan} toneMapped={false} />
      </mesh>
    ))}
  </group>
);

/* ---------------- neon text helper ---------------- */
const Neon = ({ children, color = PALETTE.cyan, size = 1, ...props }) => (
  <Text
    fontSize={size}
    color={color}
    anchorX="center"
    anchorY="middle"
    outlineWidth={0}
    {...props}
  >
    {children}
    <meshBasicMaterial color={color} toneMapped={false} />
  </Text>
);

/* ---------------- ZONE 1 — hero gate + neon name sign ---------------- */
const HeroGate = () => {
  const sign = useRef();
  useFrame((s) => {
    if (sign.current) {
      // flicker
      const f = Math.sin(s.clock.elapsedTime * 20) > -0.7 ? 1 : 0.3;
      sign.current.material.opacity = f;
    }
  });
  return (
    <group position={[0, 0, -6]}>
      {/* gate pillars */}
      {[-7, 7].map((x, i) => (
        <mesh key={i} position={[x, 5, 0]}>
          <boxGeometry args={[1, 10, 1]} />
          <meshStandardMaterial color="#0a0e1c" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}
      {/* top beam */}
      <mesh position={[0, 9.6, 0]}>
        <boxGeometry args={[15, 0.4, 0.8]} />
        <meshBasicMaterial color={PALETTE.purple} toneMapped={false} />
      </mesh>
      <Neon position={[0, 7.6, 0.6]} color={PALETTE.cyan} size={1.5}>
        SANTHOSH KUMAR
      </Neon>
      <mesh ref={sign} position={[0, 6.4, 0.6]}>
        <planeGeometry args={[9, 0.06]} />
        <meshBasicMaterial color={PALETTE.cyan} transparent toneMapped={false} />
      </mesh>
      <Neon position={[0, 5.9, 0.6]} color={PALETTE.purple} size={0.42}>
        AI ENGINEER · LLM BACKEND DEVELOPER
      </Neon>
    </group>
  );
};

/* ---------------- ZONE 2 — skill orbs (the dojo) ---------------- */
const SKILLS = [
  'Python', 'LangChain', 'FastAPI', 'RAG', 'ChromaDB',
  'MCP Servers', 'Docker', 'Kubernetes', 'PostgreSQL', 'TypeScript',
];
const SkillOrb = ({ position, label, color, idx }) => {
  const ref = useRef();
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime + idx;
    ref.current.position.y = position[1] + Math.sin(t * 1.4) * 0.35;
    ref.current.rotation.y = t * 0.6;
    const pulse = 1 + Math.sin(t * 3) * 0.08;
    ref.current.scale.setScalar(pulse);
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.4}
          metalness={0.4}
          roughness={0.2}
          wireframe
        />
      </mesh>
      <Neon position={[0, -0.85, 0]} color={color} size={0.26}>
        {label}
      </Neon>
    </group>
  );
};
const SkillOrbs = () => {
  const z = zoneZ(1);
  return (
    <group position={[0, 0, z]}>
      <Neon position={[0, 8, 0]} color={PALETTE.purple} size={0.9}>
        THE DOJO
      </Neon>
      {SKILLS.map((label, i) => {
        const angle = (i / SKILLS.length) * Math.PI * 2;
        const radius = 4.5;
        const x = Math.cos(angle) * radius;
        const y = 2.2 + (i % 3) * 1.3;
        const zz = Math.sin(angle) * 2.2 - 2;
        const color = i % 2 ? PALETTE.cyan : PALETTE.purple;
        return (
          <SkillOrb key={label} position={[x, y, zz]} label={label} color={color} idx={i} />
        );
      })}
    </group>
  );
};

/* ---------------- ZONE 3 — project billboards (missions) ---------------- */
const Billboard = ({ position, title, lines, color, rotY = 0 }) => (
  <group position={position} rotation={[0, rotY, 0]}>
    {/* frame */}
    <mesh>
      <boxGeometry args={[7, 4.4, 0.2]} />
      <meshStandardMaterial color="#06080f" metalness={0.6} roughness={0.4} />
    </mesh>
    <mesh position={[0, 0, 0.12]}>
      <planeGeometry args={[6.8, 4.2]} />
      <meshBasicMaterial color="#0a0f1f" toneMapped={false} />
    </mesh>
    <Neon position={[0, 1.5, 0.2]} color={color} size={0.46} maxWidth={6}>
      {title}
    </Neon>
    {lines.map((ln, i) => (
      <Neon key={i} position={[0, 0.6 - i * 0.7, 0.2]} color="#bfeaff" size={0.26} maxWidth={6.2}>
        {ln}
      </Neon>
    ))}
    {/* support pole */}
    <mesh position={[0, -3.2, 0]}>
      <cylinderGeometry args={[0.12, 0.12, 2, 6]} />
      <meshStandardMaterial color="#11151f" metalness={0.8} roughness={0.3} />
    </mesh>
  </group>
);
const ProjectBillboards = () => {
  const z = zoneZ(2);
  return (
    <group position={[0, 4.4, z]}>
      <Neon position={[0, 5, 0]} color={PALETTE.blue} size={0.9}>
        MISSIONS
      </Neon>
      <Billboard
        position={[-9, 0, 4]}
        rotY={0.5}
        color={PALETTE.cyan}
        title="PSB SECURITY COMPLIANCE"
        lines={['12-phase agentic AI pipeline', '168,000+ file codebase', 'LangChain · RAG · ChromaDB · MCP']}
      />
      <Billboard
        position={[0, 0.6, 0]}
        color={PALETTE.purple}
        title="STACKSENSE"
        lines={['AI codebase Q&A system', 'Groq · HuggingFace · ChromaDB', 'Next.js frontend']}
      />
      <Billboard
        position={[9, 0, 4]}
        rotY={-0.5}
        color={PALETTE.blue}
        title="CUSP TESTING FRAMEWORK"
        lines={['Playwright · TypeScript', 'Jenkins CI', '200+ automated tests']}
      />
    </group>
  );
};

/* ---------------- ZONE 4 — academy + Cisco HQ ---------------- */
const AcademyBuildings = () => {
  const z = zoneZ(3);
  return (
    <group position={[0, 0, z]}>
      <Neon position={[0, 9, 2]} color={PALETTE.cyan} size={0.8}>
        THE ACADEMY
      </Neon>
      {/* university */}
      <group position={[-9, 0, -2]}>
        <mesh position={[0, 4, 0]}>
          <boxGeometry args={[7, 8, 6]} />
          <meshStandardMaterial color="#0a0e1c" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0, 8.6, 0]}>
          <coneGeometry args={[4.5, 2, 4]} />
          <meshStandardMaterial color="#11203a" metalness={0.6} roughness={0.4} />
        </mesh>
        <Neon position={[0, 4, 3.1]} color={PALETTE.cyan} size={0.34} maxWidth={6}>
          PSNA COLLEGE · B.E. IT
        </Neon>
      </group>
      {/* Cisco HQ */}
      <group position={[9, 0, -2]}>
        <mesh position={[0, 6, 0]}>
          <boxGeometry args={[7, 12, 6]} />
          <meshStandardMaterial color="#061018" metalness={0.7} roughness={0.35} />
        </mesh>
        <Neon position={[0, 7, 3.1]} color={PALETTE.blue} size={0.42} maxWidth={6}>
          CISCO SYSTEMS
        </Neon>
        <Neon position={[0, 6.2, 3.1]} color="#bfeaff" size={0.24} maxWidth={6}>
          Software Engineer · Graduate Program
        </Neon>
      </group>
    </group>
  );
};

/* ---------------- ZONE 5 — rooftop + satellite ---------------- */
const RooftopSignal = () => {
  const z = zoneZ(4);
  const dish = useRef();
  const pulse = useRef();
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (dish.current) dish.current.rotation.z = Math.sin(t * 0.6) * 0.3;
    if (pulse.current) {
      const k = (Math.sin(t * 2) + 1) / 2;
      pulse.current.scale.setScalar(0.5 + k * 2.5);
      pulse.current.material.opacity = 1 - k;
    }
  });
  return (
    <group position={[0, 0, z]}>
      {/* rooftop platform */}
      <mesh position={[0, 0.2, -2]}>
        <boxGeometry args={[16, 0.4, 12]} />
        <meshStandardMaterial color="#080b14" metalness={0.5} roughness={0.5} />
      </mesh>
      <Neon position={[0, 8, -2]} color={PALETTE.pink} size={0.8}>
        SIGNAL
      </Neon>
      {/* satellite dish */}
      <group ref={dish} position={[5, 1, -5]} rotation={[0.5, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1.4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#1a2233" metalness={0.7} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.16, 8, 8]} />
          <meshBasicMaterial color={PALETTE.cyan} toneMapped={false} />
        </mesh>
      </group>
      {/* pulsing signal ring */}
      <mesh ref={pulse} position={[5, 1.6, -5]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.7, 32]} />
        <meshBasicMaterial color={PALETTE.cyan} transparent toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

/* ---------------- distant skyline silhouette ---------------- */
const Skyline = () => {
  const blocks = useMemo(() => {
    const rnd = mulberry32(7);
    const arr = [];
    for (let i = 0; i < 40; i++) {
      arr.push({
        x: (rnd() - 0.5) * 160,
        h: rnd() * 40 + 10,
        w: rnd() * 8 + 4,
        z: -TRAVEL - 30 - rnd() * 40,
      });
    }
    return arr;
  }, []);
  return (
    <group>
      {blocks.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.w]} />
          <meshBasicMaterial color="#0a0f1f" />
        </mesh>
      ))}
    </group>
  );
};

/* ---------------- main city ---------------- */
const CityScene = () => {
  return (
    <group>
      <Ground />
      <BuildingRows />
      <Lampposts />
      <Skyline />
      <HeroGate />
      <SkillOrbs />
      <ProjectBillboards />
      <AcademyBuildings />
      <RooftopSignal />
    </group>
  );
};

export default CityScene;
