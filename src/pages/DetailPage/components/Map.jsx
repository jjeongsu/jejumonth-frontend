import React, { useEffect } from "react";

export default function KaKaoMap({ latitude, longitude }) {
  useEffect(() => {
    const script = document.createElement("script");
    const kakaoApiKey = import.meta.env.VITE_KAKAOMAP_KEY;

    if (!kakaoApiKey) {
      console.error("API 키 없음!");
      return;
    }

    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}`;
    script.async = true;
    script.onload = () => {
      console.log("카카오맵 불러오기 성공!");
      const container = document.getElementById("map");
      if (!container) {
        console.error("카카오맵 컨테이너가 없음");
        return;
      }
      console.log("window.kakao:", window.kakao);

      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    };
    script.onerror = () => {
      console.error("카카오맵 불러오기 실패");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  return <div id="map" className="w-full h-96"></div>;
}
