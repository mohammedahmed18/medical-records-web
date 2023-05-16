import { api } from '@/api/axios';

export type RoomItemType = {
  id: string;
  lastMessage: {
    id: string;
    roomId: string;
    type: 'text' | 'image' | 'medicalRecord';
    value: string;
    senderId: string;
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
  id: string;
  roomId: string;
  type: string;
  value: string;
  senderId: string;
  createdAt: string;
  isMe: boolean;
};

export const getMyRooms = (): Promise<RoomItemType[]> => {
  return api.get<RoomItemType[]>('/chat/rooms').then((res) => res.data);
};

export const getMessagesWithOtherUser = (
  otherUserId: string | undefined
): Promise<RoomMessageType[]> => {
  return api
    .get<RoomMessageType[]>('/chat/room-messages/' + otherUserId)
    .then((res) => res.data);
};
