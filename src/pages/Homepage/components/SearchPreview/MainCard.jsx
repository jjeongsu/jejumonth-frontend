import PropTypes from 'prop-types';

const MainCard = ({ title, city, street, img, contentId }) => {
  return (
    <div className="border-solid border border-[#E9E9E9] rounded-8  shadow-lg w-313 overflow-hidden [&:nth-child(3n)]:mr-0">
      <img className="h-209 w-full" src={img} alt="상세 사진" />
      <div className="p-20">
        <div className="flex justify-between mb-13">
          <div className="text-18 font-semibold line-clamp-1">{title}</div>
          <button>
            <img src="/icons/scrap-icon.svg" className="w-21 h-19" alt="스크랩 아이콘" />
          </button>
        </div>
        <div className="text-14 text-gray-5">{`${city} > ${street}`}</div>
      </div>
    </div>
  );
};

export default MainCard;

MainCard.propTypes = {
  title: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
};
