import { RoomMessageType } from '@/api/messaging';
import { PublicUserInfo } from '@/api/users';
import UserProfileImage from '@/components/common/UserProfileImage';
import LongText from '@/components/LongText';
import Messages from '@/components/messaging/Messages';
import SendMessageInput from '@/components/messaging/SendMessageInput';

import StethoScopeIcon from '~/svg/stethoscope-icon.svg';
type Props = {
  otherUser: PublicUserInfo;
  messages: RoomMessageType[];
  privateChat?: boolean;
};
const ChatView = ({ otherUser, messages, privateChat }: Props) => {
  const { image_src, medicalSpecialization, name, id } = otherUser;

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
      {privateChat && (
        <div className='bg-base-300 py-4 px-3 text-2xl leading-relaxed shadow-lg'>
          This is your space. Draft messages, make to-do lists or keep links to
          hand. You can also talk to yourself here, but please bear in mind
          you'll have to provide both sides of the conversation.
        </div>
      )}
      <Messages messages={messages} />
      <SendMessageInput otherUserId={id} />
    </div>
  );
};

export default ChatView;
