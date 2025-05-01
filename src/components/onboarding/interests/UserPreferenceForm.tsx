'use client';

import { useState } from 'react';
import InterestStep2 from './InterestStep2';
import InterestStep3 from './InterestStep3';
import InterestStep4 from './InterestStep4';
import KeywordStep1 from './KeywordStep1';
import { Button } from '@/components/ui/button';

export default function UserPreferenceForm() {
  const [step, setStep] = useState(1);

  const goNextPage = () => {
    if (step < 4) setStep((prev) => prev + 1);
  };

  return (
    <main className="space-y-4 px-2">
      <div>
        {step === 1 && <KeywordStep1 />}
        {step === 2 && <InterestStep2 />}
        {step === 3 && <InterestStep3 />}
        {step === 4 && <InterestStep4 />}
        <div className="mt-4 flex w-full justify-center">
          <Button
            onClick={goNextPage}
            type="submit"
            className="mb-4 w-full max-w-lg rounded-[6] bg-[var(--gray-400)] px-2 py-3 text-center text-sm font-semibold text-white"
          >
            <p>{step === 4 ? '저장하기' : '다음으로'}</p>
          </Button>
        </div>
      </div>
    </main>
  );
}
