import Head from 'next/head';
import {
  fetchByGenreOfMovie,
  fetchByGenreOfTV,
  Identificator,
} from '@/utils/requests';
import Movies from '@/components/movies/Movies';

import Heading from '@/components/ui/Heading';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import useInfinityFetch from '@/hooks/useInfinityFetch';
import { useRouter } from 'next/router';
import { Movie } from 'types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Genres() {
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);
  const [movieType, x] = useState<Identificator>('movie');
  const [tvShowType, _] = useState<Identificator>('tvShow');

  const {
    query: { genres },
  } = useRouter();
  console.log(genres);
  const {
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isFetchingNextPage,
  } = useInfinityFetch(
    'genresInfiniteMovies',
    loadMoreButtonRef,
    ({ pageParam = 1 }) =>
      genres && genres[1]?.includes('movie')
        ? fetchByGenreOfMovie(pageParam, genres && genres[0])
        : fetchByGenreOfTV(pageParam, genres && genres[0])
  );

  useEffect(() => {
    if (genres) refetch();
  }, [genres]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <h2>{error?.message} </h2>;
  }
  return (
    <>
      <Head>
        <title>{genres}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="z-10">
        <div className="px-10 py-8 capitalize">
          <Heading>
            {/* Just some refactoring for dynamic heading text from query URL */}
            {genres && genres[1].includes('movie')
              ? genres && genres[1].replace('movie', '').replace(/[0-9]/g, '')
              : genres &&
                genres[1].replace('tvShow', '').replace(/[0-9]/g, '')}{' '}
            {genres && genres[1]?.includes('movie') ? 'Movies' : 'TVShow'}
          </Heading>
        </div>
        <div className="flex flex-wrap gap-10 items-center justify-center">
          {data?.pages.map((page, idx) => (
            <Fragment key={idx}>
              {page.data.results.map((movieNow: Movie) => (
                <Movies
                  type={
                    genres && genres[1]?.includes(movieType)
                      ? movieType
                      : tvShowType
                  }
                  key={movieNow.id}
                  movieNow={movieNow}
                />
              ))}
            </Fragment>
          ))}
        </div>
        <button
          ref={loadMoreButtonRef}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
        >
          Load more
        </button>
        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      </section>
    </>
  );
}