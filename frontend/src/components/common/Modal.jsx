import React from "react";
import Buttons from "./Buttons";

const Modal = ({ onClose, onConfirm, isLoading }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="w-[310px] bg-white p-6 rounded-lg relative z-10 flex flex-col items-end">
        <h2 className="mb-4 tracking-wide font-semibold">Are you sure you want to delete this user?</h2>
        <div className="flex space-x-2">
          <button
            className="bg-red-700 text-white rounded-lg w-10"
            onClick={onConfirm}
            disabled={isLoading}
          >
            Yes
          </button>
          <Buttons
            text="No"
            bgColor="bg-gray-700"
            textColor="text-white"
            onclick={onClose}
            width="w-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
