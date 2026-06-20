// Tiny external store (Zustand-like) built on React 18's useSyncExternalStore.
// No dependency; selectors must return primitives or stable references.
import { useSyncExternalStore } from 'react';

const initial = {
  ready: false,
  loading: 100, // 0..100 — simulated warm-up
  zone: 0,
  activeTargetId: null, // interactable currently in range (drives PRESS E hint)
  dialog: null, // { id, lines, anchor:[x,y,z], speaker }
  modal: null, // { type:'resume'|'project'|'contact', data }
  soundOn: true,
  duckFound: false,
  dancing: false,
  toast: null,
  showControls: true,
};

let state = initial;
const listeners = new Set();

export const getState = () => state;

export const setState = (partial) => {
  const next = typeof partial === 'function' ? partial(state) : partial;
  let changed = false;
  for (const k in next) {
    if (!Object.is(state[k], next[k])) {
      changed = true;
      break;
    }
  }
  if (!changed) return;
  state = { ...state, ...next };
  listeners.forEach((l) => l());
};

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useGame(selector = (s) => s) {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(initial)
  );
}

/* ---- semantic action helpers ---- */
export const actions = {
  openDialog: (id, lines, speaker) => setState({ dialog: { id, lines, speaker } }),
  closeDialog: () => setState({ dialog: null }),
  openModal: (type, data) => setState({ modal: { type, data } }),
  closeModal: () => setState({ modal: null }),
  setZone: (zone) => setState({ zone }),
  setTarget: (activeTargetId) => setState({ activeTargetId }),
  toggleSound: () => setState((s) => ({ soundOn: !s.soundOn })),
  findDuck: () => setState({ duckFound: true, dancing: true }),
  toast: (toast) => setState({ toast }),
};
