import MaintenanceNotice from '@/components/common/MaintenanceNotice';
import Header from '@/components/layout/Header';

export default function ReportPage() {
  return (
    <>
      <Header title="튜닝 리포트" showBackButton={false} showNotificationButton={true} />
      <MaintenanceNotice />
    </>
  );
}
