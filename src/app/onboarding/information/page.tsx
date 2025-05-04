'use client';

import { Suspense } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import OnboardingInformationWrapper from '@/components/onboarding/information/OnboardingInformationWrapper';

export default function OnboardingInformationPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Suspense fallback={<ScaleLoader />}>
        <OnboardingInformationWrapper />
      </Suspense>
    </div>
  );
}
