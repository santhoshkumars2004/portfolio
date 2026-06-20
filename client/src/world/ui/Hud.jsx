import React from 'react';
import { Link } from 'react-router-dom';
import { useGame, actions } from '../store/gameStore';
import { ZONES } from '../config';

/**
 * Hud — minimal heads-up display: identity (top-left), zone progress dots
 * (top-center), and sound/exit controls (top-right). A controls hint sits at
 * the bottom and auto-fades via CSS.
 */
export default function Hud() {
  const zone = useGame((s) => s.zone);
  const soundOn = useGame((s) => s.soundOn);

  return (
    <>
      <div className="wl-hud">
        <div className="wl-hud__brand">
          SANTHOSH · <b>the job hunter</b>
        </div>
        <div className="wl-dots">
          {ZONES.map((z, i) => (
            <span key={z.id} className={`wl-dot ${i === zone ? 'wl-dot--on' : ''}`} title={z.name} />
          ))}
        </div>
        <div className="wl-actions">
          <button className="wl-btn" onClick={() => actions.toggleSound()}>
            {soundOn ? '🔊 sound' : '🔇 muted'}
          </button>
          <Link className="wl-btn" to="/">
            ✕ exit
          </Link>
        </div>
      </div>

      <div className="wl-controls">
        <span>
          <kbd>W</kbd>
          <kbd>A</kbd>
          <kbd>S</kbd>
          <kbd>D</kbd> / arrows to move
        </span>
        <span>·</span>
        <span>
          <kbd>E</kbd> interact
        </span>
        <span>·</span>
        <span>
          <kbd>Shift</kbd> run
        </span>
      </div>
    </>
  );
}
