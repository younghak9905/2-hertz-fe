import MaintenanceNotice from '@/components/common/MaintenanceNotice';
import Header from '@/components/layout/Header';

export default function MyPage() {
  return (
    <>
      <Header title="마이페이지" showBackButton={false} showNotificationButton={true} />
      <MaintenanceNotice />
    </>
  );
}
