'use client';

import dayjs from 'dayjs';

interface ChannelRoom {
  channelRoomId: number;
  partnerProfileImage: string;
  partnerNickname: string;
  lastMessage: string;
  lastMessageTime: string;
  isRead: boolean;
  relationType: 'SIGNAL' | 'MATCHING';
}

const dummyData: ChannelRoom[] = [
  {
    channelRoomId: 1,
    partnerProfileImage: 'images/cat-profile.png',
    partnerNickname: '행복한 개구리',
    lastMessage:
      '안녕하세요! 저는 카카오테크 부트캠프 풀스택 2기 daisy입니다. 프론트엔드 개발자이자 2조 대표자입니다 ~!',
    lastMessageTime: '2025-04-17T14:13:00',
    isRead: true,
    relationType: 'SIGNAL',
  },
  {
    channelRoomId: 2,
    partnerProfileImage: 'images/elephant-profile.png',
    partnerNickname: '긍정의 토끼',
    lastMessage:
      '안녕하세요! 저는 카카오테크 부트캠프 풀스택 2기 daisy입니다. 프론트엔드 개발자이자 2조 대표자입니다 ~!',
    lastMessageTime: '2025-04-08T09:00:00',
    isRead: false,
    relationType: 'MATCHING',
  },
];

export default function ChannelsIndividualPage() {
  const data = dummyData;

  return (
    <div className="mt-2 space-y-6 overflow-hidden px-4">
      {data.map((item) => (
        <div key={item.channelRoomId} className="flex w-full items-start gap-5 overflow-hidden">
          <div className="relative h-12 w-12 flex-shrink-0 rounded-full bg-blue-300">
            <img
              src={item.partnerProfileImage || 'images/default-profile.jpg'}
              alt="프로필 이미지"
              className="h-full w-full rounded-full object-cover"
            />
            {!item.isRead && (
              <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-pink-400" />
            )}
          </div>

          <div className="w-full flex-1 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <span
                  className={`rounded-2xl px-2 py-1 text-xs font-semibold ${
                    item.relationType === 'SIGNAL'
                      ? 'bg-[var(--gray-100)] text-[var(--blue)]'
                      : 'bg-[var(--light-pink)] text-[var(--pink)]'
                  }`}
                >
                  {item.relationType === 'SIGNAL' ? '시그널' : '매칭'}
                </span>
                <span className="text-sm font-semibold text-ellipsis">{item.partnerNickname}</span>
              </div>
              <span className="text-xs font-light text-[var(--gray-200)]">
                {dayjs(item.lastMessageTime).format('A hh:mm')}
              </span>
            </div>

            <p className="mt-1 line-clamp-2 text-sm font-light text-[var(--gray-400)]">
              {item.lastMessage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
