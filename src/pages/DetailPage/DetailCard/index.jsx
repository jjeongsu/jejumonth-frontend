const DetailCard = ({ title, area, description, img }) => {
  return (
    <div className="p-20 border-solid border border-[#E9E9E9] rounded-8  shadow-lg flex mb-13">
      <div className="flex-1 content-center">
        <div className="flex justify-between">
          <div>
            <span className="text-24 mr-22 font-medium">{title}</span>
            <span className="text-gray-7 text-14">{area}</span>
          </div>
          {
            <button>
              <img src="/icons/scrap-icon.svg" className="w-21 h-19" alt="스크랩 아이콘" />
            </button>
          }
        </div>
        <p className="text-[#333333] mt-35 leading-[140%] text-14 font-normal overflow-hidden text-ellipsis">
          {description}
        </p>
      </div>
      <img src={img} alt="상세사진" className="rounded-10 w-344 h-171 ml-40" />
    </div>
  );
};

export default DetailCard;
