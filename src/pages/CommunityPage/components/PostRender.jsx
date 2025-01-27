import React from 'react';
import likes from '/icons/likes.svg';
import comment from '/icons/comment.svg';

const PostRender = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-gray-500">게시글이 없습니다.</p>;
  }

  const calculateTimeAgo = createdAt => {
    const now = new Date();
    const postTime = new Date(createdAt);
    const diffInMs = now - postTime;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return diffInMinutes === 0 ? '방금 전' : `${diffInMinutes}분 전`;
    }
    return `${diffInHours}시간 전`;
  };

  
  return (
    <ul className="space-y-55 ">
  {posts.map((post) => (
    <li
      key={post._id}
      className="flex items-center p-6"
      style={{ borderBottom: '1px solid #ddd', paddingBottom: '30px' }}
    >
     {/* 사용자 프로필 이미지 디폴트 부분 의논 해야함 */}
      <div className="w-40 h-40 rounded-full flex-shrink-0">
        <img
          src={post.author?.profileImage || 'default-avatar.png'} 
          alt="프로필"
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      <div className="ml-30 flex-1">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <span className="font-medium text-gray-700">{post.channel?.name || '알 수 없음'}</span>
          <span>·</span>
          <span>{calculateTimeAgo(post.createdAt)}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-4">
          {post.title.length > 25 ? `${post.title.slice(0, 25)}...` : post.title}
        </h3>

        <div className="flex items-center justify-end m-5 relative mr-100" style={{top: '-30px'}}>
          <div className="flex items-center space-x-1 text-gray-500" style={{marginRight: '42px'}}>
            <img
              src={likes}
              alt="좋아요"
              className="w-25 h-23"
            />
            <span>{post.likes?.length || 0}</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-500">
            <img
              src={comment} 
              alt="댓글"
              className="w-25 h-23"
            />
            <span>{post.comments?.length || 0}</span>
          </div>
        </div>
      </div>
    </li>
  ))}
</ul>


  );
};

export default PostRender;
