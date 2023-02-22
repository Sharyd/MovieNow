import { genresMovies, genresTVseries } from '@/utils/dataGenres';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface genreType {
  name: string;
  id: string | null;
}
interface Props {
  type: string;
}

const Options = ({ type }: Props) => {
  const [genre, setGenre] = useState<null | string>(null);
  const router = useRouter();

  useEffect(() => {
    if (!genre) return;
    const splitNameAndId = genre.split(' ');
    router.push(`/genres/${splitNameAndId[1]}/${splitNameAndId[0]}${type}`);
  }, [genre]);

  return (
    <fieldset className="flex flex-col gap-2">
      <label
        htmlFor="countries"
        className="block w-full text-md font-medium textWhiteColor"
      >
        {type === 'movie' ? 'Select movie genres' : 'Select TVShow genres'}
      </label>
      <select
        id="countries"
        onChange={e => setGenre(e.target.value)}
        className="secondaryColor border border-gray-300 textWhiteColor text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
      >
        <option selected>Choose a genre</option>
        {(type === 'movie' ? genresMovies : genresTVseries).map(
          (genre: { name: string; id: number }, idx: number) => (
            <option value={genre.name + ' ' + genre.id} key={genre.id + idx}>
              {genre.name}
            </option>
          )
        )}
      </select>
    </fieldset>
  );
};

export default Options;
