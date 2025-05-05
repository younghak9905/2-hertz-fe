'use client';

import ChatHeader from '@/components/layout/ChatHeader';

export default function ChatsIndividualPage() {
  return (
    <>
      <main className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-10">
        <ChatHeader
          title="카카오테크 부트캠프에서 함께한 동료들"
          onLeave={() => console.log('나가기')}
          onToggleDetail={() => console.log('상세 보기 토글')}
        />
        <div className="flex rounded-2xl bg-[var(--gray-100)] px-4 py-1 text-sm font-semibold text-[var(--gray-400)]">
          2025년 5월 5일 월요일
        </div>
      </main>
    </>
  );
}
