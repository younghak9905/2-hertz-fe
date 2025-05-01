import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

export default function AgeGroupSelector() {
  return (
    <main className="space-y-4 px-2">
      <p className="text-base font-semibold">나이를 선택해주세요</p>

      <Select defaultValue="age_20s">
        <SelectTrigger className="w-[180px] rounded-xl">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="age_20s">20-29</SelectItem>
          <SelectItem value="age_30s">30-39</SelectItem>
          <SelectItem value="age_40s">40-49</SelectItem>
          <SelectItem value="age_50s">50-59</SelectItem>
          <SelectItem value="age_60s">60+</SelectItem>
        </SelectContent>
      </Select>
    </main>
  );
}
