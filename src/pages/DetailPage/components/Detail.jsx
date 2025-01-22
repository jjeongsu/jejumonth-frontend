import React from "react";
import KaKaoMap from "./Map";

const Detail = ({ data }) => {
  if (!data) return <div>데이터가 없습니다.</div>;

  console.log("Detail Data:", data);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-[#EFF2F7]">
      <div className="relative rounded-lg overflow-hidden shadow-md mb-8">
        <img
          src={data.repPhoto.photoid.imgpath}
          alt={data.repPhoto.descseo}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 flex items-end justify-start bg-black bg-opacity-40 p-4">
          <h1 className="text-4xl font-bold text-white">{data.title}</h1>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-800 mb-4">🔎 Info</h2>
        <p className="text-base text-black leading-7">{data.description || "설명이 없습니다."}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-800">📍 지도</h2>
          {/* <KaKaoMap latitude={data.latitude} longitude={data.longitude} /> */}
          <iframe 
            src={`https://map.kakao.com/link/map/${data.latitude},${data.longitude}`}
            className="w-[390] h-[215]"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-800">📍 About</h2>
          <ul className="space-y-4">
            <li>
              <p className="text-lg font-bold text-[#8c8c8c]">소개</p>
              <p className="text-base text-[#434343] leading-6">{data.introduction}</p>
            </li>
            <li>
              <p className="text-lg font-bold text-[#8c8c8c]">주소</p>
              <p className="text-base text-[#434343] leading-6">{data.roadaddress}</p>
            </li>
            <li>
              <p className="text-lg font-bold text-[#8c8c8c]">전화번호</p>
              <p className="text-base text-[#434343] leading-6">{data.phoneno}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detail;
