export const HOME_PRESET_IDS = [
  'focus',
  'relax',
  'country_morning',
  'sleep_prep',
  'power_nap',
  'meditation',
] as const;

export const HOME_NATURE_MIX_IDS = [
  'window_rain',
  'summer_valley',
  'campfire',
  'scops_night',
] as const;

export const HOME_NATURE_VISUALS: Record<(typeof HOME_NATURE_MIX_IDS)[number], string> = {
  window_rain: 'from-[#526b83] via-[#3f586f] to-[#31475d]',
  summer_valley: 'from-[#5f9b84] via-[#43866f] to-[#236553]',
  campfire: 'from-[#8b6a58] via-[#665044] to-[#3e322c]',
  scops_night: 'from-[#7778a6] via-[#565a87] to-[#34395f]',
};

export const displayPresetName = (name: string) => name.replace(/\s*\([^)]*\)/, '');
