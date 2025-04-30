'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function EmailInputSection() {
  return (
    <main className="space-y-4 px-2">
      <p className="font-semibold">기업 및 교육기관용 이메일을 입력해주세요</p>
      <div className="flex gap-4">
        <Input
          type="email"
          placeholder="tuning@hertz.com"
          className="h-11 rounded-[6px] border-none bg-gray-100 text-sm placeholder:text-sm"
        />
        <Button type="submit" className="h-11 rounded-[6px] bg-gray-500">
          인증 요청
        </Button>
      </div>
    </main>
  );
}
