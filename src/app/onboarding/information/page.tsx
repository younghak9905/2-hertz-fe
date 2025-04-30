import Header from '@components/common/Header';
import UserInformationForm from '@components/onboarding/information/UserInformationForm';

export default function OnboardingInformationPage() {
  return (
    <>
      <Header title="개인정보 입력" showBackButton={true} showNotificationButton={false} />
      <main className="overflow-y-auto p-4">
        <UserInformationForm />
      </main>
    </>
  );
}
