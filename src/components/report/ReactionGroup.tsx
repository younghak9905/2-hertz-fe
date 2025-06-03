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
      {reactions.map((emoji) => {
        const isSelected = selected === emoji;

        return (
          <button
            key={emoji}
            onClick={() => handleToggle(emoji)}
            className={clsx(
              'flex items-center justify-around gap-1 rounded-3xl border px-3 py-1.5 text-xs font-semibold transition-all duration-200',
              isSelected
                ? 'border-[var(--dark-blue)] bg-[var(--light-blue)] text-[var(--dark-blue)]'
                : 'border-[var(--gray-100)] bg-white text-[var(--gray-400)]',
            )}
          >
            <span className="text-[12px]">{emoji}</span>
            <span className="text-[0.7rem]">223</span>
          </button>
        );
      })}
    </div>
  );
}
