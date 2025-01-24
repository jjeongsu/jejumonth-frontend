import PropTypes from 'prop-types';

const Comment = ({ commentData }) => {
  const timeFormatter = postTime => {
    const currentTime = new Date();
    const postData = new Date(postTime);
    const timeDifference = currentTime - postData;
    const hourDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    const formatterText =
      hourDifference < 1
        ? '방금 전'
        : hourDifference < 24
          ? `${hourDifference}시간 전`
          : `${Math.floor(hourDifference / 24) === 1}`
            ? `하루 전`
            : `${Math.floor(hourDifference / 24)}일 전`;

    return formatterText;
  };

  console.log(commentData);

  return (
    <div>
      <div className="w-full py-30 px-20 border-b border-b-gray-5 border-solid relative">
        <p className="text-16 text-gray-7 mb-16">{timeFormatter(commentData.createdAt)}</p>
        <p className="line-clamp-2 text-14 text-gray-8 leading-16">{commentData.comment}</p>
      </div>
    </div>
  );
};

export default Comment;

Comment.propTypes = {
  commentData: PropTypes.shape({
    createdAt: PropTypes.string,
    comment: PropTypes.string,
  }),
};
