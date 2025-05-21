'use client';

import { usePathname } from 'next/navigation';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import Header from '@/components/layout/Header';
import { useState, useEffect } from 'react';

const hiddenRoutes = ['/login', '/onboarding', '/not-found'];

const HEADER_HEIGHT = 56;
const BOTTOM_NAV_HEIGHT = 56;

export default function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [padding, setPadding] = useState({ top: 0, bottom: 0 });
  const [isHiddenUI, setIsHiddenUI] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsHiddenUI(hiddenRoutes.some((route) => pathname.startsWith(route)));
  }, [pathname]);

  useEffect(() => {
    if (mounted) {
      setPadding(
        isHiddenUI ? { top: 0, bottom: 0 } : { top: HEADER_HEIGHT, bottom: BOTTOM_NAV_HEIGHT },
      );
    }
  }, [mounted, isHiddenUI]);

  if (!mounted) {
    return <div className="relative flex min-h-[100dvh] w-full max-w-[430px] flex-col" />;
  }

  return (
    <div
      className={`relative flex min-h-[100dvh] w-full max-w-[430px] flex-col ${
        isHiddenUI ? '' : 'bg-white'
      }`}
    >
      {!isHiddenUI && <Header title="" showBackButton={false} showNotificationButton={false} />}
      <div className={`flex-grow overflow-y-auto ${isHiddenUI ? '' : 'pt-[56px] pb-[56px]'}`}>
        {children}
      </div>
      {!isHiddenUI && <BottomNavigationBar />}
    </div>
  );
}
