import PropTypes from 'prop-types';
import CommentIcon from '../../icon/CommentIcon';
import LikesIcon from '../../icon/LikesIcon';
import timeFormatter from '../../../../../utils/timeUtil';

const Post = ({ postData }) => {
  const userPostHandler = () => {
    console.log('삭제 및 수정 구현 예정');
  };

  return (
    <>
      {!postData && <p>데이터가없습니다</p>}
      {postData && (
        <div className="w-full pt-40 px-20 pb-50 border-y border-y-gray-5 border-solid relative">
          <div>
            <div className="flex justify-between">
              <div
                className="w-50 h-50 bg-cover bg-center rounded-[50%]"
                style={{ backgroundImage: `url('/images/dummy-user-img.png')` }}
              ></div>

              <div className="flex flex-col w-[90%] justify-between">
                <p className="text-16 text-gray-7 mb-16">
                  {postData.channel.name} · {timeFormatter(postData.createdAt)}
                </p>
                <p className="line-clamp-2 text-14 text-gray-8 leading-5">{postData.title}</p>
              </div>
            </div>
          </div>
          {/* right conetnt */}
          <div className="icon-box absolute right-[3%] flex gap-20 mt-15">
            <div className="flex items-center gap-10">
              <LikesIcon size={14} baseColor="#BFBFBF"></LikesIcon>
              <span className="text-gray-6 text-14">{postData.likes.length}</span>
            </div>
            <div className="flex items-center gap-10">
              <CommentIcon size={14} baseColor="#BFBFBF"></CommentIcon>
              <span className="text-gray-6 text-14">{postData.comments.length}</span>
            </div>
            <div onClick={userPostHandler} className="cursor-pointer">
              <img className="w-16 h-16" src="/icons/more.svg" alt="더보기 아이콘" />
            </div>
          </div>
          {/* right conetnt */}
        </div>
      )}
    </>
  );
};

export default Post;

Post.propTypes = {
  postData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    channel: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};
