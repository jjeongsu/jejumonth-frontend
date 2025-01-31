import PropTypes from 'prop-types';
import LikesIcon from '../../icon/LikesIcon';
import CommentIcon from '../../icon/CommentIcon';
import timeFormatter from '../../../../../utils/dateFormat/timeDifferenceFormat';

const LikedPost = ({ postData }) => {
  return (
    <>
      {!postData && <p>데이터가없습니다</p>}
      {postData && (
        <div className="w-full pt-40 px-20 pb-50 border-y border-y-gray-5 border-solid relative">
          <div>
            <div className="flex justify-between">
              <div
                className="w-50 h-50 bg-cover bg-center rounded-[50%]"
                style={{ backgroundImage: `url('${postData.author_profile_url}')` }}
              ></div>

              <div className="flex flex-col w-[90%] justify-between">
                <p className="text-16 text-gray-7 mb-16">
                  {postData.channel} · {timeFormatter(postData.wrote_time)}
                </p>
                <p className="line-clamp-2 text-14 text-gray-8 leading-5">{postData.title}</p>
              </div>
            </div>
          </div>
          {/* right conetnt */}
          <div className="icon-box absolute right-[3%] flex gap-20 mt-15">
            <div className="flex items-center gap-10">
              <LikesIcon size={14} baseColor="#BFBFBF"></LikesIcon>
              <span className="text-gray-6 text-14">{postData.count_likes}</span>
            </div>
            <div className="flex items-center gap-10">
              <CommentIcon size={14} baseColor="#BFBFBF"></CommentIcon>
              <span className="text-gray-6 text-14">{postData.count_comments}</span>
            </div>
            <div className="cursor-pointer">
              <img className="w-16 h-16" src="/icons/more.svg" alt="더보기 아이콘" />
            </div>
          </div>
          {/* right conetnt */}
        </div>
      )}
    </>
  );
};

export default LikedPost;

LikedPost.propTypes = {
  postData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author_profile_url: PropTypes.string.isRequired,
    channel: PropTypes.string,
    wrote_time: PropTypes.array.isRequired,
    count_likes: PropTypes.number,
    count_comments: PropTypes.number.isRequired,
  }),
};
