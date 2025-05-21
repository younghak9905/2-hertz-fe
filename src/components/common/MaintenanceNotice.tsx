import Image from 'next/image';

export default function MaintenanceNotice() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-10 text-sm">
      <Image src="/images/sorry.png" alt="프로필 이미지" width={80} height={100} />
      <p className="mt-4 text-[16px] font-semibold">해당 페이지는 준비 중입니다</p>
      <p className="text-center font-medium text-[var(--gray-300)]">
        빠른 시일 내에 이용하실 수 있도록
        <br /> 준비하고 있으니 조금만 기다려 주세요!
      </p>
    </div>
  );
}
