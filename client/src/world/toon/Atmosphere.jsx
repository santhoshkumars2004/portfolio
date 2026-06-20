import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS, LAYOUT } from '../config';
import { player } from '../game/playerState';
import { softCircleTexture } from './toon';

const lerpC = (a, b, t, out) => out.copy(a).lerp(b, t);

/* hand-painted vertical-gradient sky dome, color graded by time of day */
function SkyDome({ dayRef }) {
  const mat = useRef();
  const uniforms = useMemo(
    () => ({
      top: { value: new THREE.Color(COLORS.skyTop) },
      bottom: { value: new THREE.Color(COLORS.skyBottom) },
    }),
    []
  );
  const morningTop = useMemo(() => new THREE.Color(COLORS.skyTop), []);
  const morningBot = useMemo(() => new THREE.Color(COLORS.skyBottom), []);
  const eveTop = useMemo(() => new THREE.Color(COLORS.skyEvening), []);
  const eveBot = useMemo(() => new THREE.Color(COLORS.skyEveningBottom), []);

  useFrame(() => {
    const d = dayRef.current; // 0 morning -> 1 evening
    lerpC(morningTop, eveTop, d, uniforms.top.value);
    lerpC(morningBot, eveBot, d, uniforms.bottom.value);
  });

  return (
    <mesh scale={[1, 1, 1]} renderOrder={-10}>
      <sphereGeometry args={[300, 32, 16]} />
      <shaderMaterial
        ref={mat}
        side={THREE.BackSide}
        depthWrite={false}
        fog={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vDir;
          void main(){
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vDir;
          uniform vec3 top; uniform vec3 bottom;
          void main(){
            float h = clamp(vDir.y*0.5+0.5, 0.0, 1.0);
            vec3 c = mix(bottom, top, smoothstep(0.05, 0.7, h));
            gl_FragColor = vec4(c, 1.0);
          }
        `}
      />
    </mesh>
  );
}

/* drifting painted clouds */
function Clouds() {
  const tex = useMemo(() => softCircleTexture(), []);
  const group = useRef();
  const puffs = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push({
        x: -20 + Math.random() * 160,
        y: 26 + Math.random() * 14,
        z: -40 - Math.random() * 30,
        s: 10 + Math.random() * 10,
        sp: 0.2 + Math.random() * 0.3,
      });
    }
    return arr;
  }, []);
  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.children.forEach((c, i) => {
      c.position.x += dt * puffs[i].sp;
      if (c.position.x > 150) c.position.x = -30;
    });
  });
  return (
    <group ref={group}>
      {puffs.map((p, i) => (
        <Billboard key={i} position={[p.x, p.y, p.z]}>
          <mesh>
            <planeGeometry args={[p.s, p.s * 0.6]} />
            <meshBasicMaterial map={tex} transparent opacity={0.75} depthWrite={false} fog={false} />
          </mesh>
        </Billboard>
      ))}
    </group>
  );
}

/**
 * Atmosphere — sky dome, clouds, fog, and soft morning→evening lighting that
 * warms as the player walks down the street toward the rooftop.
 */
export default function Atmosphere() {
  const dayRef = useRef(0);
  const dir = useRef();
  const amb = useRef();
  const hemi = useRef();
  const { scene } = useThree();

  const palette = useMemo(
    () => ({
      dayCol: new THREE.Color('#FFF3DF'),
      eveCol: new THREE.Color('#FBC79A'),
      fogDay: new THREE.Color(COLORS.skyBottom),
      fogEve: new THREE.Color(COLORS.skyEveningBottom),
      tmp: new THREE.Color(),
    }),
    []
  );

  useFrame(() => {
    const d = THREE.MathUtils.clamp(player.position.x / LAYOUT.roofStart, 0, 1);
    dayRef.current = d;
    if (dir.current) {
      palette.tmp.copy(palette.dayCol).lerp(palette.eveCol, d);
      dir.current.color.copy(palette.tmp);
      dir.current.intensity = THREE.MathUtils.lerp(1.5, 1.1, d);
    }
    if (amb.current) amb.current.intensity = THREE.MathUtils.lerp(0.85, 0.7, d);
    if (hemi.current) hemi.current.intensity = THREE.MathUtils.lerp(0.5, 0.35, d);
    if (scene.fog) scene.fog.color.copy(palette.tmp.copy(palette.fogDay).lerp(palette.fogEve, d));
  });

  return (
    <>
      <fog attach="fog" args={[COLORS.skyBottom, 30, 150]} />
      <SkyDome dayRef={dayRef} />
      <Clouds />
      <hemisphereLight ref={hemi} args={['#dff0ec', '#9b8c74', 0.5]} />
      <ambientLight ref={amb} intensity={0.85} />
      <directionalLight
        ref={dir}
        position={[-18, 26, 14]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={1}
        shadow-camera-far={120}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.0004}
      />
    </>
  );
}
