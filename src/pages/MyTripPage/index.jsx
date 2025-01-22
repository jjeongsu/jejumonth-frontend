import { useEffect, useState } from 'react';
import DayCard from '../AddTripPage/components/DayCard.jsx';
import PlanCard from '../AddTripPage/components/PlanCard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTripApi } from '../../apis/supabaseApi.js';

const { kakao } = window;

const MyTripPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tripId = queryParams.get('trip_id');
  const [dates, setDates] = useState([]);

  const getDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    while (start <= end) {
      dates.push(new Date(start).toISOString().split('T')[0]);
      start.setDate(start.getDate() + 1);
    }

    return dates;
  };

  const getTripInfo = async () => {
    try {
      const result = await getTripApi('test', tripId);
      const allDates = getDates(result[0].start_date, result[0].end_date);
      setDates(allDates);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.39, 126.55),
      level: 10,
    };
    const map = new kakao.maps.Map(container, options);
    getTripInfo();
  }, []);

  return (
    <>
      <div className="text-48 font-extrabold text-gray-8">제주 여행</div>
      <div className="flex">
        <div
          className="grid h-632 w-397 overflow-auto"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {dates.map((date, i) => (
            <DayCard key={i} number={i} date={date} />
          ))}
        </div>
        <div id="map" className="w-813 h-632 ml-24"></div>
      </div>
    </>
  );
};

export default MyTripPage;
