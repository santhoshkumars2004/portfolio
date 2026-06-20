import React, { useEffect, useState } from 'react';

const LINES = [
  '> booting Santhosh.exe ...',
  '> loading neon_city.map ............ OK',
  '> spawning character.rig ........... OK',
  '> compiling shaders [bloom] ........ OK',
  '> establishing uplink .............. OK',
  '> WELCOME TO THE GRID',
];

/**
 * LoadingScreen — terminal-style boot sequence that types out, then fades.
 * `progress` (0..100) reflects real asset loading; the panel waits for both the
 * type-out and progress to finish before calling onDone.
 */
const LoadingScreen = ({ progress = 100, onDone }) => {
  const [shown, setShown] = useState([]);
  const [current, setCurrent] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [fading, setFading] = useState(false);

  // typewriter
  useEffect(() => {
    if (lineIdx >= LINES.length) return;
    const line = LINES[lineIdx];
    if (charIdx <= line.length) {
      const t = setTimeout(() => {
        setCurrent(line.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, 18 + Math.random() * 30);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setShown((s) => [...s, line]);
      setCurrent('');
      setCharIdx(0);
      setLineIdx((i) => i + 1);
    }, 180);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx]);

  const typedDone = lineIdx >= LINES.length;

  useEffect(() => {
    if (typedDone && progress >= 100 && !fading) {
      const t = setTimeout(() => setFading(true), 500);
      return () => clearTimeout(t);
    }
  }, [typedDone, progress, fading]);

  useEffect(() => {
    if (!fading) return;
    const t = setTimeout(() => onDone && onDone(), 800);
    return () => clearTimeout(t);
  }, [fading, onDone]);

  return (
    <div className="xp-loader" style={{ opacity: fading ? 0 : 1, pointerEvents: fading ? 'none' : 'auto' }}>
      <div className="xp-loader__panel">
        <div className="xp-loader__bar-top">
          <span style={{ background: '#ff5f56' }} />
          <span style={{ background: '#ffbd2e' }} />
          <span style={{ background: '#27c93f' }} />
        </div>
        {shown.map((l, i) => (
          <div className="xp-loader__line" key={i}>
            {l}
          </div>
        ))}
        <div className="xp-loader__line">
          {current}
          <span className="xp-loader__cursor" />
        </div>
        <div className="xp-loader__progress">
          <i style={{ width: `${Math.max(progress, typedDone ? 100 : 10)}%` }} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
