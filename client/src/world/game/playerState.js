// Shared, frame-mutated player state (no React re-renders).
// Read/written by Player, FollowCamera, InteractionSystem.
import * as THREE from 'three';
import { LAYOUT } from '../config';

export const player = {
  position: new THREE.Vector3(0, 0, 3.2), // start in front of home, on the sidewalk
  heading: Math.PI / 2, // facing +X (down the street)
  cameraYaw: Math.PI / 2, // camera looks down the street initially
  speed: 0, // planar speed magnitude (drives walk cycle)
  moving: false,
  running: false,
  idleTime: 0,
  groundY: 0,
  // easter-egg dance handled in ToonCharacter via store
};

export function resetPlayer() {
  player.position.set(0, 0, 3.2);
  player.heading = Math.PI / 2;
  player.cameraYaw = Math.PI / 2;
  player.speed = 0;
  player.moving = false;
  player.idleTime = 0;
  player.groundY = 0;
}

export const WORLD_END = LAYOUT.roofEnd;
