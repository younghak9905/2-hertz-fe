'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/matching/individual');
  }, [router]);

  return (
    <div className="flex h-full w-full items-center justify-center text-sm">
      이 기능은 곧 업데이트 될 예정이에요 🚀
    </div>
  );
}
