'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { postKakaoLogin } from '@/lib/api/auth';
import Header from '@components/common/Header';
import UserInformationForm from '@components/onboarding/information/UserInformationForm';
import toast from 'react-hot-toast';

export default function OnboardingInformationWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  console.log('code', code, 'state', state);

  const [isNewUser, setIsNewUser] = useState(false);
  const [providerId, setProviderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!code || !state) return;

    const handleLogin = async () => {
      try {
        const response = await postKakaoLogin({ code, state });

        if (response.code === 'USER_NOT_REGISTERED') {
          setProviderId(response.data.providerId);
          setIsNewUser(true);
        } else if (response.code === 'USER_ALREADY_REGISTERED') {
          router.replace('/home');
        } else if (response.code === 'OAUTH_STATE_INVALID') {
          toast.error('잘못된 접근입니다.');
          router.replace('/not-found');
        } else if (response.code === 'RATE_LIMIT') {
          toast.error('로그인 요청 제한에 걸렸습니다. 잠시 후 다시 시도해주세요.');
          router.replace('/login');
        } else {
          router.replace('/not-found');
          toast.error('잘못된 접근입니다.');
          throw new Error('알 수 없는 응답입니다.');
        }
      } catch (error) {
        console.error('postKakaoLogin 오류:', error);
        toast.error('로그인 처리 중 문제가 발생했습니다.');
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    handleLogin();
  }, [code, state]);
  if (loading) return null;

  return (
    <>
      {isNewUser && providerId && (
        <>
          <Header title="개인정보 입력" showBackButton={true} showNotificationButton={false} />
          <main className="overflow-y-auto p-4">
            <UserInformationForm providerId={providerId} />
          </main>
        </>
      )}
    </>
  );
}
