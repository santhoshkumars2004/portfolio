import React, { useEffect, useRef, useState } from 'react';

/**
 * NeonCursor — a glowing dot + trailing ring that reacts to hoverable elements.
 * Disabled on touch devices via CSS. Uses rAF for smooth trailing.
 */
const NeonCursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);
  const target = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      const el = e.target;
      const interactive = el.closest('a, button, .xp-btn, .xp-chip, [data-hover]');
      setHover(Boolean(interactive));
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    let raf;
    const loop = () => {
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div ref={dot} className={`xp-cursor ${hover ? 'xp-cursor--hover' : ''}`} />
      <div ref={ring} className={`xp-cursor__ring ${hover ? 'xp-cursor__ring--hover' : ''}`} />
    </>
  );
};

export default NeonCursor;
