'use client';

import dayjs from 'dayjs';

interface SenderMessageProps {
  contents: string;
  sentAt: string;
}

export default function SenderMessage({ contents, sentAt }: SenderMessageProps) {
  return (
    <div className="flex items-end justify-end gap-2 pr-4">
      <p className="mt-1 text-xs text-[var(--gray-300)]">{dayjs(sentAt).format('HH:mm')}</p>
      <div className="max-w-[14rem]">
        <div className="inline-block rounded-3xl border border-[var(--blue)] bg-white px-4 py-2 text-xs leading-[1.4] text-black">
          {contents}
        </div>
      </div>
    </div>
  );
}
