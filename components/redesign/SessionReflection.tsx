import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

interface Props {
  moodBefore: number | null;
  durationMinutes: number;
  onSave: (mood: number, note: string) => void;
  onSkip: () => void;
}

const MOODS = [
  { score: 1, emoji: '😣', label: '힘들어요' },
  { score: 2, emoji: '😕', label: '조금 무거워요' },
  { score: 3, emoji: '😌', label: '평온해요' },
  { score: 4, emoji: '🙂', label: '한결 좋아요' },
  { score: 5, emoji: '✨', label: '아주 좋아요' },
];

export const SessionReflection: React.FC<Props> = ({ moodBefore, durationMinutes, onSave, onSkip }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [note, setNote] = useState('');

  return (
    <div className="reflection-page page-enter">
      <section className="reflection-card">
        <span className="reflection-complete"><Check size={21} /></span>
        <p className="eyebrow">Session complete · {durationMinutes} min</p>
        <h2>방금의 리듬은<br />어떻게 느껴졌나요?</h2>
        <p>짧게 남긴 기록은 리포트에서 내 리듬의 변화를 돌아보는 데 쓰입니다.</p>

        <div className="mood-grid" role="group" aria-label="세션 후 컨디션">
          {MOODS.map((mood) => (
            <button key={mood.score} type="button" onClick={() => setSelected(mood.score)} className={selected === mood.score ? 'is-active' : ''} aria-pressed={selected === mood.score}>
              <span>{mood.emoji}</span><strong>{mood.score}</strong><small>{mood.label}</small>
            </button>
          ))}
        </div>

        {moodBefore != null && selected != null && (
          <div className="mood-delta"><Sparkles size={15} /> 시작 {moodBefore} → 지금 {selected} · {selected > moodBefore ? '조금 더 가벼워졌네요.' : selected === moodBefore ? '같은 컨디션을 유지했어요.' : '오늘은 충분히 쉬어가도 괜찮아요.'}</div>
        )}

        <label className="reflection-note">
          <span>한 줄 기록 <small>선택</small></span>
          <textarea value={note} maxLength={120} onChange={(event) => setNote(event.target.value)} placeholder="집중을 방해한 것, 잘된 점, 다음에 바꾸고 싶은 점" />
          <small>{note.length}/120</small>
        </label>

        <div className="reflection-actions">
          <button type="button" className="primary-button" disabled={selected == null} onClick={() => selected != null && onSave(selected, note.trim())}>기록 저장 <ArrowRight size={17} /></button>
          <button type="button" className="text-button" onClick={onSkip}>컨디션 없이 세션만 기록</button>
        </div>
      </section>
    </div>
  );
};
