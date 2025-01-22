// Date 객체에서 문자열 'YYYY년 MM월 DD일'로 변환
export const formatDate = date => {
  const year = date.getFullYear(); // 연도
  const month = date.getMonth() + 1; // 월 (0부터 시작하므로 +1)
  const day = date.getDate(); // 일

  return `${year}년 ${month}월 ${day}일`;
};

export const formatTime = timeString => {
  // 시간 문자열을 ':'로 분리
  const [hours, minutes] = timeString.split(':').map(Number);

  // 오후/오전 구분
  const isPM = hours >= 12;
  const formattedHours = isPM ? hours - 12 : hours;

  // 12시인 경우는 '12'로 표시
  const displayHours = formattedHours === 0 ? 12 : formattedHours;

  // 오전/오후 표시
  const period = isPM ? '오후' : '오전';

  // 분이 0이 아닐 경우 "시"와 "분" 모두 표시
  return minutes > 0 ? `${period} ${displayHours}시 ${minutes}분` : `${period} ${displayHours}시`;
};
