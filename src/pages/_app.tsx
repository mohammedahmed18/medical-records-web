import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import 'react-toastify/dist/ReactToastify.min.css';

import Layout from '@components/layout';
import Navbar from '@components/navbar';

import { SERVER_URL } from '@/api/axios';
import { isProd } from '@/constant/env';
import { AuthProvider } from '@/contexts/authContext';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */
// the two client must be at the top level of the file
// and not inside a compoenent
const graphqlClient = new ApolloClient({
  uri: SERVER_URL + '/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ApolloProvider client={graphqlClient}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <Navbar />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {!isProd && <ReactQueryDevtools />}
        </QueryClientProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default MyApp;
