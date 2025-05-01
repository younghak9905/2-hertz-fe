'use client';

import { useState } from 'react';
import { EnumSelectGrid } from './EnumSelectGrid';
import { MBTI, Religion, Drinking, Smoking } from '@/constants/enum';
import HorizonBar from '@/components/common/horizonBar';

export default function KeywordStep1() {
  const [selectedMBTI, setSelectedMBTI] = useState<string>('');
  const [selectedReligion, setSelectedReligion] = useState<string>('');
  const [selectedDrinking, setSelectedDrinking] = useState<string>('');
  const [selectedSmoking, setSelectedSmoking] = useState<string>('');

  return (
    <>
      <EnumSelectGrid
        title="MBTI는 무엇인가요?"
        description="* 단일 선택 가능"
        options={MBTI}
        selected={selectedMBTI}
        onSelect={setSelectedMBTI}
      />
      <HorizonBar />

      <EnumSelectGrid
        title="종교가 있으신가요?"
        description="* 단일 선택 가능"
        options={Religion}
        selected={selectedReligion}
        onSelect={setSelectedReligion}
      />
      <HorizonBar />

      <EnumSelectGrid
        title="음주를 하시나요?"
        description="* 단일 선택 가능"
        options={Drinking}
        selected={selectedDrinking}
        onSelect={setSelectedDrinking}
      />
      <HorizonBar />

      <EnumSelectGrid
        title="흡연을 하시나요?"
        description="* 단일 선택 가능"
        options={Smoking}
        selected={selectedSmoking}
        onSelect={setSelectedSmoking}
      />
    </>
  );
}
