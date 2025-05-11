'use client';

import ReceiverMessage from '@/components/chat/common/ReceiverMessage';
import SenderMessage from '@/components/chat/common/SenderMessage';
import ChatHeader from '@/components/layout/ChatHeader';
import ChatSignalInputBox from '@/components/chat/common/ChatSignalInputBox';
import {
  ChannelRoomDetailResponse,
  getChannelRoomDetail,
  postChannelMessage,
} from '@/lib/api/chat';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export default function ChatsIndividualPage() {
  const { channelRoomId } = useParams();
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery<ChannelRoomDetailResponse>({
      queryKey: ['channelRoom', channelRoomId],
      queryFn: ({ pageParam = 0 }) =>
        getChannelRoomDetail(Number(channelRoomId), pageParam as number, 20),
      getNextPageParam: (lastPage) => {
        if (!lastPage?.data?.pageable) return undefined;
        return lastPage.data.pageable.isLast ? undefined : lastPage.data.pageable.pageNumber + 1;
      },
      enabled: !!channelRoomId,
      initialPageParam: 0,
    });

  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data?.pages]);

  const partner = data?.pages?.[0]?.data;
  const messages = data?.pages.flatMap((page) => page.data.messages.list) || [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // polling
  useEffect(() => {
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['channelRoom', channelRoomId] });
    }, 3000);

    return () => clearInterval(interval);
  }, [channelRoomId, queryClient]);

  const handleSend = async (message: string, onSuccess: () => void) => {
    try {
      const response = await postChannelMessage(Number(channelRoomId), { message });

      if (response.code === 'MESSAGE_CREATED') {
        await queryClient.invalidateQueries({ queryKey: ['channelRoom', channelRoomId] });
        onSuccess();
      } else if (response.code === 'USER_DEACTIVATED') {
        toast.error('상대방이 탈퇴한 사용자입니다.');
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    } catch (err) {
      toast.error('메세지 전송에 실패했습니다.');
    }
  };

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <>
      <main className="relative flex h-[calc(100vh-3.5rem)] w-full flex-col overflow-x-hidden px-6 pb-18">
        <ChatHeader
          title={partner?.partnerNickname ?? ''}
          onLeave={() => console.log('나가기')}
          onToggleDetail={() => console.log('상세 보기 토글')}
        />
        <div className="mx-auto mb-10 w-fit items-center justify-center rounded-2xl bg-[var(--gray-100)] px-4 py-1 text-sm font-semibold text-[var(--gray-400)]">
          2025년 5월 5일 월요일
        </div>
        <div className="flex flex-col gap-6">
          {messages.map((msg) =>
            msg.messageSenderId === partner?.partnerId ? (
              <ReceiverMessage
                key={msg.messageId}
                nickname={partner?.partnerNickname ?? ''}
                profileImage={partner?.partnerProfileImage ?? '/images/default-profile.png'}
                contents={msg.messageContents}
                sentAt={msg.messageSendAt}
              />
            ) : (
              <SenderMessage
                key={msg.messageId}
                contents={msg.messageContents}
                sentAt={msg.messageSendAt}
              />
            ),
          )}
          <div ref={bottomRef} />
        </div>
      </main>
      <div className="absolute bottom-14 w-full bg-white px-5 pt-2 pb-2">
        <ChatSignalInputBox onSend={handleSend} />
      </div>
    </>
  );
}
