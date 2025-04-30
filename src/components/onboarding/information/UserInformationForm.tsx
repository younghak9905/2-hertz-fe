'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';

import ProfileImageSelector from '@components/onboarding/information/ProfileImageSelector';
import EmailInputSection from '@components/onboarding/information/EmailInputSection';
import GenderSelectGroup from '@components/onboarding/information/GenderSelectGroup';
import RandomNicknameButton from '@components/onboarding/information/RandomNicknameButton';
import OneLineIntroductionInput from '@components/onboarding/information/OneLineIntroductionInput';
import MatchingAgreementToggleGroup from '@components/onboarding/information/MatchingAgreementToggleGroup';

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
      <form className="space-y-8">
        <ProfileImageSelector selectedUrl={selectedImage} onSelect={setSelectedImage} />
        <EmailInputSection onVerify={handleVerify} isVerified={isEmailVerified} />
        <GenderSelectGroup />
        <RandomNicknameButton />
        <OneLineIntroductionInput />
        <MatchingAgreementToggleGroup />
      </form>
    </FormProvider>
  );
}
