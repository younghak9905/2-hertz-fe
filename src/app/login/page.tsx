'use client';

import Image from 'next/image';
import { getKakaoRedirect } from '@/lib/api/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const handleLogin = async () => {
    try {
      await getKakaoRedirect();
    } catch (error) {
      console.error(error);
      toast.error('카카오 로그인에 실패했습니다.');
    }
  };

  return (
    <main className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-10">
      <div className="flex flex-col items-center gap-8">
        <Image src="/icons/favicon.png" alt="favicon" width={100} height={100} />
        <Image src="/icons/logo-blue.png" alt="logo-blue" width={120} height={100} />
      </div>

      <p className="mt-12 mb-40 text-center font-light text-[var(--gray-400)]">
        당신만의 주파수를 찾고 있다면, <br /> 지금 튜닝으로 시작해보세요
      </p>

      <div
        onClick={handleLogin}
        className="cursor-pointer transition hover:opacity-90 active:scale-98"
      >
        <Image src="/icons/kakao-login.png" alt="kakao login" width={300} height={300} />
      </div>
    </main>
  );
}
