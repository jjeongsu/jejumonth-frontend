import React from 'react';
import { getRefinedDate } from './WeekCalendar';
import { useState, useMemo } from 'react';
import WeekCalendar from './WeekCalendar';
import ButtonList from './ButtonList';

// TODO 랜더링 최적화
const RegisterDayAndTime = ({ startDate, endDate, initialTargetDate }) => {
  const [time, setTime] = useState('');
  const [selectedDay, setSelectedDay] = useState(() => getRefinedDate(initialTargetDate));
  //console.log('registerDay props', startDate, endDate, initialTargetDate);

  const calendarProps = {
    initialTargetDate,
    selectedDay,
    setSelectedDay,
  };
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

      <div>
        <span>선택된 날짜 : {selectedDay.getDay()}</span>
        <span>선택된 시간 : {time}</span>
      </div>
    </div>
  );
};

export default RegisterDayAndTime;
