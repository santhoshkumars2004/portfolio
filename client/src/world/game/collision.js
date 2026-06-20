// Axis-separated collision against the walkable-rect union + solid colliders.
// Moving each axis independently lets the player slide along walls smoothly.
import { isStandable } from '../config';

export function resolveMove(pos, dx, dz) {
  let { x, z } = pos;

  // try X
  if (dx !== 0 && isStandable(x + dx, z)) {
    x += dx;
  } else if (dx !== 0) {
    // creep up to the wall in small steps so we don't stick a gap away
    const step = Math.sign(dx) * 0.04;
    let moved = 0;
    while (Math.abs(moved) < Math.abs(dx) && isStandable(x + moved + step, z)) {
      moved += step;
    }
    x += moved;
  }

  // try Z (using already-updated X so corners feel natural)
  if (dz !== 0 && isStandable(x, z + dz)) {
    z += dz;
  } else if (dz !== 0) {
    const step = Math.sign(dz) * 0.04;
    let moved = 0;
    while (Math.abs(moved) < Math.abs(dz) && isStandable(x, z + moved + step)) {
      moved += step;
    }
    z += moved;
  }

  pos.x = x;
  pos.z = z;
  return pos;
}
