export default function formatAddress(address) {
  // 정규식을 사용하여 주소에서 '시/군/구'와 '읍/면/동' 추출
  const match = address.match(/([가-힣]+시|[가-힣]+군|[가-힣]+구).*?([가-힣]+(읍|면|동))/);

  if (match) {
    const cityOrDistrict = match[1]; // '시/군/구' 부분
    const townOrVillage = match[2]; // '읍/면/동' 부분
    return `${cityOrDistrict} > ${townOrVillage}`;
  }

  // 매칭되지 않을 경우 원래 주소 반환
  return address;
}
