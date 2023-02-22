import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type modalProviderProps = {
  children: ReactNode;
};
type modalContextType = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const ModalContext = React.createContext({} as modalContextType);

export const useModal = () => {
  return useContext(ModalContext);
};

// Defining a simple HOC component
const ModalContextProvider = ({ children }: modalProviderProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ModalContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
