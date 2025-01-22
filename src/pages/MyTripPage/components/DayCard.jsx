import { useLocation, useNavigate } from 'react-router-dom';

const DayCard = ({ number, date, children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tripId = queryParams.get('trip_id');

  const handleClick = () => {
    navigate(`/plan?trip_id=${tripId}&date=${date}`);
  };

  return (
    <div className="w-371 h-auto ml-26 grid gap-12 mb-10">
      <div className="flex items-center justify-around">
        <div className="text-gray-8 text-sm font-semibold">
          day {number + 1}
        </div>
        <div className="text-gray-6 text-xs font-semibold">{date}</div>
        <div>
          <span className="text-gray-6 text-xs font-semibold">총 </span>
          <span className="text-sub-accent-1 text-xs font-semibold">0개</span>
          <span className="text-gray-6 text-xs font-semibold">의 일정</span>
        </div>
      </div>
      <div className="grid place-items-center w-full gap-12">
        {children}
      </div>
      <div className="flex items-center justify-around">
        <button
          onClick={handleClick}
          className="flex items-center text-primary-0 text-13 font-medium"
        >
          <img src="/icons/plus-icon.svg" alt="plus-icon" width="17" height="17" />
          추가
        </button>
      </div>
    </div>
  );
};

export default DayCard;
