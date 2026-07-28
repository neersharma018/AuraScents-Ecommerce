import React from 'react';

const Toast: React.FC = () => {
  return (
    <div className="toast" id="toast">
      <i className="fas fa-check-circle"></i>
      <span id="toastText">Added to cart</span>
    </div>
  );
};

export default Toast;
