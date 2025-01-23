import React from "react";
import KaKaoMap from "./Map";

const Detail = ({ data }) => {
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-slate-50">
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
        <p className="text-base text-black leading-7">{data.introduction || "설명이 없습니다."}</p>

        <p className="text-base text-black leading-7 mt-4">
          제주도는 대한민국의 대표적인 섬으로, 아름다운 자연 경관과 독특한 문화로 유명합니다.
          제주도는 한라산을 중심으로 다양한 관광 명소를 가지고 있으며, 세계자연유산으로 등재된 지역입니다.
          돌하르방과 감귤은 제주를 상징하는 대표적인 아이콘 중 하나입니다.
          특히 성산일출봉과 용머리해안은 많은 여행객들이 방문하는 인기 명소입니다.
          제주 해안은 맑고 푸른 바다로 둘러싸여 있어 휴양지로도 인기가 높습니다.
          제주도는 전통과 현대가 어우러진 독특한 문화를 자랑합니다.
          또한 제주 올레길은 걷기 여행을 좋아하는 사람들에게 큰 사랑을 받고 있습니다.
          흑돼지, 갈치, 고등어회 등 제주도에서만 즐길 수 있는 다양한 음식이 풍부합니다.
          사계절 모두 각기 다른 매력을 제공하며, 특히 봄과 가을은 관광객들에게 인기 있는 시즌입니다.
          제주도는 편리한 교통망과 다양한 숙박시설로 누구나 쉽게 방문할 수 있는 관광지입니다.
        </p>
        <div className="my-4">
          <div className="border-t-2 border-gray-900 mx-auto w-[90%]" style={{ margin: "10px 0" }}></div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-800">📍 지도</h2>
          <div className="w-full h-[215px]">
            <KaKaoMap latitude={data?.latitude || 37.5665} longitude={data?.longitude || 126.9780} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-800">📍 About</h2>
          <ul className="space-y-12 h-[215px]">
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

