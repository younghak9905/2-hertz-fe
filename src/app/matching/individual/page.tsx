'use client';

import KeywordTagGroup from '@/components/matching/individual/KeywordTagGroup';
import Header from '@/components/layout/Header';
import TuningProfileCard from '@components/matching/individual/TuningProfileCard';
import SignalInputBox from '@/components/matching/individual/SignalInputBox';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTuningUser } from '@/lib/api/matching';
import Loading from './loading';
import { useTuningStore } from '@/stores/matching/useTuningStore';
import { useEffect } from 'react';

export default function IndividualMatchingPage() {
  const queryClient = useQueryClient();
  const setReceiverUserId = useTuningStore((state) => state.setReceiverUserId);

  const { data, isLoading } = useQuery({
    queryKey: ['tuningUser'],
    queryFn: getTuningUser,
  });

  const matchedUser = data?.data;

  useEffect(() => {
    if (matchedUser?.userId) {
      setReceiverUserId(matchedUser.userId);
    }
  }, [matchedUser?.userId, setReceiverUserId]);

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['tuningUser'] });
  };

  if (isLoading || !matchedUser) {
    return <Loading />;
  }

  return (
    <>
      <Header title="매칭된 TUNE" showBackButton={true} showNotificationButton={true} />
      <main className="flex flex-col overflow-y-auto p-4">
        <div className="flex w-full flex-grow flex-col justify-between rounded-3xl border-2 border-[var(--gray-100)] px-5 py-4">
          <div className="space-y-4">
            <TuningProfileCard
              profileImage={matchedUser.profileImage}
              nickname={matchedUser.nickname}
              oneLineIntroduction={matchedUser.oneLineIntroduction}
              gender={matchedUser.gender}
              onRefresh={handleRefresh}
            />
            <KeywordTagGroup
              keywords={matchedUser.keywords}
              sameInterests={matchedUser.sameInterests}
              nickname={matchedUser.nickname}
            />
          </div>
          <div className="pt-8">
            <SignalInputBox onSend={(message) => console.log('보낸 메시지:', message)} />
          </div>
        </div>
      </main>
    </>
  );
}
