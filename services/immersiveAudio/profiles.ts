import { NATURE_SAMPLE_BINDINGS, type NatureSampleId } from '../../audioSamples';
import { SPATIAL, type SceneDepth } from '../../sceneLayout';
import type { BackgroundSoundType } from '../../types';
import type { AccentKind } from './types';

/** Canonical visual identity, never inferred from a user's selected sounds. */
export const IMMERSIVE_SCENE_IDS = Object.freeze([
  'relax', 'country_morning', 'sleep_prep', 'power_nap', 'meditation',
  'amb:morning_forest', 'amb:rainy_forest', 'amb:night_pond',
  'amb:waterfall_valley', 'amb:campfire_night', 'amb:deep_night',
  'amb:snowy_night', 'amb:summer_storm', 'amb:cosmic', 'amb:focus_cafe',
  'amb:deep_forest', 'amb:cave_meditation', 'nature:rural_summer_night',
  'nature:tent_rain', 'nature:window_rain', 'nature:monsoon_eaves',
  'nature:deep_sea', 'nature:pebble_shore', 'nature:bamboo_grove',
  'nature:temple_dawn', 'nature:summer_valley', 'nature:scops_night',
  'nature:campfire', 'nature:womb', 'nature:winter_lodge',
] as const);

export type ImmersiveSceneId = typeof IMMERSIVE_SCENE_IDS[number];

export interface ImmersiveMixLayer {
  readonly type: BackgroundSoundType;
  /** Existing UI fader level, not a hidden gain or perceived loudness measure. */
  readonly volume: number;
  readonly muted?: boolean;
}

export interface ImmersiveInteractionRecommendation {
  /** Required audible UI source. Missing, removed or muted layers suppress this cue. */
  readonly source: BackgroundSoundType;
  readonly accent: AccentKind;
  readonly intensity: number;
  /** Stereo pan, -1..1. This is NOT the normalized screen X used by the engine. */
  readonly pan: number;
}

export interface ImmersiveSpatialGuidance {
  readonly type: BackgroundSoundType;
  readonly role: string;
  /** Normalized screen X, 0..1; use only this coordinate with setScenePositions. */
  readonly x: number;
  readonly intendedDepth: SceneDepth;
  /** Existing engine depth is fixed by sound type; profiles do not change it. */
  readonly engineDepth: SceneDepth;
  readonly engineWide: boolean;
  /** Current setScenePositions law; discrete calls can also have internal pan. */
  readonly engineLayerPan: number;
}

export interface ImmersiveSourceCapability {
  readonly type: BackgroundSoundType;
  readonly mode: 'sample-only' | 'hybrid' | 'procedural';
  readonly assetIds: readonly NatureSampleId[];
  readonly proceduralFallback: boolean;
}

export interface ImmersiveAudioProfile {
  readonly id: ImmersiveSceneId;
  readonly intent: string;
  readonly initialLayers: readonly ImmersiveMixLayer[];
  readonly positions: Readonly<Partial<Record<BackgroundSoundType, number>>>;
  readonly spatialGuidance: readonly ImmersiveSpatialGuidance[];
  readonly sources: readonly ImmersiveSourceCapability[];
  /** Optional semantic gestures; no click-anywhere or synthetic event timer. */
  readonly interactions: Readonly<Record<string, ImmersiveInteractionRecommendation>>;
  readonly limitations: readonly string[];
}

type AudibleSound = Exclude<BackgroundSoundType, 'none'>;
type LayerSpec = readonly [AudibleSound, number, number, SceneDepth, string];
type GestureMap = Readonly<Record<string, ImmersiveInteractionRecommendation>>;

const touch = (source: BackgroundSoundType, accent: AccentKind, intensity: number, pan = 0): ImmersiveInteractionRecommendation =>
  Object.freeze({ source, accent, intensity, pan });

const COMMON_LIMITATIONS = [
  'Fader values are conservative starting recommendations, not measured ambience loudness or a device safety guarantee.',
  'Interaction sources must be present, unmuted and above zero in UI state. Optional cues whose source is absent from defaults remain silent until that source is explicitly enabled.',
  'Only X positions are actionable with the existing engine. Intended distance, indoor filtering and event spacing are guidance; source depth and internal call pan remain engine-owned.',
] as const;

