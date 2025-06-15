import axiosInstance from '@/lib/axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface GetUserInfoResponse {
  code: string;
  message: string;
  data: {
    profileImage: string;
    nickname: string;
    gender: '남성' | '여성';
    oneLineIntroduction: string;
    relationType: 'ME' | 'SIGNAL' | 'MATCHING';
    keywords: {
      mbti: string;
      religion: string;
      smoking: string;
      drinking: string;
    };
    sameInterests: {
      personality: string[];
      preferredPeople: string[];
      currentInterests: string[];
      favoriteFoods: string[];
      likedSports: string[];
      pets: string[];
      selfDevelopment: string[];
      hobbies: string[];
    };
    interests: {
      personality: string[];
      preferredPeople: string[];
      currentInterests: string[];
      favoriteFoods: string[];
      likedSports: string[];
      pets: string[];
      selfDevelopment: string[];
      hobbies: string[];
    };
  };
}

export const getUserInfo = async (userId: string): Promise<GetUserInfoResponse> => {
  const response = await axiosInstance.get<GetUserInfoResponse>(`${BASE_URL}/v2/users/${userId}`);
  return response.data;
};
