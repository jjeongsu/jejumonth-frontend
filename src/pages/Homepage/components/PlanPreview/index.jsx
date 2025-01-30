import { useState, useRef, useEffect } from 'react';
import Calender from './Calender';
import useMySelector from '@/hooks/useMySelector';
import useFetchAllUserPlans from '@/hooks/react-query/useFetchAllUserPlans';
import PlanPreviewCard from './PlanPreviewCard';
import PlanDetailPreviewCard from './PlanDetailPreviewCard';

const PlanPreview = () => {
  // 선택된 날짜, 선택된 일정
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userId, userFullName] = useMySelector(state => [
    state.user.userId,
    state.user.userFullName,
  ]);

  useEffect(() => {
    setSelectedPlan(null);
  }, [selectedDate]);

  // user가 가진 모든 trip과 trips별 plans를 조회
  // TODO 날짜 선택될때마다 리패치되지 않도록 변경
  const { trips, plans, isLoadingPlans } = useFetchAllUserPlans(userId);

  if (isLoadingPlans) {
    return <div> 여행 계획 정보를 불러오는 중.. 호잇</div>; //TODO skeleton UI로 대체하기
  }

  const newSelectedPlans = plans?.filter((plan, index) => {
    const { date } = plan;

    const date1 = new Date(date);
    const date2 = new Date(selectedDate);

    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    return date1.getTime() === date2.getTime();
  });

  console.log(newSelectedPlans);

  return (
    <div className="w-full flex gap-20 my-100 ">
      {/* 캘린더 컴포넌트 */}
      <div className="min-w-380">
        <div className="flex flex-col justify-center items-center">
          <div className="font-semibold text-15 w-350 text-gray-9 mb-20 flex justify-start">
            🗓️ 날짜를 선택해 주세요
          </div>
          <Calender selectedDate={selectedDate} setSelectedDate={setSelectedDate} plans={plans} />
        </div>
      </div>

      {/* 날짜별 일정 보여주는 컴포넌트 */}
      {selectedDate && (
        <div className="w-250 border-r-2 border-gray-900 last:border-r-0 flex justify-center ">
          <div className="w-250">
            <div className="font-semibold text-15 text-gray-9 mb-20">
              ✍️ {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일의 예상 일정
            </div>

            {userId === null ? <div>로그인하고 여행계획 만들기를 시작해 볼까요? `</div> : ''}

            {newSelectedPlans.length === 0 ? (
              <div>이날에 생성한 여행계획이 없어요..</div>
            ) : (
              newSelectedPlans.map((plan, index) => (
                <PlanPreviewCard
                  key={index}
                  plan={plan}
                  handleClick={() => {
                    setSelectedPlan(plan);
                  }}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* 세부일정 카드 컴포넌트 */}
      {selectedPlan && (
        <div className="max-w-270 flex justify-center border-l-4 ">
          <div className="px-15">
            <div className="font-semibold text-15 text-gray-9 mb-20">✅ 상세일정 확인하기</div>
            <span className="font-regular text-12 text-gray-8 block mb-17 ">
              날짜, 시간, 장소를 한 번 더 체크해요!
            </span>
            <PlanDetailPreviewCard plan={selectedPlan} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanPreview;
