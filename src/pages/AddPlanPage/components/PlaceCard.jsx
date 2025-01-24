const PlaceCard = ({ item, onNext, onPassDetail }) => {
  console.log('item', item);
  return (
    <div className="w-560 h-66 relative border flex justify-around items-center border-white">
      <img
        className="w-57 h-32 rounded-sm"
        src={item?.repPhoto?.photoid?.thumbnailpath}
        alt="장소 사진"
      />

      <button className="w-245 h-auto flex flex-col items-start" onClick={onNext}>
        <span className="text-black text-base font-medium truncate overflow-hidden whitespace-nowrap">
          {item?.title?.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
          <br />
        </span>
        <span className="text-gray-400 text-base font-medium">
          {item?.contentscd?.label}
          {item?.region1cd?.label ? ` · ${item?.region1cd?.label}` : ''}
        </span>
      </button>
      <button
        className="w-45 h-27 flex justify-center items-center bg-gray-200 rounded-full text-black text-xs font-semibold"
        onClick={() =>
          onPassDetail({
            place_name: item?.title?.length > 20 ? `${item.title.slice(0, 20)}...` : item.title,
            description: item?.introduction,
            category: item?.contentscd?.label,
            road_address: item?.roadaddress,
            lat: item?.latitude,
            lng: item?.longitude,
            contentsid: item?.contentsid,
          })
        }
      >
        선택
      </button>
    </div>
  );
};

export default PlaceCard;
