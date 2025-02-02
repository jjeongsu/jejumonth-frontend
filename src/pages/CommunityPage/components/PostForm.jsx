import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostFormModal from './PostFormModal';
import pencil from '../../../../public/icons/pencil.svg';
import { useSelector } from 'react-redux'; 
import { getCookie } from '../../../utils/cookie'; 

const PostForm = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();

  const user = useSelector(state => state.user);
  const userFullName = user?.userFullName || '회원님';
  const userProfileImage = user?.profileImage || 'default-avatar.png';

  const token = getCookie('jwt');

  const handleOpenModal = () => {
    if (!token) {
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

  return (
    <>
      <div className="flex items-right gap-4 ml-[0px]">
        <div className="w-[40px] h-[40px] rounded-full flex-shrink-0 overflow-hidden">
          <img src={userProfileImage} alt="프로필 이미지" className="w-full h-full rounded-full object-cover" />
        </div>

        <button
          className="flex items-start ml-[25px] gap-4 p-6 w-[882px] h-[133px] rounded-[15px] bg-gray-100 border border-gray-300 text-gray-700 text-xl font-medium hover:bg-gray-200 active:bg-gray-300 focus:ring-2 focus:ring-gray-400 shadow-sm transition"
          onClick={handleOpenModal}
        >
          <img src={pencil} alt="pencil" className="w-[20px] h-[20px] text-gray-400 mt-3 ml-3" />
          <span className="mt-3 text-gray-400">{userFullName}, 글을 작성해 보세요!</span>
        </button>
      </div>

      {isModalOpen && <PostFormModal isOpen={isModalOpen} onClose={handleCloseModal} />}

      {isAlertOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[360px] text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">로그인 후 이용 가능합니다.</h2>
            <p className="text-sm text-gray-600 mb-6">로그인 하시겠습니까?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmLogin}
                className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all text-sm font-medium"
              >
                예
              </button>
              <button
                onClick={handleCloseAlert}
                className="px-6 py-2 bg-white text-orange-500 border border-orange-500 rounded-md hover:bg-orange-100 transition-all text-sm font-medium"
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
