import Head from 'next/head';
import { fetchTopRatedMovies, Identificator } from '@/utils/requests';
import React, { useRef, useState } from 'react';
import useInfinityFetch from '@/hooks/useInfinityFetch';
import Section from '@/components/movies/Section';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Popular() {
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
    'popularInfiniteMovies',
    loadMoreButtonRef,
    fetchTopRatedMovies
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
        <title>Popular movies</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section {...values} type={movieType} />
    </>
  );
}
