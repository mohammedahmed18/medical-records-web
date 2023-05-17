import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

import { RoomMessageType } from '@/api/messaging';
import IconButton from '@/components/IconButton';
import { ROOM_MESSAGES } from '@/constant/queryKeys';
import { SEND_MESSAGE } from '@/graphql/messages';

import MessageIcon from '~/svg/send-message-icon.svg';
type Props = {
  otherUserId: string;
};
const SendMessageInput = ({ otherUserId }: Props) => {
  const [messageText, setMessageText] = useState('');
  const queryCache = useQueryClient();

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) => {
      const { sendMessage: newMessage } = data;

      const _updater = (prevMessages: RoomMessageType[] | undefined) => {
        const previousMessages = prevMessages || [];
        return [
          ...previousMessages,
          { ...newMessage, isMe: true, createdAt: new Date() },
        ];
      };

      queryCache.setQueryData([ROOM_MESSAGES, otherUserId], _updater);
    },
  });

  const handleSendMessage = () => {
    if (messageText.trim() == '') return;
    sendMessage({ variables: { value: messageText, toId: otherUserId } });
  };
  return (
    <div className='mx-7 mb-3 flex items-center gap-5 overflow-hidden rounded-2xl p-3'>
      <input
        className='w-full
         border-b-2 
         border-primary-200
          bg-transparent py-4 text-3xl
          outline-none
          '
        type='text'
        placeholder='type your message...'
        onChange={(e) => setMessageText(e.target.value)}
      />
      <span
        className='cursor-pointer rounded  fill-gray-700 p-3 text-4xl'
        onClick={handleSendMessage}
      >
        <IconButton Icon={MessageIcon} className='shadow-md' />
        {/* <MessageIcon /> */}
      </span>
    </div>
  );
};

export default SendMessageInput;
