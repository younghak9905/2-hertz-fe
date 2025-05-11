'use client';

import ReceiverMessage from '@/components/chat/common/ReceiverMessage';
import SenderMessage from '@/components/chat/common/SenderMessage';
import ChatHeader from '@/components/layout/ChatHeader';
import ChatSignalInputBox from '@/components/chat/common/ChatSignalInputBox';
import { getChannelRoomDetail, postChannelMessage } from '@/lib/api/chat';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ChatsIndividualPage() {
  const { channelRoomId } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['channelRoom', channelRoomId],
    queryFn: () => getChannelRoomDetail(Number(channelRoomId)),
    enabled: !!channelRoomId,
  });

  const partner = data?.data;
  const messages = partner?.messages.list || [];

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
        </div>
      </main>
      <div className="absolute bottom-14 w-full bg-white px-5 pt-2 pb-2">
        <ChatSignalInputBox onSend={handleSend} />
      </div>
    </>
  );
}
