import PropTypes from 'prop-types';

const Follower = ({ followerData, followHandler }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mt-28">
        <img
          src={(followerData.image && followerData.image) || `/images/dummy-user-img.png`}
          alt="유저 이미지"
          className="rounded-[50%] w-36 h-36"
        />

        <div className="grow-[2] pl-16">
          <p className="text-12">{followerData.fullName}</p>
        </div>

        <div
          className="bg-sub-accent-2 px-18 py-6 rounded-12 text-12 cursor-pointer text-white"
          onClick={() => followHandler(followerData._id)}
        >
          팔로우
        </div>
      </div>
    </div>
  );
};

export default Follower;

Follower.propTypes = {
  followerData: PropTypes.shape({
    image: PropTypes.string,
    fullName: PropTypes.string,
    _id: PropTypes.string,
  }),

  followHandler: PropTypes.func,
};
