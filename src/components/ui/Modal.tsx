import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { AnimatePresence, motion, spring } from 'framer-motion';
interface Props {
  children: ReactNode;
  setOpenModal?: Dispatch<SetStateAction<boolean>> | undefined;
}

const Modal = ({ children, setOpenModal }: Props) => {
  return (
    <div
      onClick={e => {
        if (!setOpenModal) return;
        setOpenModal(false);
      }}
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 "
    >
      <div
        onClick={() => {
          if (!setOpenModal) return;
          setOpenModal(false);
        }}
        className="absolute right-16 top-16 cursor-pointer"
      >
        <AiOutlineClose className="w-8 h-8 text-white/90 hover:scale-95 hover:text-white" />
      </div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="toCenter bg-white/80 p-12 rounded-lg flex flex-col gap-2"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
