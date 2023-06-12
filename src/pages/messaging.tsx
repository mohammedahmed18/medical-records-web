import * as React from 'react';

import protectedRoute from '@/components/common/protectedRoute';
import Layout from '@/components/layout';
import ChatView from '@/components/messaging/ChatView';
import RoomsList from '@/components/messaging/RoomsList';
import Seo from '@/components/Seo';

function MessagingPage() {
  return (
    <Layout>
      <div className='mx-7 flex flex-col shadow-lg md:flex-row'>
        <div className='h-[84vh] w-full overflow-auto px-4 py-7 shadow-lg md:w-1/3 lg:w-1/4'>
          <RoomsList />
        </div>
        <div className='flex h-screen flex-col justify-between overflow-y-auto overflow-x-hidden md:h-[84vh] md:flex-1'>
          <ChatView />
        </div>
      </div>
    </Layout>
  );
}

const SeoInfo = () => <Seo templateTitle='Messaging' />;
export default protectedRoute(MessagingPage, {
  Seo: SeoInfo,
});
