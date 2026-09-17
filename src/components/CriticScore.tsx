import React from 'react';

interface Props {
  score: number | null;
}

export const CriticScore: React.FC<Props> = ({ score }) => {
  if (score === null || score === undefined) return null;

  const getColor = (s: number) => {
    if (s >= 75) return 'text-emerald-400 bg-emerald-950/40';
    if (s >= 60) return 'text-amber-400 bg-amber-950/40';
    return 'text-rose-400 bg-rose-950/40';
  };

  return (
    <span
      className={`text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded ${getColor(score)}`}
      title={`Metacritic: ${score}`}
    >
      {score}
    </span>
  );
};
