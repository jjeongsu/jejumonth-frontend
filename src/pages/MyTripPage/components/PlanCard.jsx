import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CurrentPopUpPlanContext } from '../index.jsx';

const PlanCard = ({ plan, dayNumber, totalDates }) => {
  const {
    setPlanForPopUp,
  } = useContext(CurrentPopUpPlanContext);

  const handleClick = () => {
    setPlanForPopUp({...plan, dayNumber, totalDates });
  }

  return (
    <button onClick={handleClick} className="w-290 h-52 flex p-12 items-center bg-white rounded-3 shadow-[21px_33px_11px_0px_rgba(184,183,183,0.00)] border-[1px] border-solid border-gray-4">
      <div className="text-sub-accent-3 text-12 font-medium">{plan.time.slice(0,plan.time.length-3)}</div>
      <div className="grid justify-items-start content-center gap-7 m-20">
        <div className="text-center text-gray-8 text-15 font-medium">{plan.place_name}</div>
        <div className="text-center text-gray-6 text-13 font-medium">{plan.category}</div>
      </div>
    </button>
  );
};

export default PlanCard;

PlanCard.propTypes = {
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
  }),
  dayNumber: PropTypes.number,
  totalDates: PropTypes.number,
};