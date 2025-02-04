import PropTypes from 'prop-types';
import WishListButton from './WishListButton';
import { Link } from 'react-router';

const DetailCard = ({ title, city, street, description, img, category, contentid }) => {
  const handleLinkClick = e => {
    e.preventDefault();
  };
  return (
    <Link
      to={`/detail/${contentid.contentsid}`}
      className="p-20 border-solid border border-[#E9E9E9] rounded-8  shadow-lg flex mb-13"
    >
      <div className="flex-1 content-center">
        <div className="flex justify-between">
          <div>
            <span className=" text-24 mr-22 font-medium inline-block max-w-312  leading-7">
              {title}
            </span>
            <span className="text-gray-7 text-14">{`${city}  >  ${street}`}</span>
          </div>
          <WishListButton placeInfo={contentid} onClick={handleLinkClick} />
        </div>
        <h4 className="">{category}</h4>
        <p className="text-[#333333] mt-35 leading-[140%] text-14 font-normal line-clamp-2">
          {description}
        </p>
      </div>
      <img src={img} alt="상세사진" className="rounded-10 w-344 h-171 ml-40" />
    </Link>
  );
};

export default DetailCard;

DetailCard.propTypes = {
  title: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  contentid: PropTypes.string.isRequired,
};
