import React, { useRef } from 'react';
import { setTouchVector, queueInteract } from '../game/input';

const R = 44; // joystick travel radius (px)

/**
 * Joystick — on-screen movement pad + interact button for touch devices.
 * Feeds the same input system the keyboard uses.
 */
export default function Joystick() {
  const base = useRef();
  const stick = useRef();
  const active = useRef(false);

  const moveTo = (clientX, clientY) => {
    if (!base.current) return;
    const b = base.current.getBoundingClientRect();
    const cx = b.left + b.width / 2;
    const cy = b.top + b.height / 2;
    let dx = clientX - cx;
    let dy = clientY - cy;
    const len = Math.hypot(dx, dy) || 1;
    const clamped = Math.min(len, R);
    dx = (dx / len) * clamped;
    dy = (dy / len) * clamped;
    if (stick.current) stick.current.style.transform = `translate(${dx}px, ${dy}px)`;
    // forward = up on screen (negative dy)
    setTouchVector(dx / R, -dy / R);
  };

  const onStart = (e) => {
    active.current = true;
    const t = e.touches[0];
    moveTo(t.clientX, t.clientY);
  };
  const onMove = (e) => {
    if (!active.current) return;
    const t = e.touches[0];
    moveTo(t.clientX, t.clientY);
  };
  const onEnd = () => {
    active.current = false;
    setTouchVector(0, 0);
    if (stick.current) stick.current.style.transform = 'translate(0px, 0px)';
  };

  return (
    <>
      <div
        ref={base}
        className="wl-joystick"
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
        onTouchCancel={onEnd}
      >
        <div ref={stick} className="wl-joystick__stick" />
      </div>
      <button
        className="wl-tap"
        onTouchStart={(e) => {
          e.preventDefault();
          queueInteract();
        }}
      >
        E
      </button>
    </>
  );
}
