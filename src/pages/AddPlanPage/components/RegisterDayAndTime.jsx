import React from 'react';
import generateTimeArray from '../../../utils/hourFormat';
import { Button } from 'antd';
import { useState, useMemo } from 'react';

// TODO 랜더링 최적화
const RegisterDayAndTime = (startDate, endDate, initialTargetDate) => {
  const hoursArray = useMemo(() => generateTimeArray(), []);
  const [time, setTime] = useState('');
  console.log('time', time);
  return (
    <div>
      <h2 className="text-24 font-semibold ml-7">여행 날짜</h2>
      <div className="mb-34">
        <h3 className="text-20 font-semibold mt-16 mb-22 ml-14"> 날짜 선택</h3>
        <div> 날짜 선택 폼</div>
      </div>

      <hr className="color-gray-5" />
      <div>
        <h3 className="text-20 font-semibold mt-16 mb-22 ml-14">시간 선택</h3>

        <div className="flex gap-10 flex-wrap">
          {hoursArray.map((clock, index) => (
            <Button
              key={index}
              color="orange"
              variant="text"
              className="w-104 h-44 font-semibold text-15 focus-within:bg-primary-5 focus-within:border-primary-2 focus-within:border-2 border-gray-5
              "
              onClick={() => setTime(clock.time)}
              onBlur={() => setTime('')}
            >
              {clock.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterDayAndTime;
