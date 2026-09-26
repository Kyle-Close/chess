import { useSyncExternalStore } from 'react';
import { MoveMetaData } from 'base/zod/MoveMetaDataSchema';

import moveSfx from 'base/assets/audio/standard-move.wav';
import captureSfx from 'base/assets/audio/capture.mp3';
import castleSfx from 'base/assets/audio/castle.mp3';
import checkSfx from 'base/assets/audio/check.mp3';
import startSfx from 'base/assets/audio/start-game.mp3';
import endSfx from 'base/assets/audio/end-game.mp3';

const SOURCES = {
  move: moveSfx,
  capture: captureSfx,
  castle: castleSfx,
  check: checkSfx,
  start: startSfx,
  end: endSfx,
};

export type SoundName = keyof typeof SOURCES;

const STORAGE_KEY = 'soundEnabled';
const listeners = new Set<() => void>();

function readEnabled() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'false';
  } catch {
    return true;
  }
}

let enabled = readEnabled();

export function setSoundEnabled(value: boolean) {
  enabled = value;
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // Storage unavailable (private mode etc.) - the in-memory value still applies
  }
  listeners.forEach((l) => l());
}

export function useSoundEnabled() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => enabled
  );
}

export function playSound(name: SoundName) {
  if (!enabled) return;
  const audio = new Audio(SOURCES[name]);
  audio.volume = 0.7;
  // Autoplay can be rejected before the first user gesture - that's fine
  audio.play().catch(() => undefined);
}

export function getMoveSound(move: MoveMetaData): SoundName {
  if (move.causesCheck) return 'check';
  if (move.isCastle) return 'castle';
  if (move.isCapture || move.isEnPassantCapture) return 'capture';
  return 'move';
}