function scene(
  id: ImmersiveSceneId,
  intent: string,
  layers: readonly LayerSpec[],
  interactions: GestureMap,
  limitations: readonly string[] = [],
): ImmersiveAudioProfile {
  const positions: Partial<Record<BackgroundSoundType, number>> = {};
  const spatialGuidance = layers.map(([type, , anchor, intendedDepth, role]) => {
    const spec = SPATIAL[type];
    const engineWide = spec?.wide === true;
    // Wide beds remain centered under the current engine; never imply moving
    // an insect chorus or weather bed by exporting a misleading X value.
    const x = engineWide ? 0.5 : anchor;
    positions[type] = x;
    return Object.freeze({
      type, role, x, intendedDepth, engineDepth: spec?.depth ?? 'mid', engineWide,
      engineLayerPan: engineWide ? 0 : Math.max(-0.6, Math.min(0.6, (x - 0.5) * 1.3)),
    });
  });
  const sources = layers.map(([type]): ImmersiveSourceCapability => {
    const binding = NATURE_SAMPLE_BINDINGS[type];
    const hasSamples = Boolean(binding?.assetIds.length);
    const sampleOnly = hasSamples && binding!.proceduralMix === 0;
    return Object.freeze({
      type,
      mode: sampleOnly ? 'sample-only' : hasSamples ? 'hybrid' : 'procedural',
      assetIds: Object.freeze([...(binding?.assetIds ?? [])]),
      proceduralFallback: !sampleOnly,
    });
  });
  return Object.freeze({
    id, intent,
    initialLayers: Object.freeze(layers.map(([type, volume]) => Object.freeze({ type, volume }))),
    positions: Object.freeze(positions),
    spatialGuidance: Object.freeze(spatialGuidance),
    sources: Object.freeze(sources),
    interactions: Object.freeze(Object.fromEntries(
      Object.entries(interactions).map(([kind, recommendation]) => [kind, Object.freeze({ ...recommendation })]),
    )),
    limitations: Object.freeze([...COMMON_LIMITATIONS, ...limitations]),
  });
}

