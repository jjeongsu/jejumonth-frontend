import PropTypes from 'prop-types';
import Follower from './Follower';

const FollowerTap = ({ followerDatas, followHandler }) => {
  return (
    <>
      {followerDatas?.length > 0 ? (
        followerDatas.map(followerData => (
          <Follower
            key={followerData._id}
            followHandler={followHandler}
            followerData={followerData}
          ></Follower>
        ))
      ) : (
        <div>
          <img src="/images/harbang.png" alt="한라봉 이미지" className="my-20" />
          <p className="text-center text-gray-6">아직 팔로워가 없습니다!</p>
        </div>
      )}
    </>
  );
};

export default FollowerTap;

FollowerTap.propTypes = {
  followerDatas: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      fullName: PropTypes.string,
      _id: PropTypes.string,
    }),
  ),
  followHandler: PropTypes.func,
};
