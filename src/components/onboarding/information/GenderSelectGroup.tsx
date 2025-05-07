import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useFormContext } from 'react-hook-form';

export default function GenderSelectGroup() {
  const { watch, setValue } = useFormContext();
  const gender = watch('gender');

  return (
    <main className="space-y-4 px-2">
      <p className="text-base font-semibold">성별을 선택해주세요</p>
      <ToggleGroup
        type="single"
        value={gender}
        className="w-full justify-between gap-4"
        onValueChange={(value) => {
          if (value) setValue('gender', value);
        }}
      >
        <ToggleGroupItem
          value="MALE"
          className="h-11 w-full rounded-[6] bg-[var(--gray-100)] px-4 py-2 text-sm font-medium data-[state=on]:rounded-[6] data-[state=on]:bg-[var(--gray-200)] data-[state=on]:text-black"
        >
          🙋🏻‍♂️ 남성
        </ToggleGroupItem>
        <ToggleGroupItem
          value="FEMALE"
          className="h-11 w-full rounded-[6] bg-[var(--gray-100)] px-4 py-2 text-sm font-medium data-[state=on]:rounded-[6] data-[state=on]:bg-[var(--gray-200)] data-[state=on]:text-black"
        >
          🙋🏻‍♀️ 여성
        </ToggleGroupItem>
      </ToggleGroup>
    </main>
  );
}
