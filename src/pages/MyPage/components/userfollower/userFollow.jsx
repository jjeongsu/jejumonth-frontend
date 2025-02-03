import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../../../../apis/getUserData';
import { useState } from 'react';

const UserFollow = ({ isOpen, closeModal, userData, userName }) => {
  const [tapMenu, setTapMenu] = useState('follower');

  const { data: followerData } = useQuery({
    queryKey: ['followers', userData?.followers],
    queryFn: async () => {
      if (!userData?.followers) return [];
      return Promise.all(userData.followers.map(element => getUserData(element.user)));
    },
  });

  const { data: followingData } = useQuery({
    queryKey: ['followeings', userData?.following],
    queryFn: async () => {
      if (!userData?.following) return [];
      return Promise.all(userData.following.map(element => getUserData(element.user)));
    },
  });

  if (!isOpen) return null;

  const followerSection = (
    <>
      {followerData.length > 0 ? (
        followerData.map((followerData, index) => (
          <div className="w-full" key={index}>
            <div className="flex items-center justify-between mt-28">
              <img
                src="/images/dummy-user-img.png"
                alt="더미이미지입니다."
                className="rounded-[50%] w-36 h-36"
              />

              <div className="grow-[2] pl-16">
                <p className="text-12">{followerData.fullName}</p>
              </div>

              <div className="bg-sub-accent-2 px-18 py-6 rounded-12 text-12 cursor-pointer text-white">
                팔로우
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <img src="/images/harbang.png" alt="한라봉 이미지" className="my-20" />
          <p className="text-center text-gray-6">아직 팔로워한 사람이 없습니다!</p>
        </div>
      )}
    </>
  );

  const followingSection = (
    <>
      {followingData.length > 0 ? (
        followingData.map((followingData, index) => (
          <div className="w-full" key={index}>
            <div className="flex items-center justify-between mt-28">
              <img
                src="/images/dummy-user-img.png"
                alt="더미이미지입니다."
                className="rounded-[50%] w-36 h-36"
              />

              <div className="grow-[2] pl-16">
                <p className="text-12">{followingData.fullName}</p>
              </div>

              <div className="bg-white border-sub-accent-2 border border-solid px-18 py-6 rounded-12 text-12 cursor-pointer text-sub-accent-2">
                팔로우 취소
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <img src="/images/harbang.png" alt="한라봉 이미지" className="my-20" />
          <p className="text-center text-gray-6">아직 팔로잉한 사람이 없습니다!</p>
        </div>
      )}
    </>
  );

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[9999999999999]"
      onClick={closeModal}
    >
      <div
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-20 right-20 cursor-pointer" onClick={closeModal}>
          <img src="/icons/close-icon.svg" alt="닫기 아이콘" />
        </div>
        <div className="w-315 h-480 bg-white py-48 px-40 rounded-10 overflow-y-auto">
          <h3 className="text-20 text-gray-12 text-center">{userName}</h3>
          <div className="flex justify-center mt-30">
            <div
              className={`w-75 text-center text-12 text-gray-12 cursor-pointer pb-5 ${tapMenu === 'follower' && 'border-gray-8 border-b border-solid'}`}
              onClick={() => setTapMenu('follower')}
            >
              팔로우 {userData?.followers.length}
            </div>
            <div
              className={`w-75 text-center text-12 text-gray-12 cursor-pointer pb-5 ${tapMenu === 'following' && 'border-gray-8 border-b border-solid'}`}
              onClick={() => setTapMenu('following')}
            >
              팔로잉 {userData?.following.length}
            </div>
          </div>

          <div>{tapMenu === 'follower' ? followerSection : followingSection}</div>
        </div>
      </div>
    </div>
  );
};

UserFollow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    followers: PropTypes.array,
    following: PropTypes.array,
  }),
  userName: PropTypes.string,
};

export default UserFollow;
