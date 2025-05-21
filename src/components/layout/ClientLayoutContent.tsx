'use client';

import { usePathname } from 'next/navigation';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import Header from '@/components/layout/Header';

const hiddenRoutes = ['/login', '/onboarding', '/not-found'];

const HEADER_HEIGHT = 56;
const BOTTOM_NAV_HEIGHT = 56;

export default function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldHideUI = hiddenRoutes.some((route) => pathname.startsWith(route));

  return (
    <div className="relative flex min-h-[100dvh] w-full max-w-[430px] flex-col">
      {!shouldHideUI && <Header title="" showBackButton={false} showNotificationButton={false} />}
      <div
        className="flex-grow overflow-y-auto"
        style={{
          paddingTop: shouldHideUI ? 0 : `${HEADER_HEIGHT}px`,
          paddingBottom: shouldHideUI ? 0 : `${BOTTOM_NAV_HEIGHT}px`,
        }}
      >
        {children}
      </div>
      {!shouldHideUI && <BottomNavigationBar />}
    </div>
  );
}
