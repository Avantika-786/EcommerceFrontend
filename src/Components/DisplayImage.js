import React from "react";
import { IoClose } from "react-icons/io5";

const DisplayImage = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 right-0 left-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-4 ">
        <div
          className="w-fit ml-auto text-2xl hover:red-600 cursor-pointer"
          onClick={onClose}
        >
          <IoClose></IoClose>
        </div>
        <div className="flex justify-center p-4 max-h-[80vh] max-w-[50vw]">
          <img src={imageUrl} alt="" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
