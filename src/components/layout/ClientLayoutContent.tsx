'use client';

import { usePathname } from 'next/navigation';
import BottomNavigationBar from '@/components/common/BottomNavigationBar';
import Header from '@/components/layout/Header';

const hiddenRoutes = ['/login', '/onboarding', '/not-found'];

export default function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldHideUI = hiddenRoutes.some((route) => pathname.startsWith(route));

  return (
    <div className="relative flex min-h-[100dvh] w-full max-w-[430px] flex-col">
      {!shouldHideUI && <Header title="튜닝" showNotificationButton />}
      <div
        className="flex-grow overflow-y-auto"
        style={{
          paddingTop: shouldHideUI ? 0 : '3.5rem',
          paddingBottom: shouldHideUI ? 0 : '3.5rem',
        }}
      >
        {children}
      </div>
      {!shouldHideUI && <BottomNavigationBar />}
    </div>
  );
}
