import PropTypes from 'prop-types';

const PopUpCard = ({ plan, handleDelete, handleUpdate }) => {
  return (
    <div className="grid w-700 h-200 bg-gray-1 bottom-0 right-58 absolute z-10">
      <div className="flex justify-between m-8 px-10">
        <div>day{plan.dayNumber}</div>
        <div className="text-sub-accent-1">더보기</div>
      </div>
      <div className="flex mb-10 mx-20">
        <img
          src={plan.thumbnailpath}
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
        <button className="flex items-center" onClick={handleDelete}>
          <img src="/icons/delete-icon.svg" height="21" width="21" alt="쓰레기통"/>
          일정 삭제
        </button>
        <div className="w-[1px] bg-gray-200 h-[70%] mx-4"></div>
        <button className="flex items-center" onClick={handleUpdate}>
          <img src="/icons/timer.svg" height="21" width="21" alt="시계"/>
          시간 변경
        </button>
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