const PROFILES: Readonly<Record<ImmersiveSceneId, ImmersiveAudioProfile>> = Object.freeze({
  relax: scene('relax', 'Indoor stone fireplace: close embers, quiet warm room.', [
    ['fire', 0.38, 0.55, 'near', 'Hearth in front of the seat'],
    ['brown', 0.08, 0.5, 'far', 'Low unobtrusive room bed'],
  ], { 'ember-touch': touch('fire', 'ember-tick', 0.2, 0.07) }, [
    'Existing fire combines licensed hearth recording with procedural crackle; this profile lowers its fader but does not remove individual existing crackles.',
  ]),
  country_morning: scene('country_morning', 'Rural porch garden with foliage and birds beyond the railing.', [
    ['forest', 0.31, 0.5, 'mid', 'Garden foliage breeze'],
    ['birds', 0.25, 0.3, 'far', 'Birds beyond the left garden edge'],
  ], { 'leaf-touch': touch('forest', 'soft-rustle', 0.22, 0.22) }, [
    'A single birds layer cannot place individual birds at different distances; the existing field recording and generator retain their internal spatial detail.',
  ]),
  sleep_prep: scene('sleep_prep', 'Moonlit bedroom with subdued outdoor insects and a soft indoor bed.', [
    ['night', 0.12, 0.5, 'far', 'Insects beyond the closed window'],
    ['brown', 0.15, 0.5, 'mid', 'Steady low room bed'],
  ], {}, ['No touch accents. Distant-window lowpass is a future core capability; lowering the insects fader does not implement that filter.']),
  power_nap: scene('power_nap', 'Shaded terrace with light breeze and birds held far back.', [
    ['forest', 0.24, 0.5, 'mid', 'Breeze around the shade cloth'],
    ['birds', 0.09, 0.72, 'far', 'Low-level birds beyond the terrace'],
  ], {}, ['No touch accents or pulses. A dedicated cloth recording is not present; the initial bed uses existing forest breeze.']),
  meditation: scene('meditation', 'Open stone and wood courtyard; a small water basin and deliberate silence.', [
    ['stream', 0.13, 0.68, 'near', 'Small courtyard water basin'],
    ['forest', 0.1, 0.5, 'far', 'Trees outside the courtyard'],
  ], {
    'water-touch': touch('stream', 'water-drop', 0.19, 0.23),
    'bowl-touch': touch('bowl', 'soft-resonance', 0.15, -0.17),
  }, ['Continuous bowl/chime layers are omitted; resonance is only an optional explicit bowl touch.']),
  'amb:morning_forest': scene('amb:morning_forest', 'Dew forest rest spot with nearby stream and birds in the canopy.', [
    ['forest', 0.29, 0.5, 'mid', 'Surrounding canopy'],
    ['stream', 0.23, 0.28, 'near', 'Brook near the left resting stone'],
    ['birds', 0.28, 0.74, 'far', 'Birds in the right canopy'],
  ], { 'leaf-touch': touch('forest', 'soft-rustle', 0.2, -0.21), 'water-touch': touch('stream', 'water-drop', 0.17, -0.29) }),
  'amb:rainy_forest': scene('amb:rainy_forest', 'Shelter among wet ferns with a broad rain bed and nearby runoff.', [
    ['rain', 0.42, 0.5, 'mid', 'Existing user-recorded rain around the shelter'],
    ['forest', 0.13, 0.5, 'far', 'Distant trees under rain'],
    ['stream', 0.12, 0.66, 'near', 'Soft runoff beyond the ferns'],
  ], { 'leaf-touch': touch('forest', 'soft-rustle', 0.18, -0.2), 'water-touch': touch('stream', 'water-drop', 0.17, 0.21) }, [
    'Rain on leaves, soil and puddles are not separate recordings. Original touch cues provide isolated detail; no thunder layer is enabled.',
  ]),
  'amb:night_pond': scene('amb:night_pond', 'Water-level lily pond, surrounding insects and a subdued distant owl.', [
    ['ruralCrickets', 0.33, 0.5, 'mid', 'Existing rural insect recording around the reeds'],
    ['stream', 0.1, 0.35, 'near', 'Low water detail near the bank'],
    ['owl', 0.08, 0.79, 'far', 'Owl beyond the right bank'],
  ], { 'water-touch': touch('stream', 'water-drop', 0.18, -0.2), 'leaf-touch': touch('forest', 'soft-rustle', 0.14, 0.19) }, [
    'The stream is a low-level proxy for pond detail, not a recorded still pond. Existing owl timing and internal pan remain unchanged.',
  ]),
  'amb:waterfall_valley': scene('amb:waterfall_valley', 'Rocky ledge beside a tall fall, with softer close water.', [
    ['waterfall', 0.37, 0.39, 'far', 'Broad fall beyond the ledge'],
    ['stream', 0.21, 0.7, 'near', 'Shallow water by the right-hand rock'],
    ['birds', 0.08, 0.8, 'far', 'Occasional distant canopy life'],
  ], { 'water-touch': touch('stream', 'water-drop', 0.2, 0.26) }, ['The waterfall retains the existing mid-depth treatment despite the intended distant fall.']),
  'amb:campfire_night': scene('amb:campfire_night', 'Mountain clearing fire, sparse night life and tree wind.', [
    ['fire', 0.34, 0.46, 'near', 'Campfire in front of the seat'],
    ['night', 0.15, 0.5, 'far', 'Quiet insect bed'],
    ['forest', 0.1, 0.5, 'far', 'Trees around the clearing'],
    ['owl', 0.07, 0.77, 'far', 'Distant owl beyond the clearing'],
  ], { 'ember-touch': touch('fire', 'ember-tick', 0.18, -0.05) }),
  'amb:deep_night': scene('amb:deep_night', 'Hilltop bench, wide air and infrequent low night birds.', [
    ['forest', 0.17, 0.5, 'far', 'Open hilltop air using the existing forest bed'],
    ['night', 0.1, 0.5, 'far', 'Insects below the hill'],
    ['owl', 0.06, 0.26, 'far', 'Low nightbird beyond the slope'],
    ['brown', 0.11, 0.5, 'far', 'Unpulsed low bed'],
  ], {}, ['No touch accents. Infrequent calls are an intention; this module cannot adjust the existing owl scheduler.']),
  'amb:snowy_night': scene('amb:snowy_night', 'Quiet village eave with softened winter air.', [
    ['blizzard', 0.16, 0.5, 'far', 'Winter wind held behind the eave'],
    ['brown', 0.12, 0.5, 'mid', 'Soft unpulsed shelter bed'],
  ], { 'snow-touch': touch('blizzard', 'soft-rustle', 0.12, -0.12) }, [
    'Existing winter wind includes a howling-wind recording; the low fader is a conservative fallback, not a newly recorded quiet snowfall.',
  ]),
  'amb:summer_storm': scene('amb:summer_storm', 'Roof shelter over a wide field, rain and localized runoff.', [
    ['rain', 0.43, 0.5, 'far', 'Broad rain across the field'],
    ['eaves', 0.23, 0.25, 'near', 'Runoff from the left roof edge'],
    ['forest', 0.1, 0.5, 'far', 'Distant trees in the rain'],
  ], { 'water-touch': touch('eaves', 'water-drop', 0.17, -0.32) }, [
    'No thunder/dthunder default: both current engines can emit cracks and use existing thunder event recordings. A separately approved crack-free rolling source remains a core proposal.',
  ]),
  'amb:cosmic': scene('amb:cosmic', 'Floating natural garden, expansive low bed and touch-only soft resonance.', [
    ['drone', 0.16, 0.5, 'far', 'Low expansive tonal bed'],
    ['forest', 0.08, 0.5, 'far', 'Garden foliage air'],
    ['brown', 0.08, 0.5, 'far', 'Soft continuous low air'],
  ], { 'bowl-touch': touch('bowl', 'soft-resonance', 0.13, 0), 'leaf-touch': touch('forest', 'soft-rustle', 0.12, 0.18) }, [
    'No repeating chime or bowl layer; clear tones require a mapped intentional object touch.',
  ]),
  'amb:focus_cafe': scene('amb:focus_cafe', 'Rainy evening window seat, muted ceramic touch and unobtrusive room tone.', [
    ['window', 0.32, 0.24, 'near', 'Rain at the left window'],
    ['pink', 0.09, 0.5, 'mid', 'Low neutral room-tone proxy'],
  ], { 'cup-touch': touch('window', 'ceramic-touch', 0.18, 0.08) }, [
    'There is no cafe recording, distant movement source or dialogue in this module. Pink noise is a room-tone proxy, not synthetic speech presented as real cafe ambience.',
  ]),
  'amb:deep_forest': scene('amb:deep_forest', 'Mossy old growth with stream, far cuckoo and restrained woodpecker.', [
    ['forest', 0.29, 0.5, 'mid', 'Old-growth canopy'],
    ['stream', 0.17, 0.4, 'near', 'Stream below the mossy bank'],
    ['cuckoo', 0.13, 0.19, 'far', 'Cuckoo beyond the left trunks'],
    ['woodpecker', 0.08, 0.82, 'far', 'Subdued woodpecker beyond the right trunks'],
  ], { 'leaf-touch': touch('forest', 'soft-rustle', 0.18, -0.14), 'water-touch': touch('stream', 'water-drop', 0.14, -0.13) }),
  'amb:cave_meditation': scene('amb:cave_meditation', 'Broad cavern pool with existing echo drips and sparse touched water.', [
    ['cave', 0.19, 0.5, 'far', 'Existing procedural cave room and drips'],
    ['brown', 0.1, 0.5, 'far', 'Steady low cavern bed'],
  ], { 'water-touch': touch('cave', 'water-drop', 0.15, 0.16) }, [
    'Existing cave drips have their own pan and fixed echoes. This module does not claim physically varied cavern reflections or add automatic resonance events.',
  ]),
  'nature:rural_summer_night': scene('nature:rural_summer_night', 'The existing rural field recording remains the identity of the summer night.', [
    ['ruralCrickets', 0.5, 0.5, 'mid', 'Jun’s existing recorded rural insects'],
    ['forest', 0.06, 0.5, 'far', 'Faint trees around the fields'],
  ], { 'leaf-touch': touch('forest', 'soft-rustle', 0.12, -0.17) }, [
    'The user recording stays sample-only and uses its existing loop crossfade. Near/far insects cannot be split from the single mono recording, and a failed sample stays silent.',
  ]),
  'nature:tent_rain': scene('nature:tent_rain', 'Inside a tent, close rain texture with a quieter outside runoff edge.', [
    ['tent', 0.44, 0.65, 'near', 'Existing tent rain binding'],
    ['eaves', 0.1, 0.27, 'far', 'Low runoff proxy beyond the entrance'],
  ], { 'fabric-touch': touch('tent', 'soft-rustle', 0.17, 0.19) }, [
    'Tent and window rain currently share the same sample-only rainJun recording. Distinct fabric rain and entrance-dependent filtering require future core work; no extra rain duplicate or thunder is enabled.',
  ]),
  'nature:window_rain': scene('nature:window_rain', 'Traditional wood window with close rain and garden runoff.', [
    ['window', 0.37, 0.3, 'near', 'Existing rain at the window'],
    ['eaves', 0.17, 0.77, 'near', 'Roof-edge drips to the right'],
    ['forest', 0.07, 0.5, 'far', 'Hydrangea garden beyond the pane'],
  ], { 'leaf-touch': touch('forest', 'soft-rustle', 0.12, 0.2), 'water-touch': touch('window', 'water-drop', 0.13, -0.25) }, [
    'The window binding is the existing sample-only rainJun recording; a separate glass-impact recording and garden filter are not implemented.',
  ]),
  'nature:monsoon_eaves': scene('nature:monsoon_eaves', 'Open porch roof runoff and a stone basin under rain.', [
    ['eaves', 0.34, 0.3, 'near', 'Drips from the porch roof'],
    ['rain', 0.25, 0.5, 'far', 'Rain beyond the porch'],
    ['stream', 0.08, 0.68, 'near', 'Low stone-basin water proxy'],
  ], { 'water-touch': touch('eaves', 'water-drop', 0.2, 0.23) }, ['No dedicated stone-impact recording is added; the existing eaves generator and quiet water touch supply the detail.']),
  'nature:deep_sea': scene('nature:deep_sea', 'Provisional quiet low water-space bed without whale calls or sonar.', [
    ['brown', 0.23, 0.5, 'far', 'Soft low noise as a provisional water-mass bed'],
    ['drone', 0.09, 0.5, 'far', 'Subdued slow tonal depth'],
  ], {}, [
    'The existing deepsea layer emits whale calls immediately and repeatedly, so it is intentionally omitted. Brown/drone is a provisional abstract bed; a dedicated water-only layer remains a core proposal.',
  ]),
  'nature:pebble_shore': scene('nature:pebble_shore', 'Pebble rattle is foreground; soft surf remains behind it.', [
    ['pebbles', 0.38, 0.5, 'near', 'Existing pebble roll and shore hybrid'],
    ['wave', 0.13, 0.5, 'far', 'Quiet wide surf behind the stones'],
  ], { 'water-touch': touch('pebbles', 'water-drop', 0.14, -0.15) }, [
    'Pebbles already contains a surf bed and ocean recording; the additional wave fader is deliberately low. A dedicated recorded pebble-only source is not supplied.',
  ]),
  'nature:bamboo_grove': scene('nature:bamboo_grove', 'Bamboo tube detail and leaf friction beside a small stream.', [
    ['bamboo', 0.27, 0.72, 'near', 'Bamboo beside the path'],
    ['stream', 0.17, 0.27, 'near', 'Stream at the left path edge'],
    ['birds', 0.1, 0.36, 'far', 'Birds beyond the grove'],
  ], { 'leaf-touch': touch('bamboo', 'soft-rustle', 0.2, 0.29) }, [
    'The existing bamboo hybrid uses licensed mountain wind plus procedural knocks; this module does not claim a new bamboo field recording.',
  ]),
  'nature:temple_dawn': scene('nature:temple_dawn', 'Temple courtyard at dawn, trees and birds with a gentle optional resonance.', [
    ['forest', 0.23, 0.5, 'mid', 'Trees around the temple'],
    ['birds', 0.15, 0.72, 'far', 'Dawn birds beyond the courtyard'],
  ], { 'bowl-touch': touch('bowl', 'soft-resonance', 0.14, -0.21) }, [
    'Existing temple audio combines automatic bell strikes and sharp moktak taps; no separate bell-only control exists. The layer is omitted. The optional soft resonance is original synthesis, not a natural temple bell recording.',
  ]),
  'nature:summer_valley': scene('nature:summer_valley', 'Clear shallow stream over stones, quiet falls and far cicadas.', [
    ['stream', 0.39, 0.38, 'near', 'Shallow stream around the front stones'],
    ['waterfall', 0.09, 0.77, 'far', 'Water beyond the bend'],
    ['cicadas', 0.13, 0.5, 'far', 'Summer chorus in the upper trees'],
  ], { 'water-touch': touch('stream', 'water-drop', 0.2, -0.16) }, ['Cicadas are the existing procedural chorus, without an unrelated cricket recording underneath.']),
  'nature:scops_night': scene('nature:scops_night', 'Fixed distant owl perches, sparse night texture and low water.', [
    ['scops', 0.22, 0.68, 'far', 'Existing scops generator beyond the right garden'],
    ['night', 0.11, 0.5, 'far', 'Subdued night insects'],
    ['stream', 0.07, 0.25, 'far', 'Water beyond the left bank'],
  ], {}, ['Scops already has fixed internal perches and irregular calling. This profile changes the layer anchor and level only, not per-call timing or the internal answer perch.']),
  'nature:campfire': scene('nature:campfire', 'Lakeside campsite: foreground fire, soft water, insects and touched tent cloth.', [
    ['fire', 0.33, 0.32, 'near', 'Fire to the left of the seat'],
    ['wave', 0.07, 0.5, 'far', 'Very low lake-water proxy beyond the camp'],
    ['night', 0.16, 0.5, 'mid', 'Insects surrounding the campsite'],
  ], { 'ember-touch': touch('fire', 'ember-tick', 0.17, -0.23), 'fabric-touch': touch('tent', 'soft-rustle', 0.15, 0.26) }, [
    'The wave layer is ocean surf at a low fader, not a dedicated lake recording. Cloth is touch-only original synthesis; no independent player is added.',
  ]),
  'nature:womb': scene('nature:womb', 'Very soft centered heartbeat under a continuous warm brown-noise bed.', [
    ['heartbeat', 0.08, 0.5, 'near', 'Existing low-level centered heartbeat'],
    ['brown', 0.24, 0.5, 'mid', 'Steady low noise surrounding the pulse'],
  ], {}, [
    'No touch accents. Existing heartbeat contains short contact transients and independently scheduled breath modulation; this module lowers the pulse fader but does not soften its envelope or synchronize it with brown noise.',
  ]),
  'nature:winter_lodge': scene('nature:winter_lodge', 'Warm lodge hearth inside, restrained winter air beyond the walls.', [
    ['fire', 0.35, 0.38, 'near', 'Lodge hearth to the left'],
    ['blizzard', 0.1, 0.5, 'far', 'Low-level winter air outside'],
    ['brown', 0.07, 0.5, 'mid', 'Quiet indoor room bed'],
  ], { 'ember-touch': touch('fire', 'ember-tick', 0.16, -0.16) }, [
    'Indoor/outdoor separation uses level and anchor recommendations. Wall occlusion, separate outdoor lowpass and a new room impulse response are not implemented.',
  ]),
});

