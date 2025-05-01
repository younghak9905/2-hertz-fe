'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@components/ui/button';

import ProfileImageSelector from '@components/onboarding/information/ProfileImageSelector';
import EmailInputSection from '@components/onboarding/information/EmailInputSection';
import GenderSelectGroup from '@components/onboarding/information/GenderSelectGroup';
import RandomNicknameButton from '@components/onboarding/information/RandomNicknameButton';
import OneLineIntroductionInput from '@components/onboarding/information/OneLineIntroductionInput';
import MatchingAgreementToggleGroup from '@components/onboarding/information/MatchingAgreementToggleGroup';
import AgeGroupSelector from './AgeGroupSelector';

export default function UserInformationForm() {
  const methods = useForm({
    defaultValues: {
      email: '',
      nickname: '',
      oneLineIntroduction: '',
      gender: 'MALE',
    },
  });

  const [selectedImage, setSelectedImage] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleVerify = async () => {
    setIsEmailVerified(true);
    return true;
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-10">
        <ProfileImageSelector selectedUrl={selectedImage} onSelect={setSelectedImage} />
        <EmailInputSection onVerify={handleVerify} isVerified={isEmailVerified} />
        <GenderSelectGroup />
        <AgeGroupSelector />
        <RandomNicknameButton />
        <OneLineIntroductionInput />
        <MatchingAgreementToggleGroup />
      </form>
      <div className="mt-4 flex justify-center">
        <Button
          type="submit"
          className="mt-8 mb-4 w-full rounded-[8] bg-[var(--gray-400)] px-4 py-4 text-center text-sm font-semibold text-white"
        >
          다음으로
        </Button>
      </div>
    </FormProvider>
  );
}
