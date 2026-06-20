import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';

import './world.css';
import World from './World';
import Hud from './ui/Hud';
import Modals from './ui/Modals';
import Joystick from './ui/Joystick';
import LoadingScreen from './ui/LoadingScreen';
import { createWorldAudio } from './audio/sound';
import { sfx } from './audio/sfx';
import { attachInput } from './game/input';
import { resetPlayer } from './game/playerState';
import { useGame, getState, actions } from './store/gameStore';

/** Auto-dismissing toast bound to the game store. */
function Toast() {
  const toast = useGame((s) => s.toast);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => actions.toast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);
  if (!toast) return null;
  return <div className="wl-toast">{toast}</div>;
}

/**
 * WorldExperience — full-screen, no-chrome route at /world. Boots the playable
 * neighborhood: loading screen, audio unlock + ambience, touch input, and the
 * R3F canvas with all the DOM UI layered on top.
 */
export default function WorldExperience() {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const soundOn = useGame((s) => s.soundOn);
  const mobile = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
    []
  );
  const sound = useMemo(() => createWorldAudio(), []);
  const unlocked = useRef(false);

  // make one-shot sfx (cat/duck) reachable from world interactions
  useEffect(() => {
    sfx.kit = sound;
    return () => {
      sfx.kit = null;
    };
  }, [sound]);

  // fresh player position + keyboard/touch input each time we enter
  useEffect(() => {
    resetPlayer();
    document.title = 'Walk My Neighborhood · Santhosh';
    const detach = attachInput();
    return detach;
  }, []);

  // simulate a short warm-up while the alarm rings
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(100, v + Math.random() * 15 + 8);
      setProgress(v);
      if (v >= 100) clearInterval(id);
    }, 130);
    return () => clearInterval(id);
  }, []);

  // unlock Web Audio + start ambience on first gesture (autoplay policy)
  useEffect(() => {
    const unlock = () => {
      if (unlocked.current) return;
      unlocked.current = true;
      sound.unlock();
      if (getState().soundOn) sound.startAmbience();
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
    window.addEventListener('touchstart', unlock);
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
  }, [sound]);

  // reflect the sound toggle
  useEffect(() => {
    sound.setMuted(!soundOn);
  }, [sound, soundOn]);

  // tidy up audio when leaving the route
  useEffect(() => () => sound.setMuted(true), [sound]);

  return (
    <div className="wl-root">
      <Canvas
        className="wl-canvas"
        shadows
        dpr={[1, mobile ? 1.5 : 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [-8.2, 4.8, 3.2], fov: 50, near: 0.1, far: 220 }}
      >
        <Suspense fallback={null}>
          <World sound={sound} mobile={mobile} />
        </Suspense>
      </Canvas>

      <Hud />
      <Modals />
      {mobile && <Joystick />}
      <Toast />
      {!ready && <LoadingScreen progress={progress} onDone={() => setReady(true)} />}
    </div>
  );
}
