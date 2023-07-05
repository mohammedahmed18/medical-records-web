import { motion } from 'framer-motion';

import Layout from '@components/layout';
import Seo from '@components/Seo';

import protectedRoute from '@/components/common/protectedRoute';

const SeoInfo = () => <Seo templateTitle='Home' />;
function HomePage() {
  return (
    <Layout>
      <div className='flex h-screen'>
        <div className='flex w-1/2 items-center justify-end overflow-hidden bg-primary-50/20 px-4'>
          {/* <div className=' flex flex-col overflow-hidden'> */}
          <div className='sticky right-0 bottom-1/2 self-end overflow-hidden px-5'>
            <motion.p
              className='font-primary text-2xl lg:text-5xl'
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ y: '0', opacity: 1 }}
              transition={{
                type: 'spring',
                damping: 20,
                duration: 300,
              }}
            >
              Electronic
            </motion.p>
            <motion.h1
              className='text-7xl lg:text-9xl'
              initial={{ opacity: 0, x: '100%' }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                damping: 20,
                duration: 800,
              }}
            >
              Medical
            </motion.h1>
          </div>
        </div>
        <div className='relative flex w-1/2 items-center overflow-hidden bg-primary-500 px-4'>
          <motion.p
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              damping: 20,
              duration: 800,
            }}
            className='text-7xl font-bold text-white lg:text-9xl'
          >
            Records
          </motion.p>
        </div>
      </div>
    </Layout>
  );
}

export default protectedRoute(HomePage, {
  Seo: SeoInfo,
});
