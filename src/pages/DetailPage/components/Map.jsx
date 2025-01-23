import React, { useEffect } from "react";

export default function KaKaoMap({ latitude, longitude }) {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 6,
    };
    const map = new window.kakao.maps.Map(container, options);

    const markerPosition  = new kakao.maps.LatLng(latitude, longitude); 

    const marker = new kakao.maps.Marker({
      position: markerPosition
    });

    marker.setMap(map);


    console.log("Latitude:", latitude, "Longitude:", longitude),
    console.log("kakao.maps.LatLng:", new window.kakao.maps.LatLng(latitude, longitude));
  }, [latitude, longitude]);

  return <div id="map" className="w-full h-[215px]"></div>;
}
