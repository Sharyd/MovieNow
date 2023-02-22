import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Heading = ({ children }: Props) => {
  return (
    <h2 className="text-white/90 py-2 font-semibold text-4xl">{children}</h2>
  );
};

export default Heading;
