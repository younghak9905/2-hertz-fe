import {
  AgeGroup,
  Gender,
  Religion,
  Smoking,
  Drinking,
  MBTI,
  Personality,
  PreferredPeople,
  CurrentInterests,
  FavoriteFoods,
  LikedSports,
  Pets,
  SelfDevelopment,
  Hobbies,
} from '@/constants/enum';

const ALL_KEYWORD_MAP = {
  ...AgeGroup,
  ...Gender,
  ...Religion,
  ...Smoking,
  ...Drinking,
  ...MBTI,
  ...Personality,
  ...PreferredPeople,
  ...CurrentInterests,
  ...FavoriteFoods,
  ...LikedSports,
  ...Pets,
  ...SelfDevelopment,
  ...Hobbies,
};

interface KeywordTagProps {
  keywords: string[];
  variant?: 'default' | 'common';
}

export default function KeywordTag({ keywords, variant = 'default' }: KeywordTagProps) {
  const isCommon = variant === 'common';

  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword, i) => {
        const label = ALL_KEYWORD_MAP[keyword as keyof typeof ALL_KEYWORD_MAP] || keyword;

        const isPreferredPeople = Object.keys(PreferredPeople).includes(keyword);
        const displayLabel = isPreferredPeople ? `👩🏻‍❤️‍👨🏻 ${label}` : label;

        return (
          <div
            key={i}
            className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${
              isCommon
                ? 'border-[var(--blue)] bg-[var(--light-blue)] text-[var(--dark-blue)]'
                : 'border-[var(--gray-200)] text-black'
            }`}
          >
            # {displayLabel}
          </div>
        );
      })}
    </div>
  );
}
