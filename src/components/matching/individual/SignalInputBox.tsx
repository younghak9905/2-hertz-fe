'use client';

import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTuningStore } from '@/stores/matching/useTuningStore';
import { postSignal } from '@/lib/api/matching';
import toast from 'react-hot-toast';

interface SignalInputBoxProps {
  onSend: (message: string) => void;
}

export default function SignalInputBox({ onSend }: SignalInputBoxProps) {
  const [value, setValue] = useState('');
  const receiverUserId = useTuningStore((state) => state.receiverUserId);

  const handleSend = async () => {
    const message = value.trim();
    if (!message || !receiverUserId) return;
    onSend(message);

    try {
      const response = await postSignal({ receiverUserId, message });
      toast.success('시그널을 성공적으로 보냈습니다!');
      console.log('channel room id : ', response.data.channelRoomId);
      setValue('');
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { code?: string } };
        };
        const code = axiosError.response?.data?.code;

        if (code === 'USER_DEACTIVATED') {
          toast.error('상대방이 탈퇴한 사용자입니다.');
        } else if (code === 'ALREADY_IN_CONVERSATION') {
          toast.error('이미 대화 중인 상대방입니다.');
        } else {
          toast.error('시그널 전송에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex w-full items-center justify-between rounded-full bg-[#f2f6fa] px-2 py-1.5">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="상대방에게 첫 시그널 보내기"
        className="ml-2 flex-1 bg-transparent text-xs text-gray-500 outline-none placeholder:text-gray-400"
      />
      <button
        onClick={handleSend}
        className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow"
      >
        <ArrowUp className="h-3.5 w-3.5 text-gray-700" />
      </button>
    </div>
  );
}
