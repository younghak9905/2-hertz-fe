'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EmailInputSectionProps {
  onVerify: () => Promise<boolean>;
  isVerified: boolean;
}

export default function EmailInputSection({ onVerify, isVerified }: EmailInputSectionProps) {
  const {
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const email = watch('email');
  const [isCooldown, setIsCooldown] = useState(false);
  const [timer, setTimer] = useState(180);
  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(() => {
    if (!email) return;

    if (!email.includes('@') || !email.includes('.')) {
      setError('email', {
        type: 'manual',
        message: '올바르지 않은 이메일 형식입니다.',
      });
      setIsValidEmail(false);
      return;
    }

    const domain = email.split('@')[1];
    const blockedDomains = ['gmail.com', 'naver.com', 'daum.net'];

    if (blockedDomains.includes(domain)) {
      setError('email', {
        type: 'manual',
        message: '소셜 이메일은 입력할 수 없습니다.',
      });
      setIsValidEmail(false);
      return;
    }

    clearErrors('email');
    setIsValidEmail(true);
  }, [email, setError, clearErrors]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isCooldown && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsCooldown(false);
      setTimer(180);
    }

    return () => clearInterval(interval);
  }, [isCooldown, timer]);

  const handleRequestVerification = async () => {
    if (!isValidEmail || isCooldown || isVerified) return;

    const success = await onVerify();
    if (success) {
      setIsCooldown(true);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleRequestVerification();
    }
  };

  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <main className="space-y-4 px-2">
      <p className="text-base font-semibold">기업 및 교육기관용 이메일을 입력해주세요</p>

      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="tuning@hertz.com"
          {...register('email')}
          onKeyDown={handleKeyDown}
          className="h-11 flex-1 rounded-[6px] border-none bg-gray-100 text-sm"
        />
        <Button
          type="button"
          onClick={handleRequestVerification}
          className={`h-11 rounded-[6px] px-4 text-sm transition-colors duration-200 ${
            isVerified
              ? 'bg-gray-100 text-black'
              : isCooldown
                ? 'bg-gray-500 text-white'
                : isValidEmail
                  ? 'bg-gray-300 text-black hover:bg-gray-400'
                  : 'cursor-not-allowed bg-gray-100 text-gray-400'
          }`}
          disabled={!isValidEmail || isVerified || isCooldown}
        >
          {isVerified ? '인증 완료' : isCooldown ? formatTime(timer) : '인증 요청'}
        </Button>
      </div>

      {errors.email && (
        <p className="text-xs text-[var(--pink)]">* {errors.email.message?.toString()}</p>
      )}
    </main>
  );
}
