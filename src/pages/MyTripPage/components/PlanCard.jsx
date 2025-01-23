const PlanCard = () => {
  return (
    <button className="w-290 h-52 flex p-12 items-center bg-white rounded-3 shadow-[21px_33px_11px_0px_rgba(184,183,183,0.00)] border-[1px] border-solid border-gray-4">
      <div className="text-sub-accent-3 text-12 font-medium">13:00</div>
      <div className="grid justify-items-start content-center gap-7 m-20">
        <div className="text-center text-gray-8 text-15 font-medium">구로몬 시장</div>
        <div className="text-center text-gray-6 text-13 font-medium">음식점</div>
      </div>
    </button>
  );
};

export default PlanCard;
