'use client';

import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { IoRefreshCircle } from 'react-icons/io5';
import { Input } from '@/components/ui/input';
import { getRandomNickname } from '@/lib/api/onboarding';
import toast from 'react-hot-toast';
import clsx from 'clsx';

export default function RandomNicknameButton() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const nickname = watch('nickname');

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const newNickname = await getRandomNickname();
      setValue('nickname', newNickname, { shouldValidate: true });
    } catch (error) {
      toast.error('닉네임을 가져오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="space-y-4 px-2">
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold">닉네임을 선택해주세요</p>
        <p className="text-xs text-[var(--gray-300)]">* 한 번 설정하면 변경할 수 없습니다</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Input
          type="text"
          value={nickname}
          readOnly
          placeholder="기분좋은 튜너"
          className="h-11 flex-1 rounded-[6px] border-none bg-[var(--gray-100)] text-sm text-black placeholder:text-sm placeholder:text-[var(--gray-300)]"
        />
        <button type="button" onClick={handleClick}>
          <IoRefreshCircle
            className={clsx(
              'text-[32px] text-[var(--gray-400)] transition-transform duration-300',
              isLoading && 'animate-spin',
            )}
          />
        </button>
      </div>

      {typeof errors.nickname?.message === 'string' && (
        <p className="mt-2 text-xs font-medium text-[var(--pink)]">* {errors.nickname.message}</p>
      )}
    </main>
  );
}
