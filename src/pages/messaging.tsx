import { useRouter } from 'next/router';
import * as React from 'react';
import { useQuery } from 'react-query';

import { ProtectedRoute } from '@components/common/protectedRoute';
import Layout from '@components/layout';
import Seo from '@components/Seo';

import { getMessagesWithOtherUser, getMyRooms } from '@/api/messaging';
import ChatView from '@/components/messaging/ChatView';
import RoomsList from '@/components/messaging/RoomsList';
import { GET_MY_ROOMS, ROOM_MESSAGES } from '@/constant/queryKeys';
import { useAuth } from '@/contexts/authContext';

function MessagingPage() {
  const router = useRouter();
  const { isAnonymous } = useAuth();
  const { u: userId } = router.query;

  const { data, refetch: fetcMessages } = useQuery(
    [ROOM_MESSAGES, userId],
    () => getMessagesWithOtherUser(userId?.toString()),
    { enabled: false, keepPreviousData: false }
  );

  const { data: rooms, refetch: fetcRooms } = useQuery(
    [GET_MY_ROOMS],
    getMyRooms,
    {
      keepPreviousData: true,
      enabled: false,
    }
  );
  React.useEffect(() => {
    if (isAnonymous) return;
    fetcRooms();
  }, [fetcRooms, isAnonymous]);

  React.useEffect(() => {
    if (isAnonymous || !userId) return;
    // TODO: in the backend make it one call
    fetcMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnonymous, userId]);

  const { otherUser, messages } = data
    ? data
    : { messages: [], otherUser: null };
  const finalRooms = rooms || [];
  return (
    <Layout>
      <Seo templateTitle='Messages' />

      <main>
        <ProtectedRoute>
          <div className='mx-7 flex shadow-lg'>
            <div className='h-[84vh] w-1/2 overflow-auto px-4 py-7 shadow-lg lg:w-1/4'>
              <RoomsList rooms={finalRooms} />
            </div>
            <div className='h-[84vh] flex-1 overflow-auto'>
              {otherUser && (
                <ChatView
                  otherUser={otherUser}
                  messages={messages || []}
                  privateChat={data?.isPrivateChat}
                />
              )}
            </div>
          </div>
        </ProtectedRoute>
      </main>
    </Layout>
  );
}

export default MessagingPage;
