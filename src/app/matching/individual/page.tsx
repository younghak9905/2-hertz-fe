'use client';

import KeywordTagGroup from '@/components/matching/individual/KeywordTagGroup';
import Header from '@/components/layout/Header';
import TuningProfileCard from '@components/matching/individual/TuningProfileCard';
import SignalInputBox from '@/components/matching/individual/SignalInputBox';

export default function IndividualMatchingPage() {
  return (
    <>
      <Header title="매칭된 TUNE" showBackButton={true} showNotificationButton={true} />
      <main className="flex min-h-[calc(100dvh-3.5rem)] flex-col overflow-y-auto p-4">
        <div className="flex w-full flex-grow flex-col justify-between rounded-3xl border-2 border-[var(--gray-100)] px-5 py-4">
          <div className="space-y-4">
            <TuningProfileCard selectedUrl="" />
            <KeywordTagGroup />
          </div>
          <div className="pt-8">
            <SignalInputBox onSend={(message) => console.log('보낸 메시지:', message)} />
          </div>
        </div>
      </main>
    </>
  );
}
