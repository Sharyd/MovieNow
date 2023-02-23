import { Identificator } from '@/utils/requests';
import { motion } from 'framer-motion';
import React, { Fragment } from 'react';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from 'react-query';
import { Movie, PageType } from 'types';
import Heading from '../ui/Heading';
import Movies from './Movies';

interface Props {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<PageType, Error>>;
  hasNextPage: boolean | undefined;
  data: InfiniteData<PageType> | undefined;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  loadMoreButtonRef: React.RefObject<HTMLButtonElement>;
  type: Identificator;
}

const Section = ({
  fetchNextPage,
  hasNextPage,
  data,
  isFetching,
  isFetchingNextPage,
  loadMoreButtonRef,
  type,
}: Props) => {
  console.log(type);
  return (
    <section className="z-10">
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        whileInView={{ x: 60, opacity: 1 }}
        className="md:px-10 py-8"
      >
        <Heading>{type === 'movie' ? 'Movies' : 'TV Shows'}</Heading>
      </motion.div>
      <div className="flex flex-wrap gap-10 items-center justify-center">
        {data?.pages.map((page: any, idx) => (
          <Fragment key={idx}>
            {page.data.results.map((movieNow: Movie) => (
              <Movies type={type} key={movieNow.id} movieNow={movieNow} />
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
  );
};

export default Section;
