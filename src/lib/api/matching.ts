import axiosInstance from '@lib/axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface TuningKeywords {
  mbti: string;
  religion: string;
  smoking: string;
  drinking: string;
}

export interface TuningSameInterests {
  personality: string[];
  preferredPeople: string[];
  currentInterests: string[];
  favoriteFoods: string[];
  likedSports: string[];
  pets: string[];
  selfDevelopment: string[];
  hobbies: string[];
}

export interface TuningUser {
  userId: number;
  profileImage: string;
  nickname: string;
  gender: string;
  oneLineIntroduction: string;
  keywords: TuningKeywords;
  sameInterests: TuningSameInterests;
}

export interface GetTuningUserResponse {
  code: 'TUNING_SUCCESS';
  message: string;
  data: TuningUser;
}

export const getTuningUser = async (): Promise<GetTuningUserResponse> => {
  const response = await axiosInstance.get<GetTuningUserResponse>(`${BASE_URL}/v1/tuning`);
  return response.data;
};

export interface TuningSignalRequest {
  receiverUserId: number;
  message: string;
}

export interface TuningSignalResponse {
  code: string;
  message: string;
  data: { channelRoomId: number };
}

export const postTuningSignal = async (
  payload: TuningSignalRequest,
): Promise<TuningSignalResponse> => {
  const response = await axiosInstance.post(`${BASE_URL}/v1/tuning/signal`, payload);
  return response.data;
};

interface SendSignalRequest {
  receiverUserId: number;
  message: string;
}

interface SendSignalResponse {
  code: string;
  message: string;
  data: {
    channelRoomId: number;
  };
}

export const postSignal = async (payload: SendSignalRequest): Promise<SendSignalResponse> => {
  const response = await axiosInstance.post(`${BASE_URL}/v1/tuning/signal`, payload);
  return response.data;
};
