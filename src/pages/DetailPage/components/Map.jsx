import React, { useEffect } from "react";

export default function KaKaoMap({ latitude, longitude }) {
  useEffect(() => {
    const script = document.createElement("script");
    const kakaoApiKey = import.meta.env.VITE_KAKAOMAP_KEY;

    if (!kakaoApiKey) {
      console.error("Kakao API Key is missing");
      return;
    }

    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}`;
    script.async = true;
    script.onload = () => {
      console.log("Kakao Map script loaded successfully");
      const container = document.getElementById("map");
      if (!container) {
        console.error("Map container not found");
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
      console.error("Failed to load Kakao Map script");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  return <div id="map" className="w-full h-96"></div>;
}
