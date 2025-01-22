/**
 * @returns
 * [{
 *    label: '09:00',
 *    time: '09:00:00',
 * }, ...]
 */

const generateTimeArray = () => {
  const timeArray = [];
  let hour = 9; // 시작 시간 : 9시
  let minute = 0; // 시작 분  : 0분

  // 24시까지 포함
  while (hour < 25) {
    // 09:00
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    timeArray.push({
      label: timeString,
      time: `${timeString}:00`,
    });

    minute += 30;

    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }
  return timeArray;
};

export default generateTimeArray;
