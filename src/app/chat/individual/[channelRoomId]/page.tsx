'use client';

import ReceiverMessage from '@/components/chat/common/ReceiverMessage';
import SenderMessage from '@/components/chat/common/SenderMessage';
import ChatHeader from '@/components/layout/ChatHeader';
import SignalInputBox from '@/components/matching/individual/SignalInputBox';

export default function ChatsIndividualPage() {
  return (
    <>
      <main className="relative flex h-[calc(100vh-3.5rem)] w-full flex-col overflow-x-hidden px-6 pb-18">
        <ChatHeader
          title="카카오테크 부트캠프에서 함께한 동료들"
          onLeave={() => console.log('나가기')}
          onToggleDetail={() => console.log('상세 보기 토글')}
        />
        <div className="mx-auto mb-10 w-fit items-center justify-center rounded-2xl bg-[var(--gray-100)] px-4 py-1 text-sm font-semibold text-[var(--gray-400)]">
          2025년 5월 5일 월요일
        </div>
        <div className="flex flex-col gap-6">
          <SenderMessage
            contents="안녕하세요! 만나서 반갑습니다 :) 지금 이 순간에도 누군가는 당신과 주파수를 맞추려 시그널을 보내고 있어요. 그 울림을 느껴보세요.지금 이 순간에도 누군가는 당신과 주파수를 맞추려 시그널을 보내고 있어요. "
            sentAt="2023-05-05T12:00:00"
          />
          <ReceiverMessage
            nickname="행복한 고구마"
            profileImage="/images/dog-profile.png"
            contents="안녕하세요! 만나서 반갑습니다 :) 지금 이 순간에도 누군가는 당신과 주파수를 맞추려 시그널을 보내고 있어요. 그 울림을 느껴보세요.지금 이 순간에도 누군가는 당신과 주파수를 맞추려 시그널을 보내고 있어요. "
            sentAt="2023-05-05T12:00:00"
          />

          <SenderMessage
            contents="안녕하세요! 만나서 반갑습니다 :) 지금 이 순간에도 누군가는 당신과 주파수를 맞추려 시그널을 보내고 있어요. 그 울림을 느껴보세요.지금 이 순간에도 누군가는 당신과 주파수를 맞추려 시그널을 보내고 있어요. "
            sentAt="2023-05-05T12:00:00"
          />
          <ReceiverMessage
            nickname="행복한 고구마"
            profileImage="/images/dog-profile.png"
            contents="안녕하세요! 만나서 반갑습니다 :) 지금 이 순간에도 누군가는 당신과 주파수를 맞추려 시그널을 보내고 있어요. 그 울림을 느껴보세요.지금 이 순간에도 누군가는 당신과 주파수를 맞추려 시그널을 보내고 있어요. "
            sentAt="2023-05-05T12:00:00"
          />
        </div>
      </main>
      <div className="absolute bottom-14 w-full bg-white px-5 pt-2 pb-2">
        <SignalInputBox onSend={(message) => console.log('보낸 메시지:', message)} />
      </div>
    </>
  );
}
