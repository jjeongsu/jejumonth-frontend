import { format, addMonths, subMonths } from 'date-fns';
import useCalender from '../../../../hooks/useCalender';

const Calender = ({ selectedDate, setSelectedDate }) => {
  const { currentMonthAllDates, weekDays } = useCalender(selectedDate);

  // 다음 달로 이동
  const nextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  // 지난 달로 이동
  const prevMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  // 선택한 날짜로 Date 변경
  const onChangeDate = date => {
    setSelectedDate(date);
  };

  const isSameMonth = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
  };

  const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() && date1.getDate() === date2.getDate();
  };

  return (
    <div className="w-350 h-350">
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between px-3">
          <div className="flex gap-1 caption1">
            <span className="text-red-300">{format(selectedDate, 'MMM yyyy')}</span>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={prevMonth}>
              {/* <CaretLeftIcon className="w-4 h-4 fill-grey-400" /> */}
              이전
            </button>
            <button type="button" onClick={nextMonth}>
              이후
              {/* <CaretRightIcon className="w-4 h-4 fill-grey-400" /> */}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 place-items-center gap-x-10 ">
          {weekDays.map((days, index) => (
            <div key={index} className="font-semibold w-40 h-40 flex items-center justify-center">
              {days}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-x-10 gap-y-10 ">
          {currentMonthAllDates.map((date, index) => (
            <button
              key={index}
              className={`p-2 rounded-full w-40 h-40 font-semibold
        ${isSameMonth(selectedDate, date) ? '' : 'text-gray-6'}
        ${
          isSameDay(selectedDate, date)
            ? 'bg-sub-accent-1 text-white'
            : 'hover:bg-primary-50 hover:text-primary-200'
        }`}
              type="button"
              onClick={() => onChangeDate(date)}
            >
              {date.getDate()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Calender;
