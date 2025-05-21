import Header from '@/components/layout/Header';

export default function MyPage() {
  return (
    <>
      <Header title="마이페이지" showBackButton={false} showNotificationButton={true} />
      <div className="flex h-full w-full items-center justify-center text-sm">
        이 기능은 곧 업데이트 될 예정이에요 🚀
      </div>
    </>
  );
}
