import UserPreferenceForm from '@/components/onboarding/interests/UserPreferenceForm';
import Header from '@/components/layout/Header';

export default function OnboardingInterestsPage() {
  return (
    <>
      <Header title="취향 선택하기" showBackButton={true} showNotificationButton={false} />
      <main className="overflow-y-auto p-4">
        <UserPreferenceForm />
      </main>
    </>
  );
}
