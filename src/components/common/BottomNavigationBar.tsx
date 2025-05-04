'use client';

import { usePathname, useRouter } from 'next/navigation';
import { HiOutlineHome } from 'react-icons/hi';
import { TbReportSearch } from 'react-icons/tb';
import { PiChatCircleDotsBold } from 'react-icons/pi';
import { FaRegUserCircle } from 'react-icons/fa';

const hiddenRoutes = ['/login', '/onboarding', '/not-found'];

export default function BottomNavigationBar() {
  const pathname = usePathname();
  const router = useRouter();

  const shouldHide = hiddenRoutes.some((route) => pathname.startsWith(route));
  if (shouldHide) return null;

  return (
    <nav className="fixed bottom-0 z-50 flex h-14 w-full max-w-[430px] items-center justify-around border-t bg-white">
      <button
        onClick={() => router.push('/home')}
        className="flex flex-col items-center gap-1 text-xs"
      >
        <HiOutlineHome className="h-5 w-5" />
        <p className="text-[0.7rem] font-medium">홈</p>
      </button>
      <button
        onClick={() => router.push('/report')}
        className="flex flex-col items-center gap-1 text-xs"
      >
        <TbReportSearch className="h-5 w-5" />
        <p className="text-[0.7rem] font-medium">리포트</p>
      </button>
      <button
        onClick={() => router.push('/channel')}
        className="flex flex-col items-center gap-1 text-xs"
      >
        <PiChatCircleDotsBold className="h-[18px] w-[18px]" />
        <p className="text-[0.7rem] font-medium">채널</p>
      </button>
      <button
        onClick={() => router.push('/mypage')}
        className="flex flex-col items-center gap-1 text-xs"
      >
        <FaRegUserCircle className="h-[18px] w-[18px]" />
        <p className="text-[0.7rem] font-medium">마이페이지</p>
      </button>
    </nav>
  );
}
