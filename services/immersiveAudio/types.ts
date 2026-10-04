/** Original one-shot cues; no ambience/player ownership is transferred here. */
export const ACCENT_KINDS = Object.freeze([
  'water-drop', 'soft-rustle', 'ceramic-touch', 'ember-tick', 'soft-resonance',
] as const);
export type AccentKind = typeof ACCENT_KINDS[number];

export interface AccentRequest {
  kind: AccentKind;
  /** Unit interval. Zero means silence; non-finite values are rejected. */
  intensity: number;
  /** Normalized stereo pan, never world coordinates. Clamped to +/-0.6. */
  pan: number;
}

/** The core owns these flags. Each update is a complete snapshot, not a patch. */
export interface AccentPlaybackState {
  active: boolean;
  muted: boolean;
  gateOpen: boolean;
}

export interface SceneAccentDependencies {
  /** Existing engine context only. No construction, resume, suspend, or close. */
  context: BaseAudioContext;
  /** Existing nature bus input, upstream of bg/master/fade/limiter controls. */
  output: AudioNode;
}

export interface SceneAccentController {
  trigger(request: AccentRequest): boolean;
  setState(state: AccentPlaybackState): void;
  /** Releases voices and makes the controller inactive until an explicit state update. */
  pause(): void;
  /** Releases current voices without changing playback state or resetting rate limits. */
  release(): void;
  /** Immediate final disconnect. Idempotent; never closes the injected context. */
  dispose(): void;
  readonly voiceCount: number;
}
