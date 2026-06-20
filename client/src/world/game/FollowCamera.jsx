import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { player } from './playerState';

const DIST = 8.2;
const HEIGHT = 4.8;
const LOOK_Y = 1.5;

function dampAngle(cur, tgt, lambda, dt) {
  let d = tgt - cur;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return cur + d * (1 - Math.exp(-lambda * dt));
}

/**
 * FollowCamera — third-person camera that trails the player from behind and
 * slightly above (A Short Hike / BotW feel). The camera yaw eases toward the
 * player's heading and is published back to playerState so input stays
 * camera-relative.
 */
export default function FollowCamera() {
  const { camera } = useThree();
  const tmp = new THREE.Vector3();
  const look = new THREE.Vector3();

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);

    // ease the camera yaw toward where the player is heading (only when moving)
    if (player.moving) {
      player.cameraYaw = dampAngle(player.cameraYaw, player.heading, 2.4, dt);
    }

    const yaw = player.cameraYaw;
    // sit behind the player along -forward
    const bx = player.position.x - Math.sin(yaw) * DIST;
    const bz = player.position.z - Math.cos(yaw) * DIST;
    const by = player.groundY + HEIGHT;

    tmp.set(bx, by, bz);
    camera.position.lerp(tmp, 1 - Math.exp(-6 * dt));

    look.set(
      player.position.x + Math.sin(yaw) * 1.5,
      player.groundY + LOOK_Y,
      player.position.z + Math.cos(yaw) * 1.5
    );
    camera.lookAt(look);
  });

  return null;
}
