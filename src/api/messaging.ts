import { api } from '@/api/axios';
import { PublicUserInfo } from '@/api/users';

export type MedicalRecordKindType = 'text' | 'image' | 'medicalRecord';
export type RoomItemType = {
  id: string;
  isPrivate?: boolean;
  lastMessage: {
    id?: string;
    roomId?: string;
    type: MedicalRecordKindType;
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
  type: MedicalRecordKindType;
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
