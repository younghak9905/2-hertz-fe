import axiosInstance from '@lib/axios';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getKakaoRedirect = () => {
  window.location.href = `${BASE_URL}/v1/oauth/kakao/redirection`;
};

export const postKakaoLogin = async ({ code, state }: { code: string; state: string }) => {
  const res = await axiosInstance.post(
    `${BASE_URL}/v1/oauth/kakao`,
    { code, state },
    { withCredentials: true },
  );
  return res.data;
};

export interface AccessTokenReissueResponse {
  code: 'ACCESS_TOKEN_REISSUED';
  message: string;
  data: {
    accessToken: string;
  };
}

export interface RefreshTokenInvalidResponse {
  code: 'REFRESH_TOKEN_INVALID';
  message: string;
  data: null;
}

export const reissueAccessToken = async (): Promise<AccessTokenReissueResponse> => {
  console.log('🔁 Token reissue 요청 보냄');
  const response = await axios.post<AccessTokenReissueResponse>(
    `${BASE_URL}/v1/auth/token`,
    {},
    { withCredentials: true },
  );

  return response.data;
};
