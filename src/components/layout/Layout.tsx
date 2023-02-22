import Image from 'next/image';
import React, { ReactNode, useState } from 'react';
import SignIn from '../auth/SignIn';

import Modal from '../ui/Modal';
import movieBg from '../../../public/images/movie-bg.jpg';
import { SlArrowUp } from 'react-icons/sl';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollY from '@/hooks/useScrollY';
import { useRouter } from 'next/router';
import Options from './Options';
interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const activeRouter = router.pathname;
  const isNotDetailPage = activeRouter !== '/detail/[detail]';

  const { isScrolled } = useScrollY(1500);
  return (
    <div className="relative">
      <Navbar
        setOpenModal={setOpenModal}
        setMenuToggle={setMenuToggle}
        menuToggle={menuToggle}
      />
      <AnimatePresence>
        {openModal ? (
          <Modal setOpenModal={setOpenModal}>
            <SignIn />
          </Modal>
        ) : (
          ''
        )}
      </AnimatePresence>

      {isScrolled && (
        <a
          href="#"
          className="fixed bottom-20 right-10 highlightColor transition-all p-3 animate-bounce rounded-md cursor-pointer"
        >
          <SlArrowUp className="w-8 h-8 text-white " />
        </a>
      )}

      <div className="mainColor py-40">
        {isNotDetailPage && (
          <motion.div
            whileInView={{ x: [-100, 0], opacity: [0, 1], rotate: 45 }}
            transition={{ duration: 0.5 }}
            className="fixed z-1 h-screen -top-20 -left-[40rem] rotate-45 w-screen "
          >
            <Image
              src={movieBg}
              className="object-cover w-[70%] rounded-full brightness-[0.2]"
              alt="background image of movies"
            />
          </motion.div>
        )}
        <main
          onClick={() => {
            setMenuToggle(false);
          }}
          className="min-h-screen w-[80%] m-auto p-4 z-10 relative"
        >
          {isNotDetailPage && (
            <div className="flex items-center justify-center w-full gap-10">
              <div className="relative">
                <Options type="movie" />
              </div>
              <div className="relative">
                <Options type="tvShow" />
              </div>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
