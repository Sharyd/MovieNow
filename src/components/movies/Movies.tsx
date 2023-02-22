import { AiFillStar } from 'react-icons/ai';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Movie } from 'types';

interface Props {
  movieNow: Movie;
  type: string;
}

const Movies = ({ movieNow, type }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="z-10 bg-[#334155] hover:scale-[1.02] text-white px-0 rounded-md shadow-md  hover:shadow-xl hover:border hover:border-teal-400   transition-all overflow-hidden "
    >
      <Link href={`/detail/${movieNow.id + type}`} className="">
        <div className="flex items-center justify-between relative ">
          <p className="p-2  font-semibold">
            {movieNow.title ? movieNow.title : movieNow.name}
          </p>
          <div className="flex gap-2 relative">
            <span className="font-semibold text-lg mr-8">
              {movieNow.vote_average.toFixed(1)}
            </span>
            <AiFillStar className="w-6 h-6 text-yellow-500 absolute -top-1 left-7" />
          </div>
        </div>
        <img
          className="w-full max-h-[14rem]"
          src={`https://image.tmdb.org/t/p/w400${
            movieNow.backdrop_path || movieNow.poster_path
          }`}
          alt={movieNow.title}
        />
      </Link>
    </motion.div>
  );
};

export default Movies;
