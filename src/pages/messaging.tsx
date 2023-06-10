import * as React from 'react';
import { useQuery } from 'react-query';

import { ProtectedRoute } from '@components/common/protectedRoute';
import Layout from '@components/layout';
import Seo from '@components/Seo';

import { getMyRooms } from '@/api/messaging';
import ChatView from '@/components/messaging/ChatView';
import RoomsList from '@/components/messaging/RoomsList';
import { GET_MY_ROOMS } from '@/constant/queryKeys';
import { useAuth } from '@/contexts/authContext';

function MessagingPage() {
  const { isAnonymous } = useAuth();

  const {
    data: rooms,
    refetch: fetcRooms,
    status,
  } = useQuery([GET_MY_ROOMS], getMyRooms, {
    keepPreviousData: true,
    enabled: false,
  });
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
          <div className='mx-7 flex flex-col shadow-lg md:flex-row'>
            <div className='h-[84vh] w-full overflow-auto px-4 py-7 shadow-lg md:w-1/3 lg:w-1/4'>
              <RoomsList rooms={finalRooms} status={status} />
            </div>
            <div className='flex h-[84vh] flex-1 flex-col justify-between  overflow-y-auto overflow-x-hidden'>
              <ChatView />
            </div>
          </div>
        </ProtectedRoute>
      </main>
    </Layout>
  );
}

export default MessagingPage;
