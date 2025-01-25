import PropTypes from 'prop-types';

const PopUpCard = ({plan, className}) => {

  return (
    <div className={className}>
      <div>
        <div>{plan.dayNumber}</div>
        <div className="text-sub-accent-1">더보기</div>
      </div>
      <div>
        <div>{plan.place_name}</div>
        <div>{plan.category}</div>
      </div>
      <div className="flex"></div>
    </div>
  );
}

PopUpCard.propTypes = {
  plan : PropTypes.shape({
    category : PropTypes.string,
    content_id : PropTypes.string,
    created_at: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    lat: PropTypes.number,
    lang: PropTypes.number,
    place_name: PropTypes.string,
    road_address: PropTypes.string,
    time: PropTypes.string,
    trip_id: PropTypes.number,
    dayNumber: PropTypes.number,
    totalDates: PropTypes.number,
  }),
  className: PropTypes.string,
};

export default PopUpCard;