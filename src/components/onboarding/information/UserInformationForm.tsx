'use client';

import ProfileImageSelector from '@components/onboarding/information/ProfileImageSelector';
import EmailInputSection from '@components/onboarding/information/EmailInputSection';
import GenderSelectGroup from '@components/onboarding/information/GenderSelectGroup';
import RandomNicknameButton from '@components/onboarding/information/RandomNicknameButton';
import OneLineIntroductionInput from '@components/onboarding/information/OneLineIntroductionInput';
import MatchingAgreementToggleGroup from '@components/onboarding/information/MatchingAgreementToggleGroup';
import { useState } from 'react';

export default function UserInformationForm() {
  const [selectedImage, setSelectedImage] = useState('/images/duck-profile.png');
  return (
    <main className="space-y-8">
      <ProfileImageSelector selectedUrl={selectedImage} onSelect={setSelectedImage} />
      <EmailInputSection />
      <GenderSelectGroup />
      <RandomNicknameButton />
      <OneLineIntroductionInput />
      <MatchingAgreementToggleGroup />
    </main>
  );
}
