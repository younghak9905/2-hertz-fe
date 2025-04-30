'use client';

import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function OneLineIntroductionInput() {
  const [text, setText] = useState('');

  return (
    <main className="space-y-4 px-2">
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold">당신의 한 줄 소개를 작성해주세요</p>
        <p className="text-xs text-[var(--gray-300)]">{text.length} / 100</p>
      </div>

      <Textarea
        placeholder="당신을 소개하는 한 줄 소개를 작성해주세요"
        className="h-[6.5rem] resize-none overflow-y-auto rounded-[6px] border-none bg-[var(--gray-100)] text-sm leading-[1.6rem]"
        maxLength={100}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </main>
  );
}
