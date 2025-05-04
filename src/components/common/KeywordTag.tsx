interface KeywordTagProps {
  keywords: string[];
  variant?: 'default' | 'common';
}

export default function KeywordTag({ keywords, variant = 'default' }: KeywordTagProps) {
  const isCommon = variant === 'common';

  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword, i) => (
        <div
          key={i}
          className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${isCommon ? 'border-[var(--blue)] bg-[var(--light-blue)] text-[var(--gray-500)]' : 'border-[var(--gray-200)] text-black'} `}
        >
          #{keyword}
        </div>
      ))}
    </div>
  );
}
