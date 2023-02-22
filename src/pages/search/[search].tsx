import Head from 'next/head';
import { fetchQueryMovies } from '@/utils/requests';
import Movies from '@/components/movies/Movies';
import { Movie, ResultsMovies } from 'types';
import Heading from '@/components/ui/Heading';
import React, { Fragment, useEffect, useRef } from 'react';
import useInfinityFetch from '@/hooks/useInfinityFetch';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Search() {
  const {
    query: { search },
  } = useRouter();

  const { data, isLoading, isError, error, refetch } = useQuery<any, Error>(
    ['searchedMovies'],
    () => fetchQueryMovies(search),
    {
      select: data => {
        const transformedData = data.data?.results.map((data: Movie) => data);
        return transformedData;
      },
    }
  );

  useEffect(() => {
    if (search) refetch();
  }, [refetch, search]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <h2>{error?.message} </h2>;
  }

  return (
    <>
      <Head>
        <title>New movies</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="z-20">
        <div className="px-10 py-8">
          <Heading>Searched movies</Heading>
        </div>
        <div className="flex flex-wrap gap-10 items-center justify-center">
          {data?.map((movieNow: Movie) => (
            <Movies type={'movie'} key={movieNow.id} movieNow={movieNow} />
          ))}

          {data?.length === 0 ? (
            <p className="text-3xl text-white/90 font-semibold z-10">
              Searched movie of {search} is not found!
            </p>
          ) : (
            ''
          )}
        </div>
      </section>
    </>
  );
}
