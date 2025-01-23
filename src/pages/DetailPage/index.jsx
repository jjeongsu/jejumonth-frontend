import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaceByExplanationApi } from '../../apis/visitJejuApi';
import Detail from './components/Detail';

const DetailPage = () => {
  const { contentsid } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_VISITJEJU_KEY;
        const response = await fetch(
          `https://api.visitjeju.net/vsjApi/contents/searchList?locale=kr&cid=${contentsid}&item=1&apiKey=${apiKey}`,
        );
        // `https://api.visitjeju.net/vsjApi/contents/searchList?locale=kr&cid=${contentsid}&item=1&apiKey=${apiKey}`
        // getPlaceByExplanationApi(contentsid) // 에러 발생: Unexpected token '<', "<!doctype "... is not valid JSON
        if (!response.ok) throw new Error('데이터를 가져오는 데 실패했습니다.');
        let result = await response.json();
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

  console.log('DetailPage loaded');
  return (
    <div>
      <Detail data={data} />
    </div>
  );
};

export default DetailPage;
