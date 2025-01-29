import { useState } from 'react';
import Calender from './Calender';

const PlanPreview = () => {
  // 선택된 날짜, 선택된 일정
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="w-full flex gap-20 ">
      <div className="flex-1 border-r-2 border-gray-900 last:border-r-0">
        <div className="font-semibold text-15 text-gray-9 mb-20">🗓️ 날짜를 선택해 주세요</div>
        <Calender selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      {/* <div className="flex-1 border-r-2 border-gray-900 last:border-r-0">
        <div className="font-semibold text-15 text-gray-9 mb-20">
          {' '}
          ✍️ {selectedDate.getDay()}일의 예상 일정
        </div>
      </div> */}
      {/* <div className="font-semibold text-15 text-gray-9 mb-20">✅ 상세일정 확인하기</div> */}
    </div>
  );
};

export default PlanPreview;
