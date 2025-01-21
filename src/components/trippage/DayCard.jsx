import { useLocation, useNavigate } from 'react-router-dom';

const DayCard = ({ number, date }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tripId = queryParams.get('trip_id');

  const handleClick = () => {
    navigate(`/plan?trip_id=${tripId}?date=${date}`);
  };

  return (
    <div className="w-371 h-66 ml-26 relative">
      <div className="w-50 left-0 top-0 absolute text-gray-8 text-sm font-semibold">
        day {number + 1}
      </div>
      <div className="w-80 left-81 top-0 absolute text-gray-6 text-xs font-semibold">{date}</div>
      <div className="w-70 h-34 left-305 top-0 absolute">
        <span className="text-gray-6 text-xs font-semibold leading-30">총 </span>
        <span className="text-sub-accent-1 text-xs font-semibold leading-30">0개</span>
        <span className="text-gray-6 text-xs font-semibold leading-30">의 일정</span>
      </div>
      <button
        onClick={handleClick}
        className="w-23 h-20 left-189 top-45 absolute text-center text-primary-0 text-13 font-medium"
      >
        추가
      </button>
    </div>
  );
};

export default DayCard;
