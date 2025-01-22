import React from 'react';
import { getRefinedDate } from './WeekCalendar';
import { useState, useMemo } from 'react';
import WeekCalendar from './WeekCalendar';
import ButtonList from './ButtonList';
import { formatDate, formatTime } from '../../../utils/dateFormat';

// TODO 랜더링 최적화
// TODO 요약부 이모지를 아이콘으로 변경
const RegisterDayAndTime = ({ startDate, endDate, initialTargetDate, place, onRegister }) => {
  const [time, setTime] = useState('');
  const [selectedDay, setSelectedDay] = useState(() => getRefinedDate(initialTargetDate));
  //console.log('registerDay props', startDate, endDate, initialTargetDate);
  //console.log('선택된 날짜,시간', selectedDay, time);

  // day : Wed Feb 05 2025 00:00:00 GMT+0900 (한국 표준시)
  const calendarProps = {
    initialTargetDate,
    selectedDay,
    setSelectedDay,
  };

  const onSubmitClick = event => {
    // 여기서 필요한 정보가 모두 모였는지 확인
    console.log('time');
    if (time) {
      console.log('created!');
      const data = {
        //TODO 서버에 들어갈 형식으로 day, time 포맷 변경
        day: selectedDay,
        time,
      };
      onRegister(data);
      console.log('완료');
    } else {
      alert('시간을 등록해주세요');
    }
  };
  console.log('리랜더링', time);
  return (
    <div>
      <h2 className="text-24 font-semibold ml-7">여행 날짜</h2>
      <div className="mb-25">
        <h3 className="text-20 font-semibold mt-16 mb-22 ml-14"> 날짜 선택</h3>
        <div>
          <WeekCalendar {...calendarProps} />
        </div>
      </div>

      <hr className="color-gray-5" />
      <div>
        <h3 className="text-20 font-semibold mt-16 mb-22 ml-14">시간 선택</h3>
        <ButtonList setTime={setTime} />
      </div>

      <hr className="color-gray-5 my-27" />
      <div className="border border-solid border-gray-5 rounded-mds w-full h-80 flex justify-center items-center">
        <div>⏰</div>
        <div className="text-16 font-semibold text-gray-8 mx-10">
          <span>{formatDate(selectedDay)} </span>
          <span>{time !== '' && formatTime(time)}</span>
        </div>
        <div className="text-sub-accent-2 font-bold text-16 mr-5"> {place}</div>
        <span className="font-regular text-16 text-gray-7">에 일정을 만들까요?</span>
        <div className="ml-10">
          <span>✅</span>
          <button
            type="submit"
            className="text-16 font-semibold text-green-500 ml-3"
            onClick={onSubmitClick}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterDayAndTime;
