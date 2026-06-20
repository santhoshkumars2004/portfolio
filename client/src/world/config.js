// ============================================================
//  "Santhosh's Neighborhood" — walkable 3D world configuration
//  One long street (+X) with six zones. Korean-indie toon look.
//  Single source of truth for layout, colliders, and copy.
// ============================================================
import * as THREE from 'three';

/* ---------------- palette (muted, warm, hand-painted) ---------------- */
export const COLORS = {
  skyTop: '#8EC5C0',
  skyBottom: '#E7D9C2',
  skyEvening: '#5B6B86',
  skyEveningBottom: '#E6A074',
  road: '#C8C2B4',
  roadLine: '#EFE9DC',
  sidewalk: '#D8D2C4',
  cream: '#E8E0D0',
  green: '#9DB89A',
  terracotta: '#C4785A',
  brick: '#B86B4E',
  yellow: '#F2C94C',
  teal: '#56CCF2',
  ink: '#33312E',
  white: '#F4F1E8',
  pants: '#3C4658',
  skin: '#F0C9A4',
  hair: '#2E2620',
  pack: '#C4785A',
  leaf: '#7FA37C',
  wood: '#B98A5E',
  woodDark: '#8A6440',
  metal: '#9AA0A6',
  cat: '#3A3430',
};

/* ---------------- layout ---------------- */
export const LAYOUT = {
  start: -10,
  roofStart: 120, // staircase begins
  roofRampEnd: 126,
  roofEnd: 140,
  roofHeight: 3.4,
  corridorZ: 4.6, // half-width walkable corridor
};

// Each zone is centered on an X anchor along the street.
export const ZONES = [
  { id: 0, key: 'home', name: 'Home', title: 'Home', x: 0 },
  { id: 1, key: 'coffee', name: 'Chai Stall', title: 'Chai Time', x: 26 },
  { id: 2, key: 'cisco', name: 'Cisco Systems', title: 'At Work', x: 52 },
  { id: 3, key: 'cafe', name: 'StackSense Labs', title: 'Building…', x: 76 },
  { id: 4, key: 'jobboard', name: 'The Job Board', title: 'Applying…', x: 100 },
  { id: 5, key: 'rooftop', name: 'Rooftop', title: 'Rooftop', x: 130 },
];

export const zoneIndexAtX = (x) => {
  let best = 0;
  let bestD = Infinity;
  for (const z of ZONES) {
    const d = Math.abs(z.x - x);
    if (d < bestD) {
      bestD = d;
      best = z.id;
    }
  }
  return best;
};

/* ---------------- walkable area (union of rectangles) ----------------
   A point is standable if it lies inside any walkable rect AND outside
   every solid collider. Axis-separated sliding gives smooth wall-follow. */
export const WALKABLE = [
  // main street corridor
  { minX: -10, maxX: 122, minZ: -LAYOUT.corridorZ, maxZ: LAYOUT.corridorZ },
  // internet-café interior alcove (steps off the +Z sidewalk)
  { minX: 70, maxX: 82, minZ: 3.2, maxZ: 9.2 },
  // staircase + rooftop platform (elevated via groundHeight)
  { minX: 118, maxX: 139, minZ: -4.4, maxZ: 4.4 },
];

// Solid rectangles the player must walk around (protruding props/furniture).
export const COLLIDERS = [
  { minX: 23, maxX: 30, minZ: -4.2, maxZ: -2.6 }, // chai stall counter
  { minX: 96, maxX: 104, minZ: 3.0, maxZ: 4.2 }, // job board base wall
  { minX: 73, maxX: 79, minZ: 7.6, maxZ: 9.0 }, // café back desk
  { minX: 98, maxX: 101, minZ: -3.6, maxZ: -2.4 }, // bench (sad NPC)
];

/* ---------------- ground height (rooftop ramp) ---------------- */
export function groundHeight(x) {
  const { roofStart, roofRampEnd, roofHeight } = LAYOUT;
  if (x <= roofStart) return 0;
  if (x >= roofRampEnd) return roofHeight;
  return ((x - roofStart) / (roofRampEnd - roofStart)) * roofHeight;
}

export function isStandable(x, z) {
  let inside = false;
  for (const r of WALKABLE) {
    if (x >= r.minX && x <= r.maxX && z >= r.minZ && z <= r.maxZ) {
      inside = true;
      break;
    }
  }
  if (!inside) return false;
  for (const c of COLLIDERS) {
    if (x >= c.minX && x <= c.maxX && z >= c.minZ && z <= c.maxZ) return false;
  }
  return true;
}

