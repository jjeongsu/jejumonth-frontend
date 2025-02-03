import React from 'react';
import ProfileImage from './icon/ProfileImage';

const ProfileCard = ({ user, onClose }) => {
  console.log('ProfileCard - user:', user);
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-lg shadow-lg p-4 relative flex flex-col items-center"
        style={{ width: '234px', height: '243px' }}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>

        <div
          className="w-24 h-24 rounded-full overflow-hidden mb-20 shadow-md mt-15"
          style={{ width: '70px', height: '70px' }}
        >
          <ProfileImage
            src={user.author?.profileImage} 
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-1 text-center">
          {user.fullName || '익명 사용자'}
        </h2>

        <div className="flex justify-between mt-10 text-center text-gray-700 w-full px-60">
          <div className="flex flex-col items-center">
            <p className="text-sm">팔로잉</p>
            <p className="text-sm">{Array.isArray(user.following) ? user.following.length : 0}</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm">팔로워</p>
            <p className="text-sm">{Array.isArray(user.followers) ? user.followers.length : 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
