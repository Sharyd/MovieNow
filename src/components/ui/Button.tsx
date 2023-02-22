import React, { forwardRef, ReactNode, ReactPropTypes } from 'react';

interface Props {
  children: ReactNode;
  type?: string;

  onClick?: () => {};
}

const Button = ({ children, type, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      type={`${type === 'submit' ? 'submit' : 'button'}`}
      className="px-5 py-2.5 relative rounded  group text-white font-medium"
    >
      <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm highlightColor"></span>
      <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 filter group-active:opacity-0 rounded opacity-50 highlightColor "></span>
      <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xlfilter group-active:opacity-0 group-hover:blur-sm highlightColor "></span>
      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded highlightColor "></span>
      <span className="relative">{children}</span>
    </button>
  );
};

export default Button;
