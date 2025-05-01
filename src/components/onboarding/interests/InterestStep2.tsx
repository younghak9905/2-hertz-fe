'use client';
import { useState } from 'react';
import { EnumSelectGrid } from './EnumSelectGrid';
import { Personality, PrefferedPeople } from '@/constants/enum';

export default function InterestStep2() {
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);
  const [selectedPrefferedPeople, setSelectedPrefferedPeople] = useState<string | null>(null);

  return (
    <>
      <EnumSelectGrid
        title="당신은 어떤 사람인가요?"
        description="* 중복 선택 가능 (최대 10개)"
        options={Personality}
        selected={selectedPersonality}
        onSelect={setSelectedPersonality}
      />
      <EnumSelectGrid
        title="어떤 성향의 상대를 원하시나요?"
        description="* 중복 선택 가능 (최대 10개)"
        options={PrefferedPeople}
        selected={selectedPrefferedPeople}
        onSelect={setSelectedPrefferedPeople}
      />
    </>
  );
}
