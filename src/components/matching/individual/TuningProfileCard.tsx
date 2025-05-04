'use client';

import Image from 'next/image';
import { IoRefreshCircle } from 'react-icons/io5';

interface TuningProfileCardProps {
  selectedUrl: string;
}

export default function TuningProfileCard({ selectedUrl }: TuningProfileCardProps) {
  return (
    <>
      <button className="mt-4 flex w-full justify-end">
        <IoRefreshCircle className="items-end text-[32px] text-[var(--gray-400)]" />
      </button>
      <div className="mx-auto flex w-full flex-col items-center">
        <div className="relative aspect-square w-full max-w-[6rem] rounded-full border border-[var(--gray-200)] p-2 ring-[var(--gray-100)]">
          <Image
            src={selectedUrl?.trim() ? selectedUrl : '/images/default-profile.png'}
            alt="프로필 이미지"
            fill
            className="rounded-full object-cover"
            draggable={false}
          />
        </div>

        <p className="mt-3 truncate text-center text-lg font-semibold">행복한 개구리</p>
        <p className="truncate text-center text-sm text-[var(--gray-300)]">남성</p>
      </div>

      <div className="mt-8 max-w-[25rem] rounded-3xl border-2 p-4">
        <div className="w-full text-sm leading-relaxed font-light">
          지금 이 순간에도 누군가는 당신과 주파수를 맞추려 시그널을 보내고 있어요. 그 울림을
          느껴보세요.
        </div>
      </div>
    </>
  );
}
