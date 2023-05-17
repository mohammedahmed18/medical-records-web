import * as React from 'react';
import { useQuery } from 'react-query';

import { ProtectedRoute } from '@components/common/protectedRoute';
import Layout from '@components/layout';
import Seo from '@components/Seo';

import { getMyRooms } from '@/api/messaging';
import ChatView from '@/components/messaging/ChatView';
import RoomsList from '@/components/messaging/RoomsList';
import SendMessageInput from '@/components/messaging/SendMessageInput';
import { GET_MY_ROOMS } from '@/constant/queryKeys';
import { useAuth } from '@/contexts/authContext';

function MessagingPage() {
  const { isAnonymous } = useAuth();

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
            <div className='flex h-[84vh] flex-1 flex-col justify-between overflow-auto'>
              <ChatView />
              <SendMessageInput />
            </div>
          </div>
        </ProtectedRoute>
      </main>
    </Layout>
  );
}

export default MessagingPage;
