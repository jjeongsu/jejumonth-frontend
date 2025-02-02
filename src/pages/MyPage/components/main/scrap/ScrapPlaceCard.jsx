import PropTypes from 'prop-types';
import formatAddress from '../../../../../utils/addressFormat';
import ScrapIcon from '../../icon/ScrapIcon';

const ScrapPlaceCard = ({ scrapData, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(scrapData.user_id, scrapData.content_id);
  };

  return (
    <>
      {scrapData && (
        <div className="w-150 h-140 bg-blue-50 rounded-8 relative">
          <div className="scrap-icon absolute top-[5%] right-[5%]">
            <div onClick={handleDeleteClick} className="cursor-pointer">
              <ScrapIcon size={18} scrapped={true}></ScrapIcon>
            </div>
          </div>
          <div className="w-full h-[75%]">
            <img
              src={scrapData.img_thumbnail_url}
              alt={`${scrapData.title} 이미지`}
              className="rounded-t-8 w-full h-full"
            />
          </div>
          <div className="h-[25%] p-4 flex flex-col justify-between">
            <h3 className="text-12 truncate">{scrapData.title}</h3>
            <p className="text-10 text-gray-7">{formatAddress(scrapData.address)}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ScrapPlaceCard;

ScrapPlaceCard.propTypes = {
  scrapData: PropTypes.shape({
    address: PropTypes.string,
    category: PropTypes.string,
    content_id: PropTypes.string,
    created_at: PropTypes.string,
    id: PropTypes.number,
    img_full_url: PropTypes.string,
    img_thumbnail_url: PropTypes.string,
    title: PropTypes.string,
    user_id: PropTypes.string,
  }),
  onDelete: PropTypes.func,
};
