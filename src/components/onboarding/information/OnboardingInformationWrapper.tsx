'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { postKakaoLogin } from '@/lib/api/auth';
import Header from '@/components/layout/Header';
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

    // 새로고침 또는 뒤로 가기로 돌아온 경우, providerId가 세션스토리지에 저장되어 있다면
    // 추가 API 요청 없이 바로 신규 유저로 간주하여 다음 단계로 이동
    const saved = sessionStorage.getItem('providerId');
    if (saved) {
      setProviderId(saved);
      setIsNewUser(true);
      setLoading(false);
      return;
    }

    const handleLogin = async () => {
      try {
        const response = await postKakaoLogin({ code, state });

        if (response.code === 'USER_NOT_REGISTERED') {
          sessionStorage.setItem('providerId', response.data.providerId);
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
        <div className="flex flex-col">
          <Header title="개인정보 입력" showBackButton={true} showNotificationButton={false} />
          <main className="flex-grow overflow-y-auto p-4">
            <UserInformationForm providerId={providerId} />
          </main>
        </div>
      )}
    </>
  );
}
