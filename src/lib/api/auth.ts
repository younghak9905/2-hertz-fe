import axios from '@lib/axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getKakaoRedirect = () => {
  window.location.href = `${BASE_URL}/v1/oauth/kakao/redirection`;
};

export const postKakaoLogin = async ({ code, state }: { code: string; state: string }) => {
  const res = await axios.post(
    `${BASE_URL}/v1/oauth/kakao`,
    { code, state },
    { withCredentials: true },
  );
  return res.data;
};