/** Unknown, protected, malformed and alias IDs return no profile. */
export function resolveImmersiveAudioProfile(id: unknown): ImmersiveAudioProfile | null {
  if (typeof id !== 'string' || !Object.prototype.hasOwnProperty.call(PROFILES, id)) return null;
  return PROFILES[id as ImmersiveSceneId];
}

export interface InitialImmersivePresetMixInput {
  readonly sceneId: unknown;
  /** Exact explicit origin is required at this state boundary. */
  readonly origin: unknown;
  /** Only literal false permits initialization; missing/ambiguous values fail closed. */
  readonly dirty: unknown;
  readonly currentLayers: readonly ImmersiveMixLayer[];
}

/**
 * Pure state initialization, called once by the explicit NEW preset action.
 * Do not call from scene-mount, route, playback, or slider effects. Core must
 * mark volume, mute and layer edits dirty and classify restored/custom state.
 * Returns the same currentLayers object on every non-initializing path. The
 * helper never touches master/binaural/bg levels, transport, engines or UI.
 */
export function initialImmersivePresetMix(input: InitialImmersivePresetMixInput): readonly ImmersiveMixLayer[] {
  if (input.origin !== 'new-preset' || input.dirty !== false) return input.currentLayers;
  const profile = resolveImmersiveAudioProfile(input.sceneId);
  return profile ? profile.initialLayers.map(layer => ({ ...layer })) : input.currentLayers;
}
