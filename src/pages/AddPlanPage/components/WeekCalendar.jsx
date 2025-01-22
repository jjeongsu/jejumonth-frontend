import { useState } from 'react';

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

// date 객체를 받아서 해당 날짜가 포함된 일~토 주차를 반환.
const makeWeekArr = date => {
  let day = date.getDay(); // 화요일은 2
  console.log('day', day);
  let week = [];
  for (let i = 0; i < 7; i++) {
    let newDate = new Date(date.valueOf() + 86400000 * (i - day));
    week.push([i, newDate]);
  }
  console.log('week', week);
  return week;
};

// 여행일정을 만들고자 선택된 기본 날짜가 주어진다.
const WeekCalendar = ({ initialTargetDate }) => {
  // '2025-04-05'를 받아 시간선을 초기화한 Date객체를 생성한다.
  const getRefinedDate = dateString => {
    const temp = new Date(dateString);
    return new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
  };

  const [targetDay, setTargetDay] = useState(() => getRefinedDate(initialTargetDate)); // ui 상에서 선택된 날짜
  const [targetWeek, setTargetWeek] = useState(() => makeWeekArr(targetDay)); // 현재 보여주는 주차
  const [selectedDay, setSelectedDay] = useState(() => getRefinedDate(initialTargetDate)); // 서버에 보낼 날짜

  // 오늘날짜 표시를 위함.
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  console.log('선택된 날짜', selectedDay);

  // 한 주 전으로 이동하는 버튼을 눌렀을 때
  const onClickLeft = () => {
    let newDate = new Date(targetDay.valueOf() - 86400000 * 7); // 타겟 날짜를 일주일 전으로 이동시킨다.
    let newWeek = makeWeekArr(newDate); // 보여질 주차를 일주일 전으로 이동시킨다.
    setTargetDay(newDate);
    setTargetWeek(newWeek);
  };

  // 한 주 뒤로 이동하는 버튼을 눌렀을 때
  const onClickRight = () => {
    let newDate = new Date(targetDay.valueOf() + 86400000 * 7);
    let newWeek = makeWeekArr(newDate);
    setTargetDay(newDate);
    setTargetWeek(newWeek);
  };

  const onButtonClick = event => {
    // 현재 선택된 날짜를 selected day로 정한다.
    const newDate = new Date(event.target.value);
    setSelectedDay(newDate);
  };
  return (
    <div className="relatvie">
      <div className="font-semibold text-20 ml-21">{targetDay.getMonth() + 1}월</div>
      <hr className="border-gray-5 border-1 my-12" />
      <div className="grid grid-cols-7 grid-rows-[32px_50px] ">
        {WEEK.map((day, index) => (
          <div key={index} className="text-center text-16 text-gray-6 ">
            {day}
          </div>
        ))}

        {targetWeek.map(([index, day]) => (
          <div key={index} className="flex justify-center">
            <div className="flex flex-col items-center">
              <button
                value={day}
                onClick={onButtonClick}
                className={`text-16 w-31 h-31 rounded-full  text-gray-8 font-semibold hover:bg-primary-3
                ${day.getTime() == selectedDay.getTime() ? 'font-semibold bg-primary-1 text-white' : ''}
                `}
              >
                {day.getDate()}
              </button>
              <span className="text-sub-accent-1 text-15 font-semibold left-0">
                {day.getTime() == today.getTime() ? '오늘' : ' '}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-5 text-10 font-semibold text-gray-7">
        <button onClick={onClickLeft}> {'<-'}지난주 </button>
        <button onClick={onClickRight}> 다음주{'->'} </button>
      </div>
    </div>
  );
};

export default WeekCalendar;
