// import { OneLineIntroductionInput } from '@components/onboarding/information/OneLineIntroductionInput';
// import { AgeGroup } from './../../constants/enum';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface NicknameResponse {
  code: string;
  message: string;
  data: {
    nickname: string;
  };
}

export const getRandomNickname = async (): Promise<string> => {
  const response = await axios.get<NicknameResponse>(`${BASE_URL}/v1/nickname`);
  if (response.data.code === 'NICKNAME_CREATED') {
    return response.data.data.nickname;
  }
  throw new Error('닉네임 생성 실패');
};

export interface RegisterUserRequest {
  providerId: string;
  provider: 'KAKAO';
  profileImage: string;
  email: string;
  nickname: string;
  ageGroup: 'AGE_20S' | 'AGE_30S' | 'AGE_40S' | 'AGE_50S' | 'AGE_60_PLUS';
  gender: 'MALE' | 'FEMALE';
  oneLineIntroduction: string;
  isTest: true;
}

interface RegisterUserResponse {
  code: string;
  message: string;
  data: {
    userId: string;
    accessToken: string;
  };
}

export const postRegisterUserInfo = async (
  payload: RegisterUserRequest,
): Promise<RegisterUserResponse> => {
  const response = await axios.post(`${BASE_URL}/v1/users`, payload);
  return response.data;
};
