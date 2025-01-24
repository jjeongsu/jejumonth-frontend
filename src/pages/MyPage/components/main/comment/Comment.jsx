import PropTypes from 'prop-types';
import timeFormatter from '../../../../../utils/timeUtil';

const Comment = ({ commentData }) => {
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
