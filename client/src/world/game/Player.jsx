import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ToonCharacter from './ToonCharacter';
import { player } from './playerState';
import { readMove, isRunning, consumeInteract } from './input';
import { resolveMove } from './collision';
import { findNearest } from './interactions';
import { groundHeight, zoneIndexAtX, ZONES, COLORS } from '../config';
import { getState, setState, actions } from '../store/gameStore';

const WALK = 3.4;
const RUN = 6.2;
const STEP_DIST = 0.62;

function dampAngle(cur, tgt, lambda, dt) {
  let d = tgt - cur;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return cur + d * (1 - Math.exp(-lambda * dt));
}

/**
 * Player — the controllable hero. Owns the movement loop, ground/zone tracking,
 * footstep audio, and the per-frame interaction detection that drives the
 * "PRESS E" hint and triggers the nearest interactable.
 */
export default function Player({ sound }) {
  const root = useRef();
  const pose = useRef({ speed: 0, moving: false, running: false, sitting: false, yawn: false, dance: false, lookUp: false });
  const stepAcc = useRef(0);
  const lastTarget = useRef(null);
  const danceStart = useRef(null);

  useFrame((state, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05); // clamp big tab-switch frames
    const t = state.clock.elapsedTime;
    const s = getState();

    // ---- input → world-space move (camera-relative) ----
    const mv = readMove();
    const running = isRunning();
    const yaw = player.cameraYaw;
    const fx = Math.sin(yaw);
    const fz = Math.cos(yaw);
    const rx = -Math.cos(yaw);
    const rz = Math.sin(yaw);
    let wx = fx * mv.y + rx * mv.x;
    let wz = fz * mv.y + rz * mv.x;
    const mag = Math.hypot(wx, wz);

    const dialogOrModal = s.dialog || s.modal;

    if (mag > 0.02 && !dialogOrModal) {
      wx /= mag;
      wz /= mag;
      const speed = running ? RUN : WALK;
      resolveMove(player.position, wx * speed * dt, wz * speed * dt);
      const targetHeading = Math.atan2(wx, wz);
      player.heading = dampAngle(player.heading, targetHeading, 10, dt);
      player.moving = true;
      player.running = running;
      player.speed = speed / 4;
      player.idleTime = 0;

      // footsteps
      stepAcc.current += speed * dt;
      if (stepAcc.current > STEP_DIST) {
        stepAcc.current = 0;
        if (s.soundOn) sound?.footstep();
      }
    } else {
      player.moving = false;
      player.running = false;
      player.speed = THREE.MathUtils.damp(player.speed, 0, 8, dt);
      player.idleTime += dt;
      stepAcc.current = 0;
    }

    // ---- ground height (rooftop ramp) ----
    const gy = groundHeight(player.position.x);
    player.groundY = THREE.MathUtils.damp(player.groundY, gy, 10, dt);

    if (root.current) {
      root.current.position.set(player.position.x, player.groundY, player.position.z);
      root.current.rotation.y = player.heading;
    }

    // ---- zone + page title ----
    const zi = zoneIndexAtX(player.position.x);
    if (zi !== s.zone) {
      actions.setZone(zi);
      document.title = `${ZONES[zi].title} · Santhosh`;
    }

    // ---- rooftop sit / idle yawn / dance ----
    const sitting = zi === 5 && !player.moving && player.idleTime > 5;
    let dancing = s.dancing;
    if (dancing) {
      if (danceStart.current == null) danceStart.current = t;
      if (t - danceStart.current > 3.4) {
        danceStart.current = null;
        setState({ dancing: false });
        dancing = false;
      }
    } else {
      danceStart.current = null;
    }

    const p = pose.current;
    p.speed = player.speed;
    p.moving = player.moving;
    p.running = player.running;
    p.sitting = sitting;
    p.dance = dancing;
    p.yawn = !player.moving && !sitting && player.idleTime > 6;
    p.lookUp = zi === 5 && !sitting;

    // ---- interaction detection ----
    const near = findNearest();
    const nearId = near ? near.id : null;
    if (nearId !== lastTarget.current) {
      lastTarget.current = nearId;
      actions.setTarget(nearId);
    }

    if (consumeInteract()) {
      const cur = getState();
      if (cur.dialog) {
        actions.closeDialog();
        if (cur.soundOn) sound?.swoosh();
      } else if (!cur.modal && near) {
        near.onInteract();
        if (cur.soundOn) sound?.ding();
      }
    }
  });

  return (
    <group ref={root} position={[player.position.x, 0, player.position.z]}>
      <ToonCharacter
        poseRef={pose}
        backpack
        colors={{ shirt: COLORS.white, pants: COLORS.pants, pack: COLORS.terracotta }}
      />
    </group>
  );
}
