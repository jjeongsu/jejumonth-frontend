import React from 'react';
import generateTimeArray from '../../../utils/hourFormat';
import { Button } from 'antd';
import { useMemo } from 'react';

// TODO : 오전, 낮, 저녁으로 나누기
const ButtonList = ({ setTime }) => {
  const hoursArray = useMemo(() => generateTimeArray(), []);
  return (
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
  );
};

export default ButtonList;
