import Head from 'next/head';
import { Inter } from '@next/font/google';
import { fetchNowPlayingMovies, Identificator } from '@/utils/requests';
import Movies from '@/components/movies/Movies';

import Heading from '@/components/ui/Heading';
import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useInfinityFetch from '@/hooks/useInfinityFetch';
import Section from '@/components/movies/Section';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);
  const [movieType, _] = useState<Identificator>('movie');
  const {
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isFetchingNextPage,
  } = useInfinityFetch(
    'nowPlayingInfinite',
    loadMoreButtonRef,
    fetchNowPlayingMovies
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <h2>{error?.message} </h2>;
  }
  const values = {
    fetchNextPage,
    hasNextPage,
    data,
    isFetching,
    isFetchingNextPage,
    loadMoreButtonRef,
  };
  return (
    <>
      <Head>
        <title>Now playing</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section {...values} type={movieType} />
    </>
  );
}
