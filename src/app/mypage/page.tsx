import Header from '@/components/layout/Header';
import KeywordTagGroup from '@/components/matching/individual/KeywordTagGroup';
import UserProfileCard from '@/components/mypage/UserProfileCard';

const matchedUser = {
  code: 'TUNING_SUCCESS',
  message: '튜닝된 사용자가 정상적으로 조회되었습니다.',
  data: {
    userId: 13,
    profileImage: '/images/penguin-profile.png',
    nickname: '로또에 당첨된 뚱이',
    gender: 'FEMALE',
    oneLineIntroduction:
      '안녕하세요 :) 서로의 이야기에 귀 기울이고, 편안한 분위기 속에서 진심 어린 대화를 나누고 싶어요. 공감과 배려를 소중히 여기며, 깊이 있는 인연으로 이어가고 싶습니다!',
    keywords: {
      mbti: 'ISTJ',
      religion: 'NON_RELIGIOUS',
      smoking: 'TRYING_TO_QUIT',
      drinking: 'TRYING_TO_QUIT',
    },
    sameInterests: {
      personality: ['RELIABLE'],
      preferredPeople: ['RELIABLE'],
      currentInterests: ['MOVIES'],
      favoriteFoods: ['TTEOKBOKKI'],
      likedSports: ['BASEBALL'],
      pets: ['CAT'],
      selfDevelopment: ['STUDYING'],
      hobbies: ['MUSIC'],
    },
  },
};

export default function MyPage() {
  return (
    <>
      <Header title="마이페이지" showBackButton={false} showNotificationButton={true} />
      <main className="pb-[calc(3.5rem + env(safe-area-inset-bottom))] flex-1 flex-col overflow-y-hidden px-4 pt-4">
        <div className="flex w-full flex-grow flex-col justify-between rounded-3xl px-5 py-4">
          <div className="space-y-4">
            <UserProfileCard
              profileImage={matchedUser.data.profileImage}
              nickname={matchedUser.data.nickname}
              oneLineIntroduction={matchedUser.data.oneLineIntroduction}
              gender={matchedUser.data.gender}
            />
            <KeywordTagGroup
              keywords={matchedUser.data.keywords}
              sameInterests={matchedUser.data.sameInterests}
              nickname={matchedUser.data.nickname}
            />
          </div>
        </div>
      </main>
    </>
  );
}
