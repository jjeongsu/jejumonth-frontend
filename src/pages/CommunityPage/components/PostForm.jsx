import React, { useState } from "react";
import PostFormModal from "./PostFormModal";
import pencil from "/icons/pencil.svg";

const PostForm = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSubmit = (formData) => {
    console.log("폼 데이터 제출:", formData);
  };

  return (
    <>
      <button
        className="
          flex
          items-start
          gap-4
          ml-[80px]
          p-6
          w-[882px]
          h-[133px]
          rounded-[15px]
          bg-gray-100
          border
          border-gray-300
          text-gray-700
          text-xl
          font-medium
          hover:bg-gray-200
          active:bg-gray-300
          focus:ring-2
          focus:ring-gray-400
          shadow-sm
          transition
        "
        onClick={handleOpenModal}
      >
        <img
          src={pencil}
          alt="pencil"
          className="w-[20px] h-[20px] text-gray-400 mt-3 ml-3"
        />
        <span className="mt-3 text-gray-400">회원님, 글을 작성해 보세요!</span>
      </button>

      <PostFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default PostForm;