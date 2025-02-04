import PropTypes from 'prop-types';
import WishListButton from './WishListButton';
import { Link } from 'react-router';

const DetailMediumCard = ({ title, city, street, img, contentid }) => {
  const handleLinkClick = e => {
    e.preventDefault(); //
  };
  return (
    <Link
      to={`/detail/${contentid.contentsid}`}
      className="border-solid border border-[#E9E9E9] rounded-8  shadow-lg mb-32 w-313 mr-10 overflow-hidden [&:nth-child(3n)]:mr-0"
      onClick={handleLinkClick}
    >
      <img className="h-209 w-full" src={img} alt="상세 사진" />
      <div className="p-20">
        <div className="flex justify-between mb-13">
          <div className="text-18 font-semibold w-220 line-clamp-1">{title}</div>
          <WishListButton placeInfo={contentid} onClick={handleLinkClick} />
        </div>
        <div className="text-14 text-gray-5">{`${city} > ${street}`}</div>
      </div>
    </Link>
  );
};

export default DetailMediumCard;

DetailMediumCard.propTypes = {
  title: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  contentid: PropTypes.string.isRequired,
};
