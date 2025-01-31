import { useState, useRef, useEffect } from 'react';
import Calender from './Calender';
import useMySelector from '@/hooks/useMySelector';
import useFetchAllUserPlans from '@/hooks/react-query/useFetchAllUserPlans';
import PlanPreviewCard from './PlanPreviewCard';
import PlanDetailPreviewCard from './PlanDetailPreviewCard';
import PNG_IMAGES from '@public/images/image.js';
import { Link } from 'react-router';
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
        <div className="w-300  border-solid  border-r-2 border-l-2 border-gray-4  flex justify-center px-20">
          <div className="w-300">
            <div className="font-semibold text-15 text-gray-9 mb-20">
              ✍️ {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일의 예상 일정
            </div>

            {userId === null ? (
              <div className="flex flex-col  items-center h-full gap-10 pt-80">
                <span className="font-medium text-16 text-gray-7">
                  <span className="text-12 block mb-3">일정이 존재하지 않아요...😢</span>
                  <br />
                  로그인 후 <span className="font-bold text-primary-0 text-18">JEJUMONTH</span> 의
                  <br />더 많은 기능을 사용해보세요!{' '}
                </span>
                <Link
                  to="/auth"
                  className="w-full border border-solid border-gray-5 flex justify-center items-center gap-20 px-10 py-15 rounded-5 hover:bg-gray-3 mt-10 "
                >
                  <img src={PNG_IMAGES.dummyUser} className="w-30 h-30" />
                  <span className="text-gray-7 font-semibold hover:font-extrabold">
                    {' '}
                    login JEJUMONTH
                  </span>
                </Link>
              </div>
            ) : newSelectedPlans.length === 0 ? (
              <div className="flex flex-col  items-center h-full gap-10 pt-60 bg-gray-2 rounded-10">
                <div>
                  <img src={PNG_IMAGES.harbang} className="w-150 h-150 mb-20" />
                  <div className="flex flex-col items-center">
                    <div className="mb-10 font-regular text-14 text-gray-8 flex flex-col items-center gap-5">
                      <span>이 날은 계획이 없어요</span>

                      <span>새로운 일정을 만들어 볼까요?</span>
                    </div>
                    <Link
                      to="/mypage/scheduleSection"
                      className="border border-solid border-gray-5 w-full px-20 py-15 rounded-5 flex justify-center items-center text-15 font-semibold text-gray-7 hover:bg-gray-3"
                    >
                      🍊 일정 추가하기
                    </Link>
                  </div>
                </div>
              </div>
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
