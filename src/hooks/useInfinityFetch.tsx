import React, { RefObject, useEffect } from 'react';
import { QueryFunction, QueryKey, useInfiniteQuery } from 'react-query';
import { infiniteType } from 'types';
import { Movie } from '../../types';
const useInfinityFetch = (
  queryString: string,
  loadMoreButtonRef: RefObject<HTMLButtonElement>,
  fetchFunction: QueryFunction<infiniteType, QueryKey>
) => {
  const {
    refetch,
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<infiniteType, Error>([queryString], fetchFunction, {
    getNextPageParam: lastPage => {
      if (!lastPage.data) return;
      const { page, total_pages: totalPages } = lastPage.data;
      return page < totalPages ? page + 1 : undefined;
    },
  });

  useEffect(() => {
    if (!hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(entries =>
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      })
    );
    const el = loadMoreButtonRef && loadMoreButtonRef.current;
    if (!el) {
      return;
    }
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [loadMoreButtonRef.current, hasNextPage]);

  return {
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isFetchingNextPage,
    refetch,
  };
};

export default useInfinityFetch;
