'use client';
import { useState } from 'react';
import { EnumSelectGrid } from './EnumSelectGrid';
import { Personality, PrefferedPeople } from '@/constants/enum';
import HorizonBar from '@/components/common/horizonBar';

export default function InterestStep2() {
  const [selectedPersonality, setSelectedPersonality] = useState<string[]>([]);
  const [selectedPrefferedPeople, setSelectedPrefferedPeople] = useState<string[]>([]);

  return (
    <>
      <EnumSelectGrid
        title="당신은 어떤 사람인가요?"
        description="* 중복 선택 가능"
        options={Personality}
        selected={selectedPersonality}
        onSelect={setSelectedPersonality}
        multi
        maxSelect={10}
      />
      <HorizonBar />

      <EnumSelectGrid
        title="어떤 성향의 상대를 원하시나요?"
        description="* 중복 선택 가능"
        options={PrefferedPeople}
        selected={selectedPrefferedPeople}
        onSelect={setSelectedPrefferedPeople}
        multi
        maxSelect={10}
      />
    </>
  );
}
