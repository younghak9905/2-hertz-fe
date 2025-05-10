'use client';

import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { getChannelRooms } from '@/lib/api/chat';
import { useRouter } from 'next/navigation';

export default function ChannelsIndividualPage() {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['channelRooms', 0],
    queryFn: () => getChannelRooms(0, 10),
  });

  if (isLoading) return <p>불러오는 중...</p>;
  if (isError || !data || data.code === 'NO_CHANNEL_ROOM') {
    return <p>참여 중인 채널이 없습니다.</p>;
  }

  return (
    <div className="mt-2 space-y-6 overflow-hidden px-4">
      {data.data?.list.map((room) => (
        <button
          key={room.channelRoomId}
          onClick={() => router.push(`/chat/individual/${room.channelRoomId}?page=0&size=20`)}
          className="flex w-full appearance-none items-start gap-5 overflow-hidden border-none bg-transparent p-0 text-left"
        >
          <div key={room.channelRoomId} className="flex w-full items-start gap-5 overflow-hidden">
            <div className="relative h-12 w-12 flex-shrink-0 rounded-full bg-blue-300">
              <img
                src={room.partnerProfileImage || 'images/default-profile.jpg'}
                alt="프로필 이미지"
                className="h-full w-full rounded-full object-cover"
              />
              {!room.isRead && (
                <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-pink-400" />
              )}
            </div>

            <div className="w-full flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span
                    className={`rounded-2xl px-2 py-1 text-xs font-semibold ${
                      room.relationType === 'SIGNAL'
                        ? 'bg-[var(--gray-100)] text-[var(--blue)]'
                        : 'bg-[var(--light-pink)] text-[var(--pink)]'
                    }`}
                  >
                    {room.relationType === 'SIGNAL' ? '시그널' : '매칭'}
                  </span>
                  <span className="text-sm font-semibold text-ellipsis">
                    {room.partnerNickname}
                  </span>
                </div>
                <span className="text-xs font-light text-[var(--gray-200)]">
                  {dayjs(room.lastMessageTime).format('A hh:mm')}
                </span>
              </div>

              <p className="mt-1 line-clamp-2 text-sm font-light text-[var(--gray-400)]">
                {room.lastMessage}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
