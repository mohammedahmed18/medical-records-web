import { api } from '@/api/axios';
import { PublicUserInfo } from '@/api/users';

export type RoomItemType = {
  id: string;
  isPrivate?: boolean;
  lastMessage: {
    id?: string;
    roomId?: string;
    type: 'text' | 'image' | 'medicalRecord';
    value: string;
    senderId?: string; // not used I think
    createdAt: string;
    isMe: boolean;
  };
  lastMessageTimestamp: string;
  otherUser: {
    id: string;
    image_src: string;
    name: string;
  };
};

export type RoomMessageType = {
  id?: string;
  roomId?: string;
  type: string;
  value: string;
  senderId?: string;
  createdAt: Date;
  isMe: boolean;
};

export type MessageResponse = {
  isPrivateChat: boolean;
  otherUser?: PublicUserInfo;
  messages: RoomMessageType[];
};
export const getMyRooms = (): Promise<RoomItemType[]> => {
  return api.get<RoomItemType[]>('/chat/rooms').then((res) => res.data);
};

export const getMessagesWithOtherUser = async (
  otherUserId: string | undefined
): Promise<MessageResponse> => {
  // await sleep(5000)
  return api
    .get<MessageResponse>('/chat/room-messages/' + otherUserId)
    .then((res) => res.data);
};
