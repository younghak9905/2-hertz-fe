import Header from '@/components/common/Header';

export default function Loading() {
  return (
    <>
      <Header title="개인정보 입력" showBackButton={true} showNotificationButton={true} />
      <main className="overflow-y-auto"></main>
    </>
  );
}
