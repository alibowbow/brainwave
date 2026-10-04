import { initialImmersivePresetMix, resolveImmersiveAudioProfile } from './immersiveAudio/profiles';
import { normalizeWorldTouch, type NormalizedWorldTouch } from './immersiveAudio/interaction';
import type { SoundLayer, SoundPlaybackSnapshot } from './audioEngine';

export { initialImmersivePresetMix, resolveImmersiveAudioProfile };
export { createSceneAccentController } from './immersiveAudio/controller';

const unit = (v: unknown): v is number => typeof v === 'number' && Number.isFinite(v) && v > 0 && v <= 1;

/** Translate only reviewed semantic callbacks. Ambient events, brightness,
 * raw pointer events and unreviewed kinds stay silent. No renderer imports. */
export function reviewedWorldTouch(id: string, raw: unknown): NormalizedWorldTouch | null {
  if (id === 'amb:focus_cafe') return raw === 'cup'
    ? { phase: 'tap', kind: 'cup-touch', screenX: 0.5, intensity: 1 } : null;
  if (!raw || typeof raw !== 'object') return null;
  const e = raw as Record<string, unknown>;
  if ('phase' in e && e.phase !== 'tap') return null;
  let kind: string | undefined;
  let strength = e.strength;
  let screenX = 0.5;
  switch (id) {
    case 'amb:morning_forest':
      kind = e.kind === 'water' ? 'water-touch' : e.kind === 'leaf' ? 'leaf-touch' : undefined;
      break;
    case 'amb:cosmic':
      kind = e.kind === 'plant' ? 'leaf-touch' : undefined;
      break;
    case 'meditation':
    case 'amb:snowy_night': {
      const world = id === 'meditation' ? 'meditation' : 'snow-village';
      if (e.world !== world || typeof e.x !== 'number' || !Number.isFinite(e.x) || Math.abs(e.x) > 1) return null;
      // Meditation exports NDC; snow exports a normalized local hit coordinate.
      screenX = id === 'meditation' ? (e.x + 1) / 2 : 0.5;
      kind = id === 'meditation' ? (e.kind === 'water' ? 'water-touch' : e.kind === 'bowl' ? 'bowl-touch' : undefined)
        : e.kind === 'snow' ? 'snow-touch' : undefined;
      break;
    }
    case 'amb:waterfall_valley':
    case 'amb:cave_meditation':
      if (e.world !== (id === 'amb:waterfall_valley' ? 'waterfall' : 'cave')) return null;
      kind = e.kind === 'pool-ripple' ? 'water-touch' : undefined;
      // pan is not screen X. Keep the existing center anchor until the owner
      // exports a projected position; never reinterpret world coordinates.
      break;
    case 'amb:night_pond':
    case 'nature:summer_valley':
      if (e.world !== (id === 'amb:night_pond' ? 'night-pond' : 'summer-valley')) return null;
      kind = e.kind === 'ripple' ? 'water-touch' : undefined;
      break;
    case 'amb:rainy_forest':
    case 'amb:deep_forest':
    case 'nature:bamboo_grove': {
      const world = id === 'amb:rainy_forest' ? 'rainy' : id === 'amb:deep_forest' ? 'ancient' : 'bamboo';
      if (e.sceneId !== id || e.world !== world) return null;
      kind = e.kind === 'leaf-drip' && id === 'amb:rainy_forest' ? 'water-touch'
        : (e.kind === 'leaf-rustle' && id === 'amb:deep_forest') || (e.kind === 'bamboo-leaf' && id === 'nature:bamboo_grove') ? 'leaf-touch' : undefined;
      break;
    }
    case 'nature:temple_dawn':
      if (e.scene !== id) return null;
      kind = e.type === 'bell' ? 'bowl-touch' : undefined;
      break;
    case 'nature:rural_summer_night':
      if (e.scene !== id) return null;
      kind = e.type === 'grass' ? 'leaf-touch' : undefined;
      break;
    case 'nature:tent_rain':
    case 'nature:window_rain':
    case 'nature:monsoon_eaves': {
      const expected = id === 'nature:tent_rain' ? ['tent', 'opening', 'fabric-touch']
        : id === 'nature:window_rain' ? ['window', 'glass-trace', 'water-touch']
        : ['porch', 'basin-ripple', 'water-touch'];
      if (e.world !== expected[0] || e.action !== expected[1] || typeof e.value !== 'number' || !Number.isFinite(e.value) || e.value < 0 || e.value > 1) return null;
      kind = expected[2];
      // value is a visual state/opening, never loudness. The profile supplies
      // the quiet cue's gain; even closing a flap is one semantic gesture.
      strength = 1;
      break;
    }
    case 'amb:campfire_night':
    case 'nature:campfire':
      if (e.world !== (id === 'amb:campfire_night' ? 'mountain' : 'lakeside')) return null;
      kind = e.kind === 'log-embers' ? 'ember-touch' : undefined;
      strength = e.value;
      break;
    case 'relax':
    case 'nature:winter_lodge':
      if (e.world !== id) return null;
      kind = e.type === (id === 'relax' ? 'ember' : 'log') ? 'ember-touch' : undefined;
      strength = e.intensity;
      break;
    // New owner callback kinds are admitted explicitly after their final tree.
    // tea-ripple, pebble-roll, warmth and lantern changes are not relabelled.
    default: return null;
  }
  return kind && unit(strength) ? { phase: 'tap', kind, screenX, intensity: strength } : null;
}

export function worldAccentRequest(id: string, raw: unknown, layers: readonly SoundLayer[], playback: SoundPlaybackSnapshot) {
  const event = reviewedWorldTouch(id, raw);
  return event ? normalizeWorldTouch(id, event, layers.filter(layer => playback[layer.type] === 'playing')) : null;
}
