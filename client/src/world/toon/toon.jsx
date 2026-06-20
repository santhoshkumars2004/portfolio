import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Outlines } from '@react-three/drei';
import { COLORS } from '../config';

// 3-band gradient ramp shared by every toon material (stepped cel shading).
let _gradient = null;
export function toonGradient() {
  if (_gradient) return _gradient;
  const bands = new Uint8Array([95, 165, 245]);
  const tex = new THREE.DataTexture(bands, bands.length, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  _gradient = tex;
  return tex;
}

// <Toon color="#.." /> — drop-in cel-shaded material.
export function Toon({ color = '#ffffff', ...props }) {
  const grad = toonGradient();
  return <meshToonMaterial color={color} gradientMap={grad} {...props} />;
}

// <Ink /> — consistent dark comic-book outline (child of a mesh).
export function Ink({ thickness = 0.018, color = COLORS.ink, ...props }) {
  return <Outlines thickness={thickness} color={color} {...props} />;
}

// Reusable hand-painted soft-edged sprite texture (clouds, smoke, paper).
export function softCircleTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 8, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  return tex;
}

export { COLORS };

export default function useToonGradient() {
  return useMemo(() => toonGradient(), []);
}
