'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import Header from '@/components/layout/Header';
import KeywordTagGroup from '@/components/matching/individual/KeywordTagGroup';
import UserProfileCard from '@/components/mypage/UserProfileCard';
import { getUserInfo, GetUserInfoResponse } from '@/lib/api/user';
import { useEffect, useState } from 'react';

export default function ProfileDetailPage() {
  const [userInfo, setUserInfo] = useState<GetUserInfoResponse['data'] | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('userId가 없습니다.');
          return;
        }
        const response = await getUserInfo(userId);
        setUserInfo(response.data);
      } catch (error) {
        console.error('유저 정보 불러오기 실패: ', error);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header title="프로필 상세보기" showBackButton={false} showNotificationButton={true} />
      <main className="pb-[calc(3.5rem + env(safe-area-inset-bottom))] flex-1 flex-col overflow-y-hidden px-4 pt-4">
        <div className="flex w-full flex-grow flex-col justify-between rounded-3xl px-5 py-4">
          <div className="space-y-4">
            <UserProfileCard
              profileImage={userInfo.profileImage}
              nickname={userInfo.nickname}
              oneLineIntroduction={userInfo.oneLineIntroduction}
              gender={userInfo.gender}
            />
            <KeywordTagGroup
              keywords={userInfo.keywords}
              sameInterests={userInfo.interests}
              nickname={userInfo.nickname}
            />
          </div>
        </div>
      </main>
    </>
  );
}
