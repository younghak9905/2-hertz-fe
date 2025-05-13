'use client';

import { Button } from '@components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <main className="flex h-full flex-col items-center justify-center gap-y-4 p-4">
      <div className="relative h-[200px] w-full max-w-[200px]">
        <Image src="/icons/404.png" alt="404 이미지" fill className="object-contain" />
      </div>
      <p className="mb-18 text-center text-lg">
        찾을 수 없는 페이지입니다.
        <br />
        요청하신 페이지가 사라졌거나 <br />
        잘못된 경로입니다.
      </p>
      <Button variant="outline" onClick={() => router.back()} className="text-md rounded-3xl">
        이전 화면으로 돌아가기
      </Button>
    </main>
  );
}
