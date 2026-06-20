import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

import './experience.css';
import { PAGES, ZONE_COUNT, ZONES } from './config';
import useScrollZone from './hooks/useScrollZone';
import CityScene from './components/CityScene';
import Character from './components/Character';
import ParticleSystem from './components/ParticleSystem';
import Effects from './components/Effects';
import LoadingScreen from './components/LoadingScreen';
import NeonCursor from './components/NeonCursor';

import Zone1Hero from './zones/Zone1_Hero';
import Zone2Skills from './zones/Zone2_Skills';
import Zone3Projects from './zones/Zone3_Projects';
import Zone4Journey from './zones/Zone4_Journey';
import Zone5Contact from './zones/Zone5_Contact';

/* ---------------- cinematic follow camera ---------------- */
const CameraRig = ({ charRef }) => {
  useFrame((state, delta) => {
    if (!charRef.current) return;
    const c = charRef.current.position;
    const px = state.pointer.x;
    const py = state.pointer.y;
    const damp = Math.min(1, delta * 3);

    const desiredX = c.x + px * 2.2;
    const desiredY = 6.4 + py * 1.4;
    const desiredZ = c.z + 9.5;

    state.camera.position.x += (desiredX - state.camera.position.x) * damp;
    state.camera.position.y += (desiredY - state.camera.position.y) * damp;
    state.camera.position.z += (desiredZ - state.camera.position.z) * damp;
    state.camera.lookAt(c.x, 2, c.z - 5);
  });
  return null;
};

/* ---------------- the 3D world (inside ScrollControls) ---------------- */
const World = ({ mobile, onZoneChange, cheatRef, onCharClick }) => {
  const { liveRef, zone } = useScrollZone(ZONE_COUNT);
  const charRef = useRef();
  const lightRef = useRef();

  useEffect(() => {
    onZoneChange(zone);
  }, [zone, onZoneChange]);

  // a key light that follows the runner so the character always reads well
  useFrame(() => {
    if (lightRef.current && charRef.current) {
      lightRef.current.position.set(
        charRef.current.position.x + 3,
        7,
        charRef.current.position.z + 4
      );
    }
  });

  return (
    <>
      <CameraRig charRef={charRef} />
      <hemisphereLight args={['#1a2b4a', '#05060a', 0.6]} />
      <ambientLight intensity={0.25} />
      <pointLight ref={lightRef} color="#00f5ff" intensity={6} distance={20} decay={2} />
      <directionalLight position={[10, 20, 5]} intensity={0.3} color="#9b59b6" />

      <CityScene />
      <Character ref={charRef} liveRef={liveRef} cheatRef={cheatRef} onClick={onCharClick} />
      <ParticleSystem mobile={mobile} />

      {/* DOM zones scroll in sync with the canvas */}
      <Scroll html style={{ width: '100%' }}>
        <Zone1Hero />
        <Zone2Skills />
        <Zone3Projects />
        <Zone4Journey />
        <Zone5Contact />
      </Scroll>
    </>
  );
};

/* ---------------- ambient rain via Web Audio (no asset needed) ---------------- */
const useRainAudio = () => {
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);
  const [on, setOn] = useState(false);

  const toggle = () => {
    if (!on) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = ctxRef.current || new Ctx();
      ctxRef.current = ctx;

      // white-noise buffer
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1100;

      const gain = ctx.createGain();
      gain.gain.value = 0.06;

      src.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      src.start();

      nodesRef.current = { src, gain };
      ctx.resume();
      setOn(true);
    } else {
      const n = nodesRef.current;
      if (n) {
        try {
          n.gain.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.2);
          n.src.stop(ctxRef.current.currentTime + 0.25);
        } catch (e) {
          /* noop */
        }
        nodesRef.current = null;
      }
      setOn(false);
    }
  };

  useEffect(() => () => {
    if (nodesRef.current) {
      try {
        nodesRef.current.src.stop();
      } catch (e) {
        /* noop */
      }
    }
  }, []);

  return { on, toggle };
};

/* ---------------- main experience ---------------- */
const ImmersiveExperience = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [zone, setZone] = useState(0);
  const [cheat, setCheat] = useState(false);
  const cheatRef = useRef({ active: false, start: null });
  const clickCount = useRef(0);
  const clickTimer = useRef(null);
  const { on: audioOn, toggle: toggleAudio } = useRainAudio();

  const mobile = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
    []
  );

  // simulated boot progress
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 16;
        return next >= 100 ? 100 : next;
      });
    }, 160);
    return () => clearInterval(id);
  }, []);

  const handleCharClick = () => {
    clickCount.current += 1;
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 1200);
    if (clickCount.current >= 5) {
      clickCount.current = 0;
      cheatRef.current.active = true;
      cheatRef.current.start = null;
      setCheat(true);
      setTimeout(() => setCheat(false), 2600);
    }
  };

  return (
    <div className="xp-root">
      {loading && <LoadingScreen progress={progress} onDone={() => setLoading(false)} />}

      {!mobile && <NeonCursor />}

      {/* HUD */}
      <div className="xp-hud">
        <div className="xp-hud__brand">SANTHOSH.EXE</div>
        <div className="xp-hud__zones">
          {ZONES.map((z) => (
            <span
              key={z.id}
              className={`xp-hud__dot ${zone === z.id ? 'xp-hud__dot--active' : ''}`}
              title={z.name}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="xp-audio" onClick={toggleAudio} aria-label="Toggle ambient rain" data-hover>
            {audioOn ? <FaVolumeUp /> : <FaVolumeMute />}
            <span>{audioOn ? 'RAIN ON' : 'RAIN OFF'}</span>
          </button>
          <Link className="xp-exit" to="/" data-hover>
            ⟵ EXIT
          </Link>
        </div>
      </div>

      {/* current zone label */}
      <div
        className="xp-sub"
        style={{
          position: 'absolute',
          left: 'clamp(16px, 4vw, 40px)',
          bottom: 28,
          fontSize: '0.7rem',
          color: 'rgba(0,245,255,0.7)',
          zIndex: 40,
          pointerEvents: 'none',
        }}
      >
        {String(zone + 1).padStart(2, '0')} / {ZONE_COUNT} — {ZONES[zone]?.name}
      </div>

      {/* scroll hint (zone 1 only) */}
      {zone === 0 && (
        <div className="xp-scrollhint">
          <span>SCROLL</span>
          <div className="xp-scrollhint__bar" />
        </div>
      )}

      {/* cheat-code toast */}
      <AnimatePresence>
        {cheat && (
          <motion.div
            className="xp-cheat"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 0.4 }}
          >
            ▲ ▲ ▼ ▼ CHEAT ACTIVATED
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D canvas */}
      <div className="xp-canvas-wrap">
        <Canvas
          shadows={false}
          dpr={mobile ? [1, 1.3] : [1, 1.8]}
          gl={{ antialias: !mobile, alpha: false, powerPreference: 'high-performance' }}
          camera={{ position: [0, 6.5, 10], fov: 55, near: 0.1, far: 200 }}
        >
          <color attach="background" args={['#0a0a0f']} />
          <fog attach="fog" args={['#0a0a0f', 16, mobile ? 70 : 95]} />
          <Suspense fallback={null}>
            <ScrollControls pages={PAGES} damping={0.28}>
              <World
                mobile={mobile}
                onZoneChange={setZone}
                cheatRef={cheatRef}
                onCharClick={handleCharClick}
              />
            </ScrollControls>
            <Effects mobile={mobile} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default ImmersiveExperience;
