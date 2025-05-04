'use client';

import KeywordTag from '@/components/common/KeywordTag';
import SignalInputBox from './SignalInputBox';

const keywords = ['ESTP', '여행', '영화감상', '운동', '고양이', '커피'];

export default function KeywordTagGroup() {
  return (
    <>
      <main className="space-y-4 px-4">
        <div className="mb-8 space-y-4">
          <p className="font-medium font-semibold">행복한 개구리 님의 키워드에요</p>
          <KeywordTag keywords={keywords} />
        </div>

        <div className="mb-4 space-y-1.5">
          <p className="font-semibold">행복한 개구리 님의 관심사에요</p>
          <p className="mb-5 text-xs text-[var(--gray-300)]">
            * 공통 관심사는 파란색으로 표시됩니다
          </p>
        </div>
        <KeywordTag keywords={keywords} variant="common" />
        <KeywordTag keywords={keywords} />
      </main>
      <SignalInputBox onSend={(message) => console.log('보낸 메시지:', message)} />
    </>
  );
}
