/**
 * 현재 시간을 기준으로 상대적인 시간을 나타냅니다.
 * ex: "방금 전", "3시간 전", "2일 전"
 *
 * @param {string | Date} postTime - 생성 및 업데이트 시간 (Date 객체)
 * @returns {string} (예: "방금 전", "5시간 전")
 */

const timeFormatter = postTime => {
  const currentTime = new Date();
  const postData = new Date(postTime);
  const timeDifference = currentTime - postData;
  const hourDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  const formatterText =
    hourDifference < 1
      ? '방금 전'
      : hourDifference < 24
        ? `${hourDifference}시간 전`
        : `${Math.floor(hourDifference / 24) === 1}`
          ? `하루 전`
          : `${Math.floor(hourDifference / 24)}일 전`;

  return formatterText;
};

export default timeFormatter;
