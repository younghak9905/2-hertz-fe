interface EnumSelectGridProps {
  title: string;
  description: string;
  options: Record<string, string>;
  selected: string | null;
  onSelect: (key: string) => void;
}

export const EnumSelectGrid = ({
  title,
  description,
  options,
  selected,
  onSelect,
}: EnumSelectGridProps) => {
  return (
    <main className="space-y-4 px-2 pb-10">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-[var(--gray-300)]">{description}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {Object.entries(options).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            aria-pressed={selected === key}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selected === key
                ? 'bg-[var(--gray-400)] text-white'
                : 'bg-[var(--gray-100)] text-[var(--gray-400)]'
            }`}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
          >
            {label}
          </button>
        ))}
      </div>
    </main>
  );
};
