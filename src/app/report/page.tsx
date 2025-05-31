'use client';

import Header from '@/components/layout/Header';
import { TbArrowsSort } from 'react-icons/tb';
import { FiShare } from 'react-icons/fi';
import ReactionGroup from '@/components/report/ReactionGroup';
import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const mockReportList = [
  {
    createdDate: '2025-04-18T23:00:00',
    title: '📢 [커플 속보] 누가 누구랑? 이번 주 새롭게 연결된 인연 공개!',
    content: `이번 주, 새로운 연결이 성사되었습니다! <br />
      하지만… 누군지 바로 알려드릴 순 없죠😉 <br />
      지금부터 공개되는 힌트 3가지, 눈 크게 뜨고 확인하세요! <br />
      <br />
      🧩 힌트 #1 – MBTI 궁합이 심상치 않다?! <br />
      이번 커플의 MBTI 조합은 바로… <br />
      INTJ와 ENFP! <br />
      과묵한 전략가와 자유로운 영혼의 만남이라니… <br />
      완벽한 상극 속 케미, 기대해도 좋겠죠? <br />
      <br />
      🎯 힌트 #2 – 공통 관심사 발견! <br />
      두 사람 모두 “디지털 드로잉”과 “넷플릭스 심야 감상”을 <br />
      즐긴다고 해요. <br />
      새벽에 그림 그리며 나누는 대화… <br />
      혹시 예술혼이 불타오르는 중? <br />
      <br />
      💬 힌트 #3 – 대화가 끊이질 않았다 <br />
      서로 나눈 대화만 17회! <br />
      이쯤 되면 ‘그냥 친구’는 아닌 듯? <br />
      매일매일, 새로운 이야기를 쌓아가는 중이라는 소문입니다. <br />
      <br />
      📡 Stay Tuned! “다음 소식을 기대해 주세요!”`,
    reactions: { celebrate: 3, thumbsUp: 7, laugh: 1, eyes: 0, heart: 5, total: 16 },
    myReactions: { celebrate: false, thumbsUp: true, laugh: false, eyes: false, heart: true },
  },
];

export default function ReportPage() {
  const [sortType, setSortType] = useState<'latest' | 'popular'>('latest');

  const handleSortChange = (type: 'latest' | 'popular') => {
    setSortType(type);
  };

  return (
    <div className="bg-white px-8 py-4">
      <Header title="튜닝 리포트" showBackButton={false} showNotificationButton={true} />

      <div className="mt-2 flex items-center justify-between">
        <p className="px-2 font-bold">
          {dayjs(mockReportList[0].createdDate).format('YYYY년 MM월 DD일')}
        </p>

        <div className="flex items-center gap-3 px-2">
          <button
            onClick={() => handleSortChange(sortType === 'latest' ? 'popular' : 'latest')}
            className="flex cursor-pointer items-center gap-1"
          >
            <p className="text-sm font-medium">{sortType === 'latest' ? '최신순' : '인기순'}</p>
            <TbArrowsSort />
          </button>

          <FiShare className="cursor-pointer text-sm" />
        </div>
      </div>

      {mockReportList.map((report, idx) => (
        <div className="mt-4 rounded-2xl border p-4" key={idx}>
          <p className="text-sm font-bold">{report.title}</p>
          <p
            className="mt-4 text-sm leading-6"
            dangerouslySetInnerHTML={{ __html: report.content }}
          />
        </div>
      ))}
      <div className="flex w-full justify-between">
        <ReactionGroup />
      </div>
    </div>
  );
}
