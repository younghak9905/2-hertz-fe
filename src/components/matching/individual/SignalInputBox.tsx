'use client';

import { useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface SignalInputBoxProps {
  onSend: (message: string) => void;
}

export default function SignalInputBox({ onSend }: SignalInputBoxProps) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const message = value.trim();
    if (!message) return;
    onSend(message);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mt-10 flex w-full items-center justify-between rounded-full bg-[#f2f6fa] px-2 py-1">
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
        <ArrowUp className="h-4 w-4 text-gray-700" />
      </button>
    </div>
  );
}
