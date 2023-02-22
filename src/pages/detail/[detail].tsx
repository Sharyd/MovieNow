import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import { fetchMovieDetail, fetchTVDetail } from '@/utils/requests';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AiFillStar, AiFillHeart } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import classes from '../../styles/infiniteMove.module.css';
import Quote from '@/components/ui/Quote';
import { useModal } from '@/store/modal-context';
import Trailer from '@/components/movies/Trailer';
import Modal from '@/components/ui/Modal';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const MovieDetail = () => {
  const [trailer, setTrailer] = useState('');
  const { setOpenModal, openModal } = useModal();
  const {
    query: { detail },
  } = useRouter();

  const {
    data: movie,
    isError,
    error,
    isLoading,
  }: any = useQuery(
    ['movie', detail],
    detail?.includes('movie') ? fetchMovieDetail : fetchTVDetail
  );

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const dataTrailer = await fetch(
        `https://api.themoviedb.org/3/${
          movie.data?.media_type === 'tv' ? 'tv' : 'movie'
        }/${detail}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then(response => response.json());
      if (dataTrailer?.videos) {
        const index = dataTrailer.videos.results.findIndex(
          (element: { type: string }) => element.type === 'Trailer'
        );
        setTrailer(dataTrailer.videos?.results[index]?.key);
      }
    }

    fetchMovie();
  }, [movie, detail]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <h2 className="error">{error?.message}</h2>;
  }
  return (
    <div className="z-10 mt-10 md:w-[90%] m-auto text-white/90">
      <div className="flex flex-col gap-6 md:flex-row items-start md:items-center justify-between text-lg">
        <Heading>{movie.data.title}</Heading>
        <div className="flex justify-center flex-col m-auto md:flex-row md:m-0 items-center gap-10">
          <div className="flex justify-center items-center flex-col">
            <p className="font-semibold">Rating</p>
            <div className="flex justify-center items-center gap-2">
              <AiFillStar className="w-6 h-6 text-yellow-500" />
              <span>{movie.data.vote_average.toFixed(2)} / 10</span>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col">
            <p className="font-semibold">Popularity</p>
            <div className="flex justify-center items-center gap-2">
              <AiFillHeart className="w-6 h-6 text-red-500" />
              <span>{Math.round(movie.data.popularity)} (likes)</span>
            </div>
          </div>
          <div>
            <p className="flex flex-col items-center font-semibold">
              Original language{' '}
              <span className="uppercase">{movie.data.original_language}</span>{' '}
            </p>
          </div>
        </div>
      </div>
      <motion.img
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-6 brightness-[0.8]"
        src={`https://image.tmdb.org/t/p/original${
          movie.data.backdrop_path || movie.data.poster_path
        }`}
        alt={movie.data.title}
      />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 items-end justify-between md:items-center">
            <div className="flex flex-wrap gap-4">
              {movie?.data?.genres?.map(
                (genre: { name: string; id: string }) => (
                  <Button
                    onClick={() =>
                      router.push(
                        `/genres/${genre.id}/${
                          genre.name.toLowerCase() + detail
                        }`
                      )
                    }
                    key={genre.id}
                  >
                    {genre.name}
                  </Button>
                )
              )}
            </div>
            <div className="flex flex-col items-center p-2">
              <p className="font-semibold">Release date</p>
              <time>{movie.data.release_date}</time>
            </div>
          </div>
          <p className="font-semibold">Overview</p>
          <p>{movie.data.overview}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">Trailer</p>
          <div className="flex items-center gap-10 ">
            <div
              onClick={() => setOpenModal(true)}
              className="relative cursor-pointer brightness-[0.75] hover:brightness-[0.9]  "
            >
              <FaPlay className="w-10 h-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2" />
              <img
                className="py-6 group transition-all"
                src={`https://image.tmdb.org/t/p/w400${
                  movie.data.backdrop_path || movie.data.poster_path
                }`}
                alt={movie.data.title}
              />
            </div>
            <blockquote className="text-xl italic font-semibold text-gray-400 ">
              <Quote />
              <p>{movie.data.tagline}</p>
            </blockquote>
          </div>
        </div>
        <div className="flex flex-col gap-0  relative h-[18rem] overflow-hidden">
          <p className="font-semibold">Producation companies</p>
          <div
            className={`bottom-0 left-0 absolute ${classes['infinite-move']} flex gap-6 mt-10 justify-between`}
          >
            {movie.data.production_companies.map(
              (company: {
                id: number;
                logo_path: string;
                name: string;
                origin_county: string;
              }) => (
                <div key={company.id}>
                  <div className={`flex w-full gap-2  flex-col`}>
                    <div className="">
                      <img
                        className=""
                        src={
                          'https://image.tmdb.org/t/p/w154' + company.logo_path
                        }
                        alt="logo"
                      />
                    </div>
                    <p className="font-semibold">{company.name}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {openModal ? (
          <Modal setOpenModal={setOpenModal}>
            <Trailer trailer={trailer} />
          </Modal>
        ) : (
          ''
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieDetail;
