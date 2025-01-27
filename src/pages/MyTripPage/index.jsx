import { createContext, useEffect, useState } from 'react';
import DayCard from './components/DayCard.jsx';
import PlanCard from './components/PlanCard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPlanApi, getTripApi } from '../../apis/supabaseApi.js';
import PopUpCard from './components/PopUpCard.jsx';

const { kakao } = window;

export const CurrentPopUpPlanContext = createContext(null);

const MyTripPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tripId = queryParams.get('trip_id');
  const [datesData, setDatesData] = useState([]);
  const [planForPopUp, setPlanForPopUp] = useState({});

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

  const handleDelete = () => {
    console.log('delete');
  }

  const handleUpdate = () => {

  }

  // 디버깅 용
  useEffect(() => {
    console.log(datesData);
    console.log(planForPopUp);
  }, [datesData,planForPopUp]);

  useEffect(() => {
    if(Object.hasOwn(planForPopUp, 'lat')) {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(planForPopUp.lat,planForPopUp.lng),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);

      const markerPosition  = new kakao.maps.LatLng(planForPopUp.lat,planForPopUp.lng);

      const marker = new kakao.maps.Marker({
        position: markerPosition
      });

      marker.setMap(map);
    }
  }, [planForPopUp]);

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
      <div className="flex relative mt-30">
        {/* TODO useContext를 일부분에만 감싸서 렌더링 감소 효과를 볼 수 있을듯?*/}
        <CurrentPopUpPlanContext.Provider
          value={{
            planForPopUp,
            setPlanForPopUp,
          }}
        >
          <div
            className="grid h-632 w-397 overflow-auto"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {Object.keys(datesData).map((date, i) => (
              <DayCard key={i} dayNumber={i+1} date={date} count={datesData[date].length}>
                {datesData[date].map((plan) => (
                  <PlanCard key={plan.id} plan={plan} dayNumber={i+1} totalDates={Object.keys(datesData).length}/>
                ))}
              </DayCard>
            ))}
          </div>
          <div id="map" className="w-813 h-632 ml-24"></div>
          {Object.hasOwn(planForPopUp,'content_id') && (
            <PopUpCard
              plan={planForPopUp}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          )}
        </CurrentPopUpPlanContext.Provider>
      </div>
    </>
  );
};

export default MyTripPage;
