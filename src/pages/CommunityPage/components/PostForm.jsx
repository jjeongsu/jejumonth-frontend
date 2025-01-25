import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../redux/slices/user.slice';
import PostFormModal from './PostFormModal';
import pencil from '../../../../public/icons/pencil.svg';

const PostForm = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();

  const { userId, userFullName } = useSelector(state => state.user);

  const handleOpenModal = () => {
    if (!userId) {
      setAlertOpen(true);
      return;
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);
  const handleCloseAlert = () => setAlertOpen(false);

  const handleConfirmLogin = () => {
    navigate('/auth');
  };

  const handleSubmit = formData => {
    console.log('폼 데이터 제출:', formData);
  };

  return (
    <>
      <div className="flex items-right gap-4 ml-[0px]">
        <div className="w-[40px] h-[40px] rounded-full flex-shrink-0 overflow-hidden">
          <img
            src={userId.author?.profileImage || 'default-avatar.png'}
            alt="프로필 이미지"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <button
          className="
            flex
            items-start
            ml-[25px]
            gap-4
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
          <img src={pencil} alt="pencil" className="w-[20px] h-[20px] text-gray-400 mt-3 ml-3" />
          <span className="mt-3 text-gray-400">
            {userFullName ? `${userFullName}, 글을 작성해 보세요!` : '회원님, 글을 작성해 보세요!'}
          </span>
        </button>
      </div>

      <PostFormModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />

      {isAlertOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-12 rounded-md shadow-lg w-[400px] h-[250px] text-center">
            <div className="flex justify-center mb-70">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-500 text-5xl font-bold mt-70">i</span>
              </div>
            </div>

            <h2 className="text-lg font-bold text-gray-800 mb-2">로그인 후 이용 가능합니다.</h2>
            <p className="text-sm text-gray-600 mb-30">로그인 하시겠습니까?</p>

            <div className="flex justify-center space-x-4 m">
              <button
                onClick={handleConfirmLogin}
                className="px-7 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
              >
                예
              </button>
              <button
                onClick={handleCloseAlert}
                className="px-6 py-5 bg-white text-orange-500 rounded-md border border-orange-500 hover:bg-orange-100 transition"
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostForm;
