import {
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  eachDayOfInterval,
  addMonths,
  startOfYear,
} from 'date-fns';

const useCalender = selectedDate => {
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const allMonth = [];
  const startMonth = startOfYear(selectedDate);
  for (let month = 0; month < 12; month++) {
    allMonth.push(addMonths(startMonth, month));
  }

  const 현재달의시작날짜 = startOfMonth(selectedDate);
  const 현재달의마지막날짜 = endOfMonth(selectedDate);
  const 현재달의첫주의시작날짜 = startOfWeek(현재달의시작날짜);
  const 현재달마지막주의끝날짜 = endOfWeek(현재달의마지막날짜);
  const currentMonthAllDates = eachDayOfInterval({
    start: 현재달의첫주의시작날짜,
    end: 현재달마지막주의끝날짜,
  });

  return { weekDays, currentMonthAllDates, allMonth };
};

export default useCalender;
