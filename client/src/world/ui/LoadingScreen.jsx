import React, { useEffect, useState } from 'react';

/**
 * LoadingScreen — a hand-drawn alarm clock ringing while the neighborhood wakes
 * up, with the line "Getting ready for another day…". Fades out when done.
 */
export default function LoadingScreen({ progress = 100, onDone }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (progress >= 100 && !fading) {
      const t = setTimeout(() => setFading(true), 480);
      return () => clearTimeout(t);
    }
  }, [progress, fading]);

  useEffect(() => {
    if (!fading) return;
    const t = setTimeout(() => onDone && onDone(), 700);
    return () => clearTimeout(t);
  }, [fading, onDone]);

  return (
    <div className={`wl-loader ${fading ? 'wl-loader--hide' : ''}`}>
      <svg className="wl-alarm" width="128" height="128" viewBox="0 0 120 120" fill="none">
        <circle cx="38" cy="22" r="11" fill="#C4785A" />
        <circle cx="82" cy="22" r="11" fill="#C4785A" />
        <rect x="30" y="96" width="12" height="16" rx="3" fill="#8A6440" />
        <rect x="78" y="96" width="12" height="16" rx="3" fill="#8A6440" />
        <circle cx="60" cy="62" r="40" fill="#F2C94C" stroke="#33312E" strokeWidth="4" />
        <circle cx="60" cy="62" r="31" fill="#F4F1E8" />
        <rect x="58" y="40" width="4" height="24" rx="2" fill="#33312E" transform="rotate(40 60 62)" />
        <rect x="58" y="46" width="4" height="18" rx="2" fill="#33312E" transform="rotate(-70 60 62)" />
        <circle cx="60" cy="62" r="4" fill="#C4785A" />
        <rect x="54" y="6" width="12" height="8" rx="3" fill="#8A6440" />
      </svg>
      <div className="wl-loader__text">Getting ready for another day…</div>
      <div className="wl-loader__bar">
        <i style={{ width: `${Math.max(progress, 8)}%` }} />
      </div>
      <div className="wl-loader__tip">Use WASD / arrow keys to walk · press E to interact</div>
    </div>
  );
}
