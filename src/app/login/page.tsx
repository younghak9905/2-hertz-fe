'use client';

import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="h-[calc(100vh-3.5rem)] flex flex-col justify-center items-center px-10">
      <div className="flex flex-col gap-8 items-center">
        <Image src="/icons/favicon.png" alt="favicon" width={100} height={100} />
        <Image src="/icons/logo-blue.png" alt="logo-blue" width={120} height={100} />
      </div>
      <p className="mt-12 mb-40 text-center font-light text-[var(--gray-400)]">
        당신만의 주파수를 찾고 있다면, <br /> 지금 튜닝으로 시작해보세요
      </p>
      <Image src="/icons/kakao-login.png" alt="kakao login" width={300} height={300} />
    </main>
  );
}