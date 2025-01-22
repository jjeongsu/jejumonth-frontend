import { useEffect, useState } from 'react';
import DayCard from './components/DayCard.jsx';
import PlanCard from './components/PlanCard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPlanApi, getTripApi } from '../../apis/supabaseApi.js';

const { kakao } = window;

const MyTripPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tripId = queryParams.get('trip_id');
  const [datesData, setDatesData] = useState([]);

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

  const getTripAndPlanInfo = async () => {
    try {
      const tripResult = await getTripApi('test', tripId);
      const allDates = getDates(tripResult[0].start_date, tripResult[0].end_date);
      const tempDatesData = [];
      for (const date of allDates) {
        tempDatesData[date] = [];
      }
      const planResult = await getPlanApi('test', tripId);
      for (const planInfo of planResult) {
        if (tempDatesData[planInfo.date]) {
          tempDatesData[planInfo.date].push(planInfo);
        }
      }
      setDatesData(tempDatesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(datesData);
  }, [datesData]);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.39, 126.55),
      level: 10,
    };
    const map = new kakao.maps.Map(container, options);
    getTripAndPlanInfo();
  }, []);

  return (
    <>
      <div className="text-48 font-extrabold text-gray-8">제주 여행</div>
      <div className="flex mt-30">
        <div
          className="grid h-632 w-397 overflow-auto"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {Object.keys(datesData).map((date, i) => (
            <DayCard key={i} number={i} date={date}>
              {datesData[date].map((plan, i) => (
                <PlanCard key={plan.id} />
              ))}
            </DayCard>
          ))}
        </div>
        <div id="map" className="w-813 h-632 ml-24"></div>
      </div>
    </>
  );
};

export default MyTripPage;
