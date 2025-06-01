'use client';

import KeywordTag from '@/components/common/KeywordTag';
import { TuningKeywords, TuningSameInterests } from '@/lib/api/matching';
import { usePathname } from 'next/navigation';

interface Tag {
  key: string;
  label: string;
}
interface KeywordTagGroupProps {
  keywords: TuningKeywords;
  sameInterests: TuningSameInterests;
  nickname: string;
}

export default function KeywordTagGroup({
  keywords,
  sameInterests,
  nickname,
}: KeywordTagGroupProps) {
  const pathname = usePathname();
  const isProfilePage = pathname.startsWith('/mypage') || pathname.startsWith('/profile');
  // 사용자 키워드를 렌더링용 문자열 배열로 변환 ('preferredPeople': 'RELIABLE' → 'PREFERRED_PEOPLE_RELIABLE')
  const keywordList = Object.entries(keywords).map(
    ([category, key]) => `${category.toUpperCase()}_${key}`,
  );

  const commonInterestList = Object.entries(sameInterests).flatMap(([category, keys]) => {
    const normalizedCategory = normalizeCategory(category);
    return keys.map((key: Tag) => `${normalizedCategory}_${key}`);
  });

  //  camelCase → SNAKE_CASE 변환 유틸 함수'preferredPeople' → 'PREFERRED_PEOPLE'
  function normalizeCategory(category: string) {
    return category.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
  }

  return (
    <main className="space-y-4 px-4">
      <div className="mb-10 space-y-4">
        <p className="font-semibold">{nickname}님의 키워드에요</p>
        <KeywordTag keywords={keywordList} />
      </div>

      <div className="mb-4 space-y-1.5">
        <p className="font-semibold">
          {isProfilePage ? '선택한 모든 관심사를 보여드릴게요' : '함께 나누는 공통 관심사에요'}
        </p>
      </div>
      {commonInterestList.length > 0 ? (
        <KeywordTag keywords={commonInterestList} variant="common" />
      ) : (
        <p className="items-center justify-center text-sm font-light text-[var(--gray-300)]">
          공통 관심사가 존재하지 않습니다.
        </p>
      )}
    </main>
  );
}
