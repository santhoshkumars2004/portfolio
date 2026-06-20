// Shared world configuration for the immersive city experience.
// Keeping these in one place keeps the camera, character, city, and zones in sync.

export const PALETTE = {
  black: '#0a0a0f',
  cyan: '#00f5ff',
  purple: '#9b59b6',
  blue: '#2d6cff',
  pink: '#ff4fd8',
  deepNavy: '#0e1326',
  windowWarm: '#ffd27a',
};

// Total forward travel distance (world units along -Z) across the whole scroll.
export const TRAVEL = 240;

// Number of scrollable pages for <ScrollControls>.
// 5 sections x 100vh => offset i/4 aligns DOM zone i with its 3D landmark.
export const PAGES = 5;

// Five story zones positioned evenly along the travel path.
// `z` is the world Z where the zone "centers". Character runs from z=0 to z=-TRAVEL.
export const ZONES = [
  { id: 0, key: 'origin', name: 'ORIGIN', accent: PALETTE.cyan },
  { id: 1, key: 'dojo', name: 'THE DOJO', accent: PALETTE.purple },
  { id: 2, key: 'missions', name: 'MISSIONS', accent: PALETTE.blue },
  { id: 3, key: 'academy', name: 'THE ACADEMY', accent: PALETTE.cyan },
  { id: 4, key: 'signal', name: 'SIGNAL', accent: PALETTE.pink },
];

export const ZONE_COUNT = ZONES.length;

// World Z for a given zone index.
export const zoneZ = (index) => -(index / (ZONE_COUNT - 1)) * TRAVEL;

// Map a scroll offset (0..1) to a world Z position.
export const offsetToZ = (offset) => -offset * TRAVEL;
