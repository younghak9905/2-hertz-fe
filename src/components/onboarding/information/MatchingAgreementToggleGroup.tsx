import { Switch } from '@/components/ui/switch';

export default function MatchingAgreementToggleGroup() {
  return (
    <main className="space-y-4 px-2">
      <p className="font-semibold">다른 사용자와 매칭 기능을 활성화하시겠어요?</p>
      <p className="text-xs leading-[1.2rem] text-[var(--gray-300)]">
        * 동의하면 다른 사용자로부터 매칭 요청을 받을 수 있어요. 동의하지 않을 경우 일부 서비스
        이용이 제한될 수 있습니다.
      </p>
      <div className="mt-6 flex items-center justify-center gap-10">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-black">친구</p> <Switch />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-black">연인</p> <Switch />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-black">밥친구</p> <Switch />
        </div>
      </div>
    </main>
  );
}

// RHF 연동 예정 (v3 기능)
