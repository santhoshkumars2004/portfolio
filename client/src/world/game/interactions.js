// Interaction registry + nearest-target detection.
// Each <Interactable> registers here; a system component (in Player) finds the
// closest one within range each frame and writes it to the store (for the hint).
import { player } from './playerState';

const registry = new Map(); // id -> { id, x, z, radius, priority, label, onInteract }

export function register(entry) {
  registry.set(entry.id, entry);
}
export function unregister(id) {
  registry.delete(id);
}

export function getEntry(id) {
  return registry.get(id);
}

// Returns the id of the nearest in-range interactable (priority breaks ties),
// or null. The cat/duck use a higher priority so they're never missed.
export function findNearest() {
  let best = null;
  let bestScore = Infinity;
  const px = player.position.x;
  const pz = player.position.z;
  for (const e of registry.values()) {
    const d = Math.hypot(e.x - px, e.z - pz);
    if (d > e.radius) continue;
    // lower score wins; priority subtracts so high-priority items win ties
    const score = d - (e.priority || 0) * 1.5;
    if (score < bestScore) {
      bestScore = score;
      best = e;
    }
  }
  return best;
}
