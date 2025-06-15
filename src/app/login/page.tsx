'use client';

import Image from 'next/image';
import { getKakaoRedirect } from '@/lib/api/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '@/utils/auth';

export default function LoginPage() {
  const router = useRouter();
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/home');
    } else {
      setShowPage(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      await getKakaoRedirect();
    } catch (error) {
      console.error(error);
      toast.error('카카오 로그인에 실패했습니다.');
    }
  };

  if (!showPage) return null;

  return (
    <main className="flex h-screen flex-col items-center justify-center px-10">
      <button className="flex flex-col items-center gap-8">
        <Image src="/icons/logo-main.svg" alt="logo" width={250} height={500} priority />
      </button>

      <div
        onClick={handleLogin}
        className="mt-20 cursor-pointer transition hover:opacity-90 active:scale-98"
      >
        <Image src="/icons/kakao-login.svg" alt="kakao login" width={300} height={300} priority />
      </div>
    </main>
  );
}
