import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { HiOutlineMenu } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { AnimatePresence, motion } from 'framer-motion';
import useScrollY from '@/hooks/useScrollY';

interface Props {
  setMenuToggle: Dispatch<SetStateAction<boolean>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;

  menuToggle: boolean;
}

const hoverListClass =
  'after:hover:w-full after:hover:text-white after:hover:left-0 hover:text-white after:hover:absolute after:top-[1.8rem] md:after:top-[1.5rem]  after:hover:border-2 after:hover:color-white after:hover:animate-animated-line';
const activeListClass =
  'after:w-full after:text-white after:left-0 after:absolute after:top-[1.8rem] md:after:top-[1.5rem] after:border-2  after:color-white after:animate-animated-line';

const Navbar = ({ setMenuToggle, menuToggle, setOpenModal }: Props) => {
  const { data: session } = useSession();

  const router = useRouter();
  const activeRouter = router.pathname;
  const [query, setQuery] = useState('');
  const { isScrolled } = useScrollY(250);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() === '') return router.push(`/`);
    router.push(`/search/${query}`);
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className={` ${
        isScrolled ? 'fixed' : 'absolute'
      }  h-16 transition-all secondaryColor w-full shadow-xl z-20 `}
    >
      <nav className="transition-all relative flex items-center justify-between h-full px-6 py-4 textWhiteColor ">
        <div
          onClick={() => setMenuToggle(prev => !prev)}
          className="mainColor p-1.5 cursor-pointer rounded-md lg:hidden z-10"
        >
          {menuToggle ? (
            <AiOutlineClose className="w-5 h-5" />
          ) : (
            <HiOutlineMenu className="w-5 h-5" />
          )}
        </div>
        <AnimatePresence>
          {menuToggle ? (
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeIn' }}
              exit={{ opacity: 0 }}
              className="flex lg:hidden w-max absolute"
            >
              <div>
                <h2 className="absolute top-5 left-20 z-10 font-semibold text-teal-400">
                  MovieNow
                </h2>
              </div>
              <motion.ul
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.25, ease: 'easeIn' }}
                exit={{ opacity: 0, scale: 0.3 }}
                className={`h-[30rem] rounded-full w-[30rem] -top-40 -left-40 absolute bg-[rgba(51,65,85,0.90)] lg:hidden`}
              >
                <div className="absolute top-1/2 left-1/2 text-lg flex flex-col gap-2 ">
                  <li>
                    <Link
                      className={`${
                        activeRouter === '/'
                          ? 'text-white border-b-2 border-teal-500'
                          : ''
                      } hover:text-white`}
                      href="/"
                    >
                      News Movies
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        activeRouter === '/popular'
                          ? 'text-white border-b-2 border-teal-500'
                          : ''
                      } hover:text-white`}
                      href="/popular"
                    >
                      Top Rated Movies
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        activeRouter === '/popularSeries'
                          ? 'text-white border-b-2 border-teal-500'
                          : ''
                      } hover:text-white`}
                      href="/popularSeries"
                    >
                      Popular TVShows
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        activeRouter === '/topRatedSeries'
                          ? 'text-white border-b-2 border-teal-500'
                          : ''
                      } hover:text-white`}
                      href="/topRatedSeries"
                    >
                      Top TVShows
                    </Link>
                  </li>
                </div>
              </motion.ul>
            </motion.div>
          ) : (
            ''
          )}
        </AnimatePresence>

        <div>
          <h2 className="font-semibold text-teal-400 hidden lg:flex">
            MovieNow
          </h2>
        </div>
        <ul
          className={`
         items-center justify-center hidden gap-4 lg:flex`}
        >
          <li>
            <Link
              className={`hover:text-white ${
                activeRouter === '/'
                  ? 'text-white border-b-2 border-teal-500'
                  : ''
              }`}
              href="/"
            >
              News Movies
            </Link>
          </li>
          <li>
            <Link
              className={`hover:text-white ${
                activeRouter === '/popular'
                  ? 'text-white border-b-2 border-teal-500'
                  : ''
              }`}
              href="/popular"
            >
              Top Movies
            </Link>
          </li>
          <li>
            <Link
              className={`hover:text-white ${
                activeRouter === '/popularSeries'
                  ? 'text-white border-b-2 border-teal-500'
                  : ''
              }`}
              href="/popularSeries"
            >
              Popular TVShows
            </Link>
          </li>
          <li>
            <Link
              className={`${
                activeRouter === '/topRatedSeries'
                  ? 'text-white border-b-2 border-teal-500'
                  : ''
              } hover:text-white`}
              href="/topRatedSeries"
            >
              Top TVShows
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-4 lg:relative">
          <label className="flex gap-2" htmlFor="search">
            <div className="bg-[#1f2937] p-1.5 rounded-md cursor-pointer focus:p-2">
              <FiSearch className="w-5 h-5" />
            </div>
            <form onSubmit={e => submitSearch(e)}>
              <input
                id="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                type="text"
                placeholder="Search"
                className="w-[11rem] md:focus:w-[20rem] transition-all duration-300 py-1 px-2 text-gray-900 border-none border-gray-300 rounded-lg bg-gray-50  focus:outline-none focus:ring-teal-400 focus:border-teal-400"
              />
            </form>
          </label>
        </div>

        <div className="flex items-center gap-4">
          <div onClick={() => setOpenModal(true)}>
            {!session ? (
              <Button>Sign In</Button>
            ) : (
              <div className="flex items-center gap-2 cursor-pointer ">
                <p className="hidden sm:block font-semibold">
                  {session?.user?.name ?? ''}
                </p>
                <div className="highlightColor rounded-full w-11 h-11 flex items-center justify-center">
                  <img
                    className="rounded-full w-10 h-10 hover:w-9 hover:h-9 object-cover transition-all"
                    src={session?.user?.image ?? ''}
                    alt={'user-profile'}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
