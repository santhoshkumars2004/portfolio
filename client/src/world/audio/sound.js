// Synthesized Web Audio "city" kit — no asset files.
// Ambient pad + filtered-noise breeze, plus one-shot footstep/ding/swoosh/meow.
// Must be unlocked by a user gesture (autoplay policy).
export function createWorldAudio() {
  let ctx = null;
  let muted = false;
  let ambienceOn = false;
  let master = null;
  let ambGain = null;
  let nodes = [];

  const ensure = () => {
    if (!ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      ctx = new Ctx();
      master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  };

  const tone = (freq, dur = 0.18, type = 'sine', gain = 0.12, when = 0, glideTo = null) => {
    const c = ensure();
    if (!c || muted) return;
    const t = c.currentTime + when;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t + dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g);
    g.connect(master);
    osc.start(t);
    osc.stop(t + dur + 0.03);
  };

  const noiseBuffer = () => {
    const c = ensure();
    const len = c.sampleRate * 2;
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  };

  const startAmbience = () => {
    const c = ensure();
    if (!c || ambienceOn) return;
    ambienceOn = true;
    ambGain = c.createGain();
    ambGain.gain.value = muted ? 0 : 0.16;
    ambGain.connect(master);

    // warm drone pad (two detuned saws through a lowpass)
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 420;
    lp.connect(ambGain);
    [110, 110.5, 164].forEach((f, i) => {
      const o = c.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = f;
      const g = c.createGain();
      g.gain.value = i === 2 ? 0.04 : 0.06;
      o.connect(g);
      g.connect(lp);
      o.start();
      nodes.push(o, g);
    });

    // breeze: looping filtered noise with slow LFO on the cutoff
    const src = c.createBufferSource();
    src.buffer = noiseBuffer();
    src.loop = true;
    const bp = c.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 900;
    bp.Q.value = 0.7;
    const ng = c.createGain();
    ng.gain.value = 0.05;
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoG = c.createGain();
    lfoG.gain.value = 500;
    lfo.connect(lfoG);
    lfoG.connect(bp.frequency);
    src.connect(bp);
    bp.connect(ng);
    ng.connect(ambGain);
    src.start();
    lfo.start();
    nodes.push(src, bp, ng, lfo, lfoG, lp);

    // occasional distant bird chirp
    const chirp = () => {
      if (!ambienceOn) return;
      if (!muted) {
        tone(2100 + Math.random() * 600, 0.09, 'sine', 0.03, 0, 2600);
        tone(2600 + Math.random() * 400, 0.07, 'sine', 0.025, 0.1, 3000);
      }
      setTimeout(chirp, 4000 + Math.random() * 7000);
    };
    setTimeout(chirp, 2500);
  };

  return {
    unlock: () => ensure(),
    setMuted: (m) => {
      muted = m;
      if (ambGain) ambGain.gain.value = m ? 0 : 0.16;
    },
    isMuted: () => muted,
    startAmbience,
    footstep: () => {
      // soft scuff: short filtered noise blip
      const c = ensure();
      if (!c || muted) return;
      const src = c.createBufferSource();
      src.buffer = noiseBuffer();
      const bp = c.createBiquadFilter();
      bp.type = 'lowpass';
      bp.frequency.value = 700;
      const g = c.createGain();
      const t = c.currentTime;
      g.gain.setValueAtTime(0.08, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      src.connect(bp);
      bp.connect(g);
      g.connect(master);
      src.start(t);
      src.stop(t + 0.1);
    },
    ding: () => {
      tone(1320, 0.16, 'sine', 0.12);
      tone(1760, 0.28, 'sine', 0.08, 0.02);
    },
    swoosh: () => tone(520, 0.14, 'triangle', 0.06, 0, 900),
    meow: () => {
      tone(620, 0.18, 'sawtooth', 0.07, 0, 880);
      tone(880, 0.22, 'sawtooth', 0.06, 0.16, 560);
    },
    quack: () => {
      tone(300, 0.12, 'square', 0.08, 0, 180);
      tone(260, 0.14, 'square', 0.07, 0.1, 150);
    },
  };
}
