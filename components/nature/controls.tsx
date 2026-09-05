import { NATURE_SCENES, type NatureSceneId } from '../../sceneCatalog';
import React from 'react';
import { Play, Pause, Timer, Volume2, VolumeX, X, Plus, RotateCcw } from 'lucide-react';
import { BackgroundSoundType, NatureMix, NATURE_MIXES } from '../../types';
import type { SoundLayer, SoundPlaybackSnapshot } from '../../services/audioEngine';
import { MAX_LAYER_VOLUME } from '../../audioLevels';
import { getSoundIcon, getSoundLabel, getSoundOrigin } from '../../audioOptions';
import { VolumeSlider } from '../VolumeSlider';

export const TransportControls: React.FC<{
  isPlaying: boolean; canPlay: boolean; timerMin: number | null; volume: number;
  onPlay: () => void; onStop: () => void;
  onTimerChange: (min: number | null) => void; onVolumeChange: (vol: number) => void;
}> = ({ isPlaying, canPlay, timerMin, volume, onPlay, onStop, onTimerChange, onVolumeChange }) => (
  <div className="sound-transport">
    <div className="sound-transport-actions">
      <button type="button" className="sound-play" onClick={isPlaying ? onStop : onPlay} disabled={!canPlay}>
        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
        {isPlaying ? '정지' : '재생'}
      </button>
      <label className="sound-timer"><Timer size={18} /><span className="sr-only">취침 타이머</span>
        <select aria-label="취침 타이머" value={timerMin ?? 'endless'} onChange={(e) => onTimerChange(e.target.value === 'endless' ? null : Number(e.target.value))}>
          <option value="endless">시간 제한 없음</option>
          {[15, 30, 60, 90].map((min) => <option key={min} value={min}>{min}분</option>)}
        </select>
      </label>
    </div>
    <VolumeSlider label="전체 음량" value={volume} onChange={onVolumeChange} />
  </div>
);

export const ActiveSoundList: React.FC<{
  layers: SoundLayer[]; selectedType: BackgroundSoundType | null;
  isPlaying?: boolean; playbackStates?: SoundPlaybackSnapshot;
  onRetrySound?: (type: BackgroundSoundType) => void;
  onSelectType: (type: BackgroundSoundType | null) => void;
  onLayerVolume: (type: BackgroundSoundType, vol: number) => void;
  onToggleMute: (type: BackgroundSoundType) => void;
  onRemove: (type: BackgroundSoundType) => void;
}> = ({ layers, selectedType, isPlaying = false, playbackStates = {}, onRetrySound, onSelectType, onLayerVolume, onToggleMute, onRemove }) => {
  if (!layers.length) return <p className="sound-empty">아래 소리 목록에서 첫 번째 소리를 골라보세요.</p>;
  return <ul className="sound-active-list">
    {layers.map((layer) => {
      const name = getSoundLabel(layer.type);
      const selected = selectedType === layer.type;
      const state = playbackStates[layer.type];
      const status = !isPlaying ? '재생 대기' : state === 'error' ? '불러오기 실패' : layer.muted || layer.volume === 0 ? '음소거' : state === 'playing' ? '재생 중' : '준비 중';
      return <li key={layer.type} className={`sound-active-row ${selected ? 'is-selected' : ''}`}>
        <div className="sound-active-heading">
          <button type="button" className="sound-select" onClick={() => onSelectType(selected ? null : layer.type)} aria-pressed={selected} aria-label={`${name} 선택`}>
            <span className="sound-symbol">{getSoundIcon(layer.type)}</span><strong>{name}</strong>
            <small className="sound-origin" data-origin={getSoundOrigin(layer.type)}>{getSoundOrigin(layer.type)}</small>
          </button>
          <button type="button" className="sound-icon-button" aria-pressed={!!layer.muted} aria-label={`${name} ${layer.muted ? '음소거 해제' : '음소거'}`} onClick={() => onToggleMute(layer.type)}>{layer.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
          <button type="button" className="sound-icon-button" aria-label={`${name} 제거`} onClick={() => onRemove(layer.type)}><X size={18} /></button>
        </div>
        <VolumeSlider label="" ariaLabel={`${name} 볼륨`} value={layer.volume} max={MAX_LAYER_VOLUME} onChange={(value) => onLayerVolume(layer.type, value)} />
        <div className="sound-state-row">
          <span className="sound-state" data-state={isPlaying ? state : 'idle'} role="status">{status}</span>
          {isPlaying && state === 'error' && onRetrySound && <button type="button" className="sound-retry" onClick={() => onRetrySound(layer.type)} aria-label={`${name} 다시 불러오기`}><RotateCcw size={14} /> 다시 불러오기</button>}
        </div>
      </li>;
    })}
  </ul>;
};

export const RecommendChips: React.FC<{ recommendations: BackgroundSoundType[]; onAdd: (type: BackgroundSoundType) => void }> = ({ recommendations, onAdd }) => (
  <div className="sound-recommendations">{recommendations.map((type) => <button key={type} type="button" onClick={() => onAdd(type)}><Plus size={14} />{getSoundLabel(type)}</button>)}</div>
);

export const MixRail: React.FC<{ activeMixId: string | null; onSelectMix: (mix: NatureMix) => void }> = ({ activeMixId, onSelectMix }) => (
  <div className="sound-mix-grid">{NATURE_MIXES.map((mix) => <button type="button" key={mix.id} onClick={() => onSelectMix(mix)} aria-pressed={activeMixId === mix.id}>
    {NATURE_SCENES[mix.id as NatureSceneId]?.image
      ? <img src={`${import.meta.env.BASE_URL}${NATURE_SCENES[mix.id as NatureSceneId].image}`} alt="" width="320" height="160" loading="lazy" />
      : <div className="sound-mix-symbol" aria-hidden="true">{getSoundIcon(mix.layers[0].type)}</div>}
    <span><strong>{mix.name}</strong><small>{mix.layers.length}개 소리</small></span>
  </button>)}</div>
);
