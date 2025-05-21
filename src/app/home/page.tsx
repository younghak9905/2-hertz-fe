'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MaintenanceNotice from '@/components/common/MaintenanceNotice';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/matching/individual');
  }, [router]);

  return <MaintenanceNotice />;
}
