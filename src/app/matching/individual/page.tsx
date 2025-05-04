import KeywordTagGroup from '@/components/matching/individual/KeywordTagGroup';
import Header from '@/components/layout/Header';
import TuningProfileCard from '@components/matching/individual/TuningProfileCard';

export default function IndividualMatchingPage() {
  return (
    <>
      <Header title="매칭된 TUNE" showBackButton={true} showNotificationButton={true} />
      <main className="flex min-h-[calc(100dvh-3.5rem)] flex-col overflow-y-auto p-4">
        <div className="w-full flex-grow space-y-4 rounded-3xl border-2 border-[var(--gray-100)] px-5">
          <TuningProfileCard selectedUrl="" />
          <KeywordTagGroup />
        </div>
      </main>
    </>
  );
}
