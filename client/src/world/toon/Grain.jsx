import React from 'react';
import { EffectComposer, Noise, Vignette, SMAA } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

/**
 * Grain — subtle film grain + soft vignette for the hand-made storybook feel.
 * Deliberately NO bloom / chromatic aberration (this world is quiet and real).
 */
export default function Grain({ mobile = false }) {
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      {!mobile ? <SMAA /> : <></>}
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={mobile ? 0.18 : 0.28} />
      <Vignette eskil={false} offset={0.3} darkness={0.5} />
    </EffectComposer>
  );
}