/* ---------------- real links ---------------- */
export const LINKS = {
  email: 'santhoshkumar.btech1@gmail.com',
  github: 'https://github.com/santhoshkumars2004',
  linkedin: 'https://www.linkedin.com/in/santhosh-kumar-s-67465a239/',
  resume: '/resume.pdf',
  stacksense: 'https://github.com/santhoshkumars2004/Stacksense',
};

/* ---------------- dialogue + content ---------------- */
export const DIALOG = {
  mom: [
    'Santhosh! You graduated B.E. IT with 8.1 CGPA from PSNA College.',
    'Now go find that job! Make us proud. 🙏',
  ],
  chai: [
    'Aye Santhosh, what you building now?',
    'Python? LangChain? FastAPI? RAG pipelines?',
    'Drink chai first, then save the world.',
  ],
  manager: [
    'Santhosh has been our Graduate Engineer since 2025.',
    'He built our PSB Security Compliance Platform — a 12-phase agentic AI pipeline over 168,000+ files with LangChain + RAG + ChromaDB.',
    'And the CUSP testing framework with Playwright + Jenkins.',
    "Honestly… he's ready for more.",
  ],
  sad: ['Day 47.', 'Still refreshing my inbox.'],
  cat: ['mrrrow~ 🐾'],
  duck: ['quack. (you found the rubber duck!)'],
};

export const CHAI_MENU = [
  "Today's Special:  Python • FastAPI • LangChain",
  'Also Serving:  RAG • ChromaDB • MCP Servers',
  'On the house:  Docker • PostgreSQL • TypeScript • Playwright',
];

export const JOBS = [
  { id: 'siemens', label: 'Siemens Energy', status: '⏳ Waiting' },
  { id: 'hpe', label: 'HPE', status: '⏳ Waiting' },
  { id: 'zapare', label: 'Zapare', status: '⏳ Waiting' },
  { id: 'zerotrail', label: 'Zerotrail', status: '⏳ Waiting' },
];

export const PROJECTS = {
  psb: {
    id: 'psb',
    emoji: '🛡️',
    title: 'PSB — Security Compliance Automation',
    tag: 'Cisco Systems · Flagship',
    color: COLORS.green,
    body: [
      'A 12-phase agentic AI pipeline that audits a 168,000+ file codebase for security & compliance gaps.',
      'Consensus-voted LLM gap detection turns raw scan noise into engineer-ready tickets — cutting review from years to under two hours.',
    ],
    stack: ['LangChain', 'RAG', 'ChromaDB', 'MCP Servers', 'FastAPI', 'Python'],
  },
  cusp: {
    id: 'cusp',
    emoji: '🧪',
    title: 'CUSP — Testing Automation Framework',
    tag: 'Cisco Systems',
    color: COLORS.teal,
    body: [
      'End-to-end UI test automation at scale, wired into CI for fast, reliable feedback.',
      '200+ automated tests, ~95% coverage across critical flows.',
    ],
    stack: ['Playwright', 'TypeScript', 'Jenkins CI'],
  },
  stacksense: {
    id: 'stacksense',
    emoji: '🔎',
    title: 'StackSense — AI Codebase Q&A',
    tag: 'Personal project',
    color: COLORS.yellow,
    body: ['Ask natural-language questions about any codebase and get grounded answers with sources.'],
    stack: ['Groq API', 'HuggingFace Embeddings', 'ChromaDB', 'Next.js'],
    link: LINKS.stacksense,
  },
};

export const RESUME = {
  name: 'Santhosh Kumar S',
  role: 'Graduate Engineer @ Cisco Systems',
  blurb:
    'AI / LLM backend engineer. I build production-ready agentic systems — RAG pipelines, compliance automation, and developer tooling.',
  education: {
    school: 'PSNA College of Engineering and Technology',
    degree: 'B.E. Information Technology',
    cgpa: '8.1 / 10',
  },
  experience: [
    {
      org: 'Cisco Systems',
      title: 'Graduate Engineer',
      period: '2025 — Present',
      points: [
        'Built the PSB Security Compliance Platform: a 12-phase agentic AI pipeline over 168,000+ files (LangChain · RAG · ChromaDB · FastAPI · MCP).',
        'Cut compliance review time from years to under two hours with consensus-voted LLM gap detection.',
        'Built the CUSP testing framework (Playwright · TypeScript · Jenkins) — 200+ tests, ~95% coverage.',
      ],
    },
  ],
  skills: [
    'Python', 'FastAPI', 'LangChain', 'RAG', 'ChromaDB', 'MCP Servers',
    'Docker', 'PostgreSQL', 'TypeScript', 'Playwright', 'Jenkins', 'Next.js',
  ],
};

/* shared reusable vectors to avoid per-frame allocation */
export const TMP = {
  v1: new THREE.Vector3(),
  v2: new THREE.Vector3(),
  v3: new THREE.Vector3(),
};
