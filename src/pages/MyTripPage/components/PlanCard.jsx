const PlanCard = () => {
  return (
    <div className="w-[290px] h-auto relative">
      <div className="w-[290px] h-[52px] left-0 top-0 absolute bg-white rounded-[3px] shadow-[21px_33px_11px_0px_rgba(184,183,183,0.00)] border border-[#f0f0f0]" />
      <div className="w-[290px] h-[52px] left-0 top-0 absolute bg-white rounded-[3px] shadow-[14px_21px_10px_0px_rgba(184,183,183,0.01)] border border-[#f0f0f0]" />
      <div className="text-center text-[#595959] text-[15px] font-medium">구로몬 시장</div>
      <div className="text-center text-[#bfbfbf] text-[10px] font-medium">음식점</div>
      <div className="text-center text-[#73d7ea] text-[8px] font-medium]">13:00</div>
    </div>
  );
};

export default PlanCard;
