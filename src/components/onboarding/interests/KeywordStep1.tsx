import { EnumSelectGrid } from './EnumSelectGrid';
import { MBTI, Religion, Drinking, Smoking } from '@/constants/enum';
import HorizonBar from '@/components/common/horizonBar';
import { useFormContext } from 'react-hook-form';

export default function KeywordStep1() {
  const { setValue, watch } = useFormContext();

  const selectedMBTI = watch('keywords.mbti');
  const selectedReligion = watch('keywords.religion');
  const selectedDrinking = watch('keywords.drinking');
  const selectedSmoking = watch('keywords.smoking');

  return (
    <>
      <EnumSelectGrid
        title="MBTI는 무엇인가요?"
        description="* 단일 선택 가능"
        options={MBTI}
        selected={selectedMBTI}
        onSelect={(value) => setValue('keywords.mbti', value, { shouldValidate: true })}
      />
      <HorizonBar />

      <EnumSelectGrid
        title="종교가 있으신가요?"
        description="* 단일 선택 가능"
        options={Religion}
        selected={selectedReligion}
        onSelect={(value) => setValue('keywords.religion', value, { shouldValidate: true })}
      />
      <HorizonBar />

      <EnumSelectGrid
        title="음주를 하시나요?"
        description="* 단일 선택 가능"
        options={Drinking}
        selected={selectedDrinking}
        onSelect={(value) => setValue('keywords.drinking', value, { shouldValidate: true })}
      />
      <HorizonBar />

      <EnumSelectGrid
        title="흡연을 하시나요?"
        description="* 단일 선택 가능"
        options={Smoking}
        selected={selectedSmoking}
        onSelect={(value) => setValue('keywords.smoking', value, { shouldValidate: true })}
      />
    </>
  );
}
