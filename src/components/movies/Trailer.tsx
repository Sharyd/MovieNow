import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import {
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from '@heroicons/react/outline';
interface Props {
  trailer: string;
}

const Trailer = ({ trailer }: Props) => {
  const [muted, setMuted] = useState(true);
  console.log(trailer);
  return (
    <div className="relative pt-[56.25%] w-[350px] sm:w-[400px] md:w-[600px] lg:w-[800px]">
      {trailer === undefined ? (
        <p className="text-3xl text-gray-900 w-max absolute top-1/2 left-1/2 -translate-x-1/2">
          Video not found
        </p>
      ) : (
        <>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-6 w-6 text-black" />
                Play
              </button>
              <button className="modalButton">
                <PlusIcon className="h-7 w-7" />
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="h-6 w-6" />
              </button>
            </div>
            <button
              className="modalButton"
              onClick={() => setMuted(prev => !prev)}
            >
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />
              )}
            </button>
          </div>{' '}
        </>
      )}
    </div>
  );
};

export default Trailer;
