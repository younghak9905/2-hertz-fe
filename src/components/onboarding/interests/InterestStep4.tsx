'use client';
import { useState } from 'react';
import { EnumSelectGrid } from './EnumSelectGrid';
import { SelfDevelopment, Hobbies } from '@/constants/enum';
import HorizonBar from '@/components/common/horizonBar';
import { useFormContext } from 'react-hook-form';

export default function InterestStep4() {
  const { setValue, watch } = useFormContext();

  const selectedSelfDevelopment = watch('interests.selfDevelopment');
  const selectedHobbies = watch('interests.hobbies');

  return (
    <>
      <EnumSelectGrid
        title="자기계발을 하고 계신가요?"
        description="* 중복 선택 가능"
        options={SelfDevelopment}
        selected={selectedSelfDevelopment}
        onSelect={(value) => setValue('interests.selfDevelopment', value)}
        multi
        maxSelect={10}
      />
      <HorizonBar />

      <EnumSelectGrid
        title="취미를 선택해주세요"
        description="* 중복 선택 가능"
        options={Hobbies}
        selected={selectedHobbies}
        onSelect={(value) => setValue('interests.hobbies', value)}
        multi
        maxSelect={10}
      />
    </>
  );
}
