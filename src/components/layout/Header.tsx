'use client';

import { useRouter } from 'next/navigation';
import { FaRegBell } from 'react-icons/fa';
import { FaAngleLeft } from 'react-icons/fa6';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showNotificationButton?: boolean;
}

export default function Header({
  title,
  showBackButton = false,
  showNotificationButton = false,
}: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleAlarm = () => {
    router.replace('/alarm');
  };

  return (
    <header className="fixed top-0 left-1/2 z-50 box-border flex h-14 w-full max-w-[430px] -translate-x-1/2 items-center justify-between gap-8 border-none bg-white px-4">
      <div className="flex w-8 items-center">
        {showBackButton && (
          <button onClick={handleBack} className="p-1">
            <FaAngleLeft className="text-[clamp(1rem,2vw,1.2rem)]" />
          </button>
        )}
      </div>

      <h1 className="flex-1 text-lg font-bold text-black">{title}</h1>

      <div>
        {showNotificationButton ? (
          <button className="cursor-pointer p-1">
            <FaRegBell onClick={handleAlarm} className="text-[clamp(1rem,2vw,1.2rem)]" />
          </button>
        ) : (
          <div className="w-5" />
        )}
      </div>
    </header>
  );
}
