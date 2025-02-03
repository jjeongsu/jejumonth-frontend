import React, { useState, useEffect } from "react";
import KaKaoMap from "./Map";
import DummyIndex from "./DummyIndex"
import Phone from "/icons/phone.svg";
import Position from "/icons/position.svg";
import WishlistButton from "./WishlistButton";

const SkeletonDetail = () => (
  <div className="animate-pulse max-w-4xl mx-auto p-4 mb-10 bg-gray-200">
    <div className="relative rounded-lg overflow-hidden shadow-md mb-8 h-[400px] bg-gray-300"></div>
    <div className="h-10 bg-gray-300 w-3/4 mb-4"></div>
    <div className="h-6 bg-gray-300 w-full mb-2"></div>
    <div className="h-6 bg-gray-300 w-5/6 mb-2"></div>
    <div className="h-6 bg-gray-300 w-4/5"></div>
    <div className="mt-10 grid grid-cols-2 gap-4">
      <div className="h-[215px] bg-gray-300"></div>
      <div className="space-y-4">
        <div className="h-6 bg-gray-300 w-3/4"></div>
        <div className="h-6 bg-gray-300 w-5/6"></div>
      </div>
    </div>
    <div className="mt-10 p-6 bg-gray-300 rounded-lg h-40"></div>
  </div>
);

const Detail = ({ data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setTimeout(() => setLoading(false), 1500);
    }
  }, [data]);

  if (loading) return <SkeletonDetail />;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <div className="max-w-962 mx-auto p-4 mb-100">
      <div className="mb-10 text-m text-gray-7">
        {data.region1cd?.label || "제주"} &gt; {" "}
        <span className="text-lg text-gray-10">
          {data.region2cd?.label || "제주시"}
        </span>
      </div>
      <div className="relative rounded-xl overflow-hidden shadow-md mb-30">
        <img
          src={data.repPhoto.photoid.imgpath}
          alt={data.repPhoto.descseo}
          className="w-full h-[270px] object-cover"
        />
        <div className="absolute inset-0 flex items-end justify-start bg-black bg-opacity-40 p-20">
          <h1 className="text-4xl font-bold text-white">{data.title}</h1>
        </div>
      </div>
      <section>
        <div className="flex items-center justify-between mt-11">
          <h2 className="text-2xl font-bold text-neutral-800">🔎 Info</h2>
          <WishlistButton placeInfo={data} />
        </div>
        <div className="p-20">
          <p className="text-lg font-bold text-neutral-800 mt-6">{data.introduction || "설명이 없습니다."}</p>
          <DummyIndex />
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-800 mb-20">📍 About</h2>
          <div className="w-full h-[215px] mt-10">
            <KaKaoMap latitude={data?.latitude || 37.5665} longitude={data?.longitude || 126.9780} />
          </div>
        </div>
        <div className="space-y-4 mt-30">
          <ul className="space-y-12 h-[215px] p-20">
            <li className="mb-30 flex item-center gap-4">
              <img src={Position} alt="position" className="w-20 h-20 pt-6" />
              <div>
                <p className="text-lg font-bold text-[#8c8c8c]">주소</p>
                <p className="text-base text-[#434343] leading-6">{data.roadaddress}</p>
              </div>
            </li>
            <li className="flex item-center gap-4">
              <img src={Phone} alt="phone" className="w-20 h-20 pt-6" />
              <div>
                <p className="text-lg font-bold text-[#8c8c8c]">전화번호</p>
                <p className="text-base text-[#434343] leading-6">{data.phoneno}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detail;
