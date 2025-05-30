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
    <div className="mx-auto flex h-screen max-w-[430px] flex-col">
      <Header title="취향 선택하기" showBackButton={step > 1} showNotificationButton={false} />
      <div className="flex-1 px-4 pt-4">
        <UserPreferenceForm onStepChange={setStep} />
      </div>
    </div>
  );
}
