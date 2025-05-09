import axiosInstance from '@/lib/axios';

export interface ChannelRoom {
  channelRoomId: number;
  partnerProfileImage: string;
  partnerNickname: string;
  lastMessage: string;
  lastMessageTime: string;
  isRead: boolean;
  relationType: 'SIGNAL' | 'MATCHING';
}

export interface GetChannelRoomListResponse {
  code: string;
  message: string;
  data: {
    list: ChannelRoom[];
    pageNumber: number;
    pageSize: number;
    isLast: boolean;
  } | null;
}

export const getChannelRooms = async (page = 0, size = 10): Promise<GetChannelRoomListResponse> => {
  const response = await axiosInstance.get(`/v1/channel?page=${page}&size=${size}`);
  return response.data;
};
