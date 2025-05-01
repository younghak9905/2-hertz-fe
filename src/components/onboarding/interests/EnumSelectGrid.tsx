'use client';

import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

interface EnumSelectGridPropsBase {
  title: string;
  description: string;
  options: Record<string, string>;
  multi?: boolean;
  maxSelect?: number;
}

type SingleSelectProps = EnumSelectGridPropsBase & {
  selected: string;
  onSelect: (value: string) => void;
  multi?: false;
};

type MultiSelectProps = EnumSelectGridPropsBase & {
  selected: string[];
  onSelect: (value: string[]) => void;
  multi: true;
  maxSelect?: number;
};

type EnumSelectGridProps = SingleSelectProps | MultiSelectProps;

export const EnumSelectGrid = (props: EnumSelectGridProps) => {
  const { title, description, options, multi = false, maxSelect = 10 } = props;

  const handleSelect = useCallback(
    (key: string) => {
      if (multi) {
        const current = props.selected as string[];
        const onSelect = props.onSelect as (value: string[]) => void;

        const alreadySelected = current.includes(key);
        if (alreadySelected) {
          onSelect(current.filter((item) => item !== key));
        } else {
          if (current.length >= maxSelect) {
            toast.error(`최대 ${maxSelect}개까지만 선택할 수 있어요`);
            return;
          }
          onSelect([...current, key]);
        }
      } else {
        const onSelect = props.onSelect as (value: string) => void;
        onSelect(key);
      }
    },
    [props.selected, props.onSelect, multi, maxSelect],
  );

  const isSelected = (key: string) => {
    if (multi) {
      return (props.selected as string[]).includes(key);
    }
    return props.selected === key;
  };

  return (
    <section className="space-y-4 px-2 pt-2 pb-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-[var(--gray-300)]">{description}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {Object.entries(options).map(([key, label]) => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            aria-pressed={isSelected(key)}
            className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isSelected(key)
                ? 'bg-[var(--gray-400)] text-white'
                : 'bg-[var(--gray-100)] text-[var(--gray-400)]'
            }`}
            style={{ whiteSpace: 'nowrap' }}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
};
