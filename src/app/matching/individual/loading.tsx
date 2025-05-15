import Header from '@/components/layout/Header';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function Loading() {
  return (
    <>
      <Header title="튜닝 리스트" showBackButton={true} showNotificationButton={true} />
      <main className="flex h-[calc(100dvh-7rem)] w-full flex-col items-center justify-center gap-20 overflow-y-auto">
        <ScaleLoader />
        <p className="text-center font-medium">
          Still Tuning!
          <br /> 잠시만 기다려주세요
        </p>
      </main>
    </>
  );
}
