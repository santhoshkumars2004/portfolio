// Keyboard + touch input. Exposes a normalized move vector and edge-triggered
// "interact" presses. A single module-level singleton, polled each frame.

const keys = new Set();
const move = { x: 0, y: 0 }; // y>0 = forward (W/Up), x>0 = right (D/Right)
let running = false;
let interactQueued = false; // edge-triggered (E / Space / tap)
const touch = { active: false, x: 0, y: 0 };

const DOWN = (e) => {
  const k = e.key.toLowerCase();
  keys.add(k);
  if (k === 'shift') running = true;
  if (k === 'e' || k === ' ' || k === 'enter') {
    interactQueued = true;
    // prevent page scroll on space
    if (k === ' ') e.preventDefault();
  }
};
const UP = (e) => {
  const k = e.key.toLowerCase();
  keys.delete(k);
  if (k === 'shift') running = false;
};
const BLUR = () => {
  keys.clear();
  running = false;
};

export function attachInput() {
  window.addEventListener('keydown', DOWN, { passive: false });
  window.addEventListener('keyup', UP);
  window.addEventListener('blur', BLUR);
  return () => {
    window.removeEventListener('keydown', DOWN);
    window.removeEventListener('keyup', UP);
    window.removeEventListener('blur', BLUR);
  };
}

// Mobile joystick feeds this (values -1..1).
export function setTouchVector(x, y) {
  touch.active = x !== 0 || y !== 0;
  touch.x = x;
  touch.y = y;
}
export function queueInteract() {
  interactQueued = true;
}

export function readMove() {
  let x = 0;
  let y = 0;
  if (keys.has('w') || keys.has('arrowup')) y += 1;
  if (keys.has('s') || keys.has('arrowdown')) y -= 1;
  if (keys.has('d') || keys.has('arrowright')) x += 1;
  if (keys.has('a') || keys.has('arrowleft')) x -= 1;
  if (touch.active) {
    x += touch.x;
    y += touch.y;
  }
  // clamp to unit disc
  const len = Math.hypot(x, y);
  if (len > 1) {
    x /= len;
    y /= len;
  }
  move.x = x;
  move.y = y;
  return move;
}

export function isRunning() {
  return running || (touch.active && Math.hypot(touch.x, touch.y) > 0.85);
}

// Returns true once per press (consumes the edge).
export function consumeInteract() {
  if (interactQueued) {
    interactQueued = false;
    return true;
  }
  return false;
}
