import PropTypes from 'prop-types';
import DayButton from './DayButton.jsx';

const PopUpCard = ({ plan, handleDelete, handleUpdate }) => {
  return (
    <div className="grid w-700 h-200 bg-gray-1 bottom-0 right-58 absolute z-10">
      <div className="flex justify-between m-8 px-10">
        <DayButton dayNumber={plan.dayNumber} />
        <a href={`/detail/${plan.content_id}`} target="_blank">
          <div className="text-sub-accent-1">더보기</div>
        </a>
      </div>
      <div className="flex mb-10 mx-20">
        <img
          src={plan.thumbnailpath || "/images/no_image.svg"}
          alt="장소사진"
          width="127"
          height="77"
          className="rounded-4 w-127 h-77 object-cover"
        />
        <div className="grid ml-20 w-400 grid-cols-2 grid-rows-3 gap-x-0 gap-y-1">
          <div className="font-semibold col-span-2">{plan.place_name}</div>
          <div className="text-gray-6">{plan.category}</div>
          <div className="text-gray-7 row-start-3">📍 info</div>
          <div className="text-gray-7 row-span-2 col-start-2 flex items-center">
            {plan.description}
          </div>
        </div>
      </div>
      <div className="flex border-t-[1px] border-solid border-gray-200 justify-around items-center">
        <div className="w-349 flex items-center justify-center">
          <button className="flex items-center text-gray-7" onClick={handleDelete}>
            <img
              src="/icons/delete-icon.svg"
              height="17"
              width="17"
              alt="쓰레기통"
              className="mx-10"
            />
            일정 삭제
          </button>
        </div>
        <div className="w-1 bg-gray-200 h-[70%] mx-4"></div>
        <div className="w-349 flex items-center justify-center">
          <button className="flex items-center text-gray-7" onClick={handleUpdate}>
            <img src="/icons/timer.svg" height="17" width="17" alt="시계" className="mx-10" />
            시간 변경
          </button>
        </div>
      </div>
    </div>
  );
};

PopUpCard.propTypes = {
  plan: PropTypes.shape({
    category: PropTypes.string,
    content_id: PropTypes.string,
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
    thumbnailpath: PropTypes.string,
  }),
  className: PropTypes.string,
  handleDelete: PropTypes.func,
  handleUpdate: PropTypes.func,
};

export default PopUpCard;