'use client';

import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@components/ui/button';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';

import ProfileImageSelector from '@components/onboarding/information/ProfileImageSelector';
// import EmailInputSection from '@components/onboarding/information/EmailInputSection';
import GenderSelectGroup from '@components/onboarding/information/GenderSelectGroup';
import RandomNicknameButton from '@components/onboarding/information/RandomNicknameButton';
import OneLineIntroductionInput from '@components/onboarding/information/OneLineIntroductionInput';
// import MatchingAgreementToggleGroup from '@components/onboarding/information/MatchingAgreementToggleGroup';
import AgeGroupSelector from './AgeGroupSelector';
import { postRegisterUserInfo } from '@/lib/api/onboarding';
import type { RegisterUserRequest } from '@/lib/api/onboarding';

interface UserInformationFormProps {
  providerId: string;
}

export default function UserInformationForm({ providerId }: UserInformationFormProps) {
  const router = useRouter();

  const methods = useForm<RegisterUserRequest>({
    defaultValues: {
      providerId,
      provider: 'KAKAO',
      profileImage: '',
      email: '',
      nickname: '',
      ageGroup: 'AGE_20S',
      gender: undefined,
      oneLineIntroduction: '',
      isTest: false,
    },
  });

  const handleSubmit = methods.handleSubmit(async (data) => {
    try {
      const res = await postRegisterUserInfo(data);
      if (res.code === 'PROFILE_SAVED_SUCCESSFULLY') {
        localStorage.setItem('accessToken', res.data.accessToken);
        router.push('/onboarding/interests');
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ code?: string }>;
      const code = axiosError.response?.data?.code;

      if (code === 'DUPLICATE_NICKNAME') {
        toast.error('이미 사용중인 닉네임입니다. 다시 선택해주세요.');
        return;
      }

      toast.error('문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      router.replace('/login');
    }
  });

  return (
    <FormProvider {...methods}>
      <form className="space-y-10" onSubmit={handleSubmit}>
        <ProfileImageSelector />
        {/* <EmailInputSection onVerify={handleVerify} isVerified={isEmailVerified} /> */}
        <GenderSelectGroup />
        <AgeGroupSelector />
        <RandomNicknameButton />
        <OneLineIntroductionInput />
        {/* <MatchingAgreementToggleGroup /> */}
        <div className="mt-4 flex justify-center">
          <Button
            type="submit"
            className="mt-8 mb-4 w-full rounded-[8] bg-[var(--gray-400)] px-4 py-4 text-center text-sm font-semibold text-white"
          >
            다음으로
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
