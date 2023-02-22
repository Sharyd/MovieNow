import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const LoadingSpinner = () => {
  return (
    <div className="toCenter ">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#2dd4bf"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;
