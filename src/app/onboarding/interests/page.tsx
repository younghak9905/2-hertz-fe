'use client';

import Header from '@/components/layout/Header';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const UserPreferenceForm = dynamic(
  () => import('@/components/onboarding/interests/UserPreferenceForm'),
  { ssr: false },
);
export default function OnboardingInterestsPage() {
  const [step, setStep] = useState(1);
  return (
    <>
      <Header title="취향 선택하기" showBackButton={step > 1} showNotificationButton={false} />
      <main className="overflow-y-auto p-4">
        <UserPreferenceForm onStepChange={setStep} />
      </main>
    </>
  );
}
