import Layout from '@/components/layout/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ModalContextProvider from '../store/modal-context';
import { SessionProvider } from 'next-auth/react';
const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ModalContextProvider>
          <Layout>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </Layout>
        </ModalContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
