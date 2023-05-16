import { RoomMessageType } from '@/api/messaging';
import { PublicUserInfo } from '@/api/users';
import UserProfileImage from '@/components/common/UserProfileImage';
import LongText from '@/components/LongText';
import Messages from '@/components/messaging/Messages';
import SendMessageInput from '@/components/messaging/SendMessageInput';
import { useAuth } from '@/contexts/authContext';

import StethoScopeIcon from '~/svg/stethoscope-icon.svg';
type Props = {
  otherUser: PublicUserInfo;
  messages: RoomMessageType[];
};
const ChatView = ({ otherUser, messages }: Props) => {
  const { image_src, medicalSpecialization, name, id } = otherUser;
  const {
    user: { id: currentId },
  } = useAuth();
  const privateChat = currentId === id;
  return (
    <div className='flex h-full flex-col justify-between'>
      {/* other user info */}
      <div className='flex items-center gap-4 py-4 shadow-lg'>
        {/* image */}
        <UserProfileImage rounded src={image_src} size={50} />

        {/* name and medical specialization */}
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <LongText text={name} maxChars={50} className='text-3xl' />
            {privateChat && (
              <span className='mx-4 rounded-lg bg-primary-200 px-2 text-lg text-white'>
                Message yourself
              </span>
            )}
          </div>
          {medicalSpecialization && (
            <div className='flex items-center gap-3 fill-gray-500 text-2xl text-gray-500'>
              <StethoScopeIcon />
              <span>{medicalSpecialization}</span>
            </div>
          )}
        </div>
      </div>

      <Messages messages={messages} />
      <SendMessageInput otherUserId={id} />
    </div>
  );
};

export default ChatView;
