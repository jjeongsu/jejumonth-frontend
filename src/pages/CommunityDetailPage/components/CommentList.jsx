import React from 'react';

const CommentList = ({ comments }) => {
  console.log(comments);

  if (!comments || comments.length === 0 || !Array.isArray(comments) ) {
    return <p className="text-gray-500 mt-4">댓글이 없습니다.</p>;
  }

  return (
    <div className="mt-55">
    {comments.map((comment, index) => (
      <div key={index} className="p-4 mb-4">
        <div className="flex items-center mb-2">
          <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={comment.author?.profileImage || '/default-avatar.png'}
              alt="작성자 프로필"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h4 className="title-md font-bold mb-5">{comment.author?.fullName || '익명 사용자'}</h4>
            <p className="text-sm text-gray-500 mb-10">{comment.author?.email || '이메일 없음'}</p>
          </div>
        </div>
        <p className="text-gray-800 ml-43 mb-45 text-sm">{comment.comment || '내용 없음' }</p>

      </div>
    ))}
  </div>
);
};

export default CommentList;
