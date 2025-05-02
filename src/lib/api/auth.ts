const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getKakaoRedirect = () => {
  window.location.href = `${BASE_URL}/v1/oauth/kakao/redirection`;
};