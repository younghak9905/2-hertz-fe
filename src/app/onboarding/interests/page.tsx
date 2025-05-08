'use client';

import Header from '@/components/layout/Header';
import dynamic from 'next/dynamic';

const UserPreferenceForm = dynamic(
  () => import('@/components/onboarding/interests/UserPreferenceForm'),
  { ssr: false },
);
export default function OnboardingInterestsPage() {
  return (
    <>
      <Header title="취향 선택하기" showBackButton={true} showNotificationButton={false} />
      <main className="overflow-y-auto p-4">
        <UserPreferenceForm />
      </main>
    </>
  );
}
