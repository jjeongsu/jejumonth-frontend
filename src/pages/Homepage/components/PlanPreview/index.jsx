import { useState, useRef } from 'react';
import Calender from './Calender';
import { useSelector } from 'react-redux';
import useFetchAllUserPlans from '@/hooks/react-query/useFetchAllUserPlans';

const PlanPreview = () => {
  // 선택된 날짜, 선택된 일정
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPlan, setSelectedPlan] = useState(null);
  const userId = useSelector(state => state.user.userId);

  // user가 가진 모든 trip과 trips별 plans를 조회
  // TODO 날짜 선택될때마다 리패치되지 않도록 변경
  const { trips, plans, isLoadingPlans } = useFetchAllUserPlans(userId);

  if (isLoadingPlans) {
    return <div> 여행 계획 정보를 불러오는 중.. 호잇</div>; //TODO skeleton UI로 대체하기
  }

  console.log('plans', plans);
  return (
    <div className="w-full flex gap-20 my-100">
      {/* 캘린더 컴포넌트 */}
      <div className="flex-1">
        <div className="flex flex-col justify-center items-center">
          <div className="font-semibold text-15 w-350 text-gray-9 mb-20 flex justify-start">
            🗓️ 날짜를 선택해 주세요
          </div>
          <Calender selectedDate={selectedDate} setSelectedDate={setSelectedDate} plans={plans} />
        </div>
      </div>

      {/* 날짜별 일정 보여주는 컴포넌트 */}
      {selectedDate && (
        <div className="flex-1 border-r-2 border-gray-900 last:border-r-0">
          <div className="font-semibold text-15 text-gray-9 mb-20">
            ✍️ {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일의 예상 일정
          </div>
          {userId === null && (
            <div>만들어둔 여행계획이 없어요.. 로그인하고 여행계획 만들기를 시작해 볼까요? `</div>
          )}
          {userId && <div>{userId}님이 만든 여행꼐획이에요</div>}
        </div>
      )}

      {/* 세부일정 카드 컴포넌트 */}
      {selectedPlan && (
        <div className="font-semibold text-15 text-gray-9 mb-20">✅ 상세일정 확인하기</div>
      )}
    </div>
  );
};

export default PlanPreview;
