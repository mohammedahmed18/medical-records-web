import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
// import '@/styles/colors.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { GRAPHQL_URL } from '@/api/axios';
import Navbar from '@/components/navbar';
import { isProd } from '@/constant/env';
import { AuthProvider } from '@/contexts/authContext';

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  credentials: 'include',
});

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: GRAPHQL_URL.replace('https', 'wss').replace('http', 'ws'),
        })
      )
    : null;

const splitLink =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query);
          return (
            def.kind === 'OperationDefinition' &&
            def.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */
// the two client must be at the top level of the file
// and not inside a compoenent
const graphqlClient = new ApolloClient({
  link: splitLink,
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
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleStart = (_url: string) => {
      setPageLoading(true);
    };

    const handleComplete = (_url: string) => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ApolloProvider client={graphqlClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastContainer />
          <Navbar loading={pageLoading} />
          <Component {...pageProps} />
          {!isProd && <ReactQueryDevtools />}
        </AuthProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
