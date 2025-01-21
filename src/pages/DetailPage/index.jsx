import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaceBySearchApi } from "../../apis/visitJejuApi";

const DetailPage = () => {
  const { contentsid } = useParams(); 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_VISITJEJU_APIKEY; 
        const response = await fetch(
          `https://api.visitjeju.net/vsjApi/contents/searchList?locale=kr&cid=${contentsid}&item=1&apiKey=${apiKey}`
          // getPlaceBySearchApi(contentsid) // 에러 발생: Unexpected token '<', "<!doctype "... is not valid JSON
        );
        if (!response.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
        const result = await response.json();
        setData(result.items[0]); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contentsid]);

  if (loading) return <div className="text-center mt-20">로딩 중...</div>;

  if (error) return <div className="text-center mt-20">에러 발생: {error}</div>;

  if (!data) return <div className="text-center mt-20">데이터가 없습니다.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="text-2xl font-bold mb-4">{data.title}</header>
      <img
        src={data.repPhoto.photoid.imgpath}
        alt={data.repPhoto.descseo}
        className="w-full h-64 object-cover rounded-lg shadow-md"
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Info</h2>
        <p className="mt-2">{data.introduction}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">About</h2>
        <ul className="mt-2 space-y-2">
          <li><strong>주소:</strong> {data.roadaddress}</li>
          <li><strong>전화번호:</strong> {data.phoneno}</li>
          <li><strong>우편번호:</strong> {data.postcode}</li>
        </ul>
      </div>
      <div className="mt-6">
        <div className="mt-10">지도자리</div>
        {/* <iframe
          title="지도"
          src={`https://www.google.com/maps?q=${data.latitude},${data.longitude}&hl=ko&z=14&output=embed`}
          className="w-full h-64 rounded-lg shadow-md"
          loading="lazy"
        /> */}
      </div>
    </div>
  );
};

export default DetailPage;