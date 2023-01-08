import React from "react";

const Modal = ({ children, close, open }) => {
  return (
    <div
      className="h-screen absolute top-0 left-0 bg-black bg-opacity-70 w-screen z-50 flex items-center justify-center"
      onClick={close}
    >
      <div
        className="w-1/3 min-h-1/2 bg-white rounded p-8"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
