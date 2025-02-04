import { useState, useEffect } from 'react';
import Calender from './Calender';
import useMySelector from '@/hooks/useMySelector';
import useFetchAllUserPlans from '@/hooks/react-query/useFetchAllUserPlans';
import PlanPreviewCard from './PlanPreviewCard';
import PlanDetailPreviewCard from './PlanDetailPreviewCard';
import LoginCard from './LoginCard';
import EmptyPlanCard from './EmptyPlanCard';
import { Link } from 'react-router';
import RECOMMAND_PLACE from './recommend';
import RecommandDetailCard from './RecommandDetailCard';
import getRandomNumber from '@/utils/randomNumber';
import DetailCardWrapper from './DetailCardWrapper';
import PlanPreviewItem from './PlanPreviewItem';
import PATH from '@/constants/path';
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
  console.log('selectedPaln', selectedPlan);
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
        <div className="w-300 h-410 border-solid  border-r-2 border-l-2 border-gray-4  flex justify-center px-20">
          <div className="w-300">
            <div className="font-semibold text-15 text-gray-9 mb-40 pl-20">
              ✍️ {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일의 예상 일정
            </div>

            {userId === null ? (
              <LoginCard />
            ) : newSelectedPlans.length === 0 ? (
              <EmptyPlanCard link={trips ? PATH.addTrip : PATH.mySchedule} />
            ) : (
              <div className="pl-20 max-h-350 overflow-y-scroll">
                <div className="flex ">
                  <div className="mr-15">
                    <div className="w-2 h-full bg-gray-5 relative ">
                      <div className="w-10 h-10 rounded-full  bg-sub-accent-2 absolute top-0 -left-4"></div>
                    </div>
                  </div>
                  <div className="w-255 h-25 flex items-center mb-15 font-semibold text-15 text-gray-8 ">
                    📍 이날의 제주도 여행{' '}
                  </div>
                </div>

                {newSelectedPlans.map((plan, index) => (
                  <PlanPreviewItem key={index}>
                    <PlanPreviewCard
                      plan={plan}
                      handleClick={() => {
                        setSelectedPlan(plan);
                      }}
                    />
                  </PlanPreviewItem>
                ))}
                <Link
                  className="w-214 h-30 flex items-center justify-center rounded-full border-solid border-2 border-sub-accent-2 mx-auto mt-30 text-gray-9 hover:bg-sub-accent-1/10"
                  to="/mypage/scheduleSection"
                >
                  새로운 일정 추가
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 세부일정 카드 컴포넌트 */}
      {selectedPlan ? (
        <DetailCardWrapper
          header="✅ 상세일정 확인하기"
          guide=" 날짜, 시간, 장소를 한 번 더 체크해요!"
        >
          <PlanDetailPreviewCard plan={selectedPlan} />
        </DetailCardWrapper>
      ) : (
        <DetailCardWrapper
          header="🍧 이런 메뉴는 어때요?"
          guide="추천하는 여행맛집을 일정에 추가해보세요"
        >
          <RecommandDetailCard place={RECOMMAND_PLACE[getRandomNumber(RECOMMAND_PLACE.length)]} />
        </DetailCardWrapper>
      )}
    </div>
  );
};

export default PlanPreview;
