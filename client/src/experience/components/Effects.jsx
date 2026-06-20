import React from 'react';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

/**
 * Effects — neon bloom post-processing that makes every emissive element glow.
 * Tuned softer / cheaper on mobile.
 */
const Effects = ({ mobile = false }) => {
  return (
    <EffectComposer disableNormalPass multisampling={mobile ? 0 : 4}>
      <Bloom
        intensity={mobile ? 0.9 : 1.5}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.7}
      />
      {!mobile && (
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(0.0006, 0.0006)}
        />
      )}
      <Vignette eskil={false} offset={0.25} darkness={0.85} />
    </EffectComposer>
  );
};

export default Effects;
