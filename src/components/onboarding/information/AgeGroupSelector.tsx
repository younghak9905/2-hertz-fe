import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { AgeGroup } from '@/constants/enum';
import { useFormContext } from 'react-hook-form';

export default function AgeGroupSelector() {
  const { setValue } = useFormContext();

  return (
    <main className="space-y-4 px-2">
      <p className="text-base font-semibold">나이를 선택해주세요</p>

      <Select defaultValue="AGE_20S" onValueChange={(value) => setValue('ageGroup', value)}>
        <SelectTrigger className="w-[180px] rounded-xl">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(AgeGroup).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </main>
  );
}
