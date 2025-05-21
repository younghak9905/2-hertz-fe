'use client';

import { useState } from 'react';
import clsx from 'clsx';

const reactions = ['👍🏻', '🤣', '👀', '💗', '🎉'];

export default function ReactionGroup() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleToggle = (emoji: string) => {
    if (selected === emoji) {
      setSelected(null);
    } else {
      setSelected(emoji);
    }
  };

  return (
    <div className="mt-4 flex w-full flex-wrap justify-center gap-2">
      {reactions.map((emoji) => (
        <button
          key={emoji}
          onClick={() => handleToggle(emoji)}
          className={clsx(
            'flex items-center gap-2 rounded-3xl border px-2 py-1.5 text-xs font-semibold transition-all',
            'border-[var(--gray-100)] text-[var(--gray-400)]',
            selected === emoji && 'border-[var(--dark-blue)] bg-[var(--light-blue)]',
          )}
        >
          <span className="text-[12px]">{emoji}</span>
          <span className="text-[10px]">223</span>
        </button>
      ))}
    </div>
  );
}
