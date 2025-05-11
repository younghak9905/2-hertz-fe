'use client';
import { useState } from 'react';
import { EnumSelectGrid } from './EnumSelectGrid';
import { Personality, PreferredPeople } from '@/constants/enum';
import HorizonBar from '@/components/common/horizonBar';
import { useFormContext } from 'react-hook-form';

export default function InterestStep2() {
  const { setValue, watch } = useFormContext();

  const selectedPersonality = watch('interests.personality');
  const selectedPreferredPeople = watch('interests.preferredPeople');

  return (
    <>
      <EnumSelectGrid
        title="당신은 어떤 사람인가요?"
        description="* 중복 선택 가능"
        options={Personality}
        selected={selectedPersonality}
        onSelect={(value) => setValue('interests.personality', value, { shouldValidate: true })}
        multi
        maxSelect={10}
      />
      <HorizonBar />

      <EnumSelectGrid
        title="어떤 성향의 상대를 원하시나요?"
        description="* 중복 선택 가능"
        options={PreferredPeople}
        selected={selectedPreferredPeople}
        onSelect={(value) => setValue('interests.preferredPeople', value, { shouldValidate: true })}
        multi
        maxSelect={10}
      />
    </>
  );
}
