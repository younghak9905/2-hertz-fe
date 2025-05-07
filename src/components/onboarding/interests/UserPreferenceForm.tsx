'use client';

import { useEffect, useRef, useState } from 'react';
import InterestStep2 from './InterestStep2';
import InterestStep3 from './InterestStep3';
import InterestStep4 from './InterestStep4';
import KeywordStep1 from './KeywordStep1';
import { Button } from '@/components/ui/button';

export default function UserPreferenceForm() {
  const [step, setStep] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  const goNextPage = () => {
    if (step < 4) setStep((prev) => prev + 1);
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  return (
    <main
      ref={scrollRef}
      className="flex h-[calc(100dvh-3.5rem)] flex-col overflow-y-auto px-2 pt-14"
    >
      <div className="flex-grow space-y-4">
        {step === 1 && <KeywordStep1 />}
        {step === 2 && <InterestStep2 />}
        {step === 3 && <InterestStep3 />}
        {step === 4 && <InterestStep4 />}
      </div>

      <div className="mt-4 flex w-full justify-center">
        <Button
          onClick={goNextPage}
          type="submit"
          className="mb-4 w-full max-w-lg rounded-[8] bg-[var(--gray-400)] px-2 py-3 text-center text-sm font-semibold text-white"
        >
          <p>{step === 4 ? '저장하기' : '다음으로'}</p>
        </Button>
      </div>
    </main>
  );
}
