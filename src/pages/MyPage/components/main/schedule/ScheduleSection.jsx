import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteTripApi, getAllTripsApi } from '../../../../../apis/supabaseApi';
import { Link } from 'react-router';
import MyPageHeader from '../common/myPageHeader';
import NoContent from '../common/NoContent';

const ScheduleSection = () => {
  const [scheduleData, setScheduleData] = useState([]);

  const { userId } = useSelector(state => state.user);

  const fetchScheduleData = async userId => {
    try {
      const response = await getAllTripsApi(userId);
      console.log(response);

      setScheduleData(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    fetchScheduleData(userId);
  }, [userId]);

  const deleteScheduleHandler = async tripID => {
    try {
      console.log(tripID);
      const response = await deleteTripApi(userId, tripID);
      setScheduleData(prevList => prevList.filter(schedule => schedule.trip_id !== tripID));

      console.log(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  const totalDay = (startDay, endDay) => {
    const startDate = new Date(startDay);
    const endDate = new Date(endDay);

    const totalDay = endDate.getTime() - startDate.getTime();

    return totalDay / (1000 * 60 * 60 * 24) + 1;
  };

  return (
    <>
      <MyPageHeader title={'여행 일정'}></MyPageHeader>
      <div className="mt-24">
        {scheduleData.length > 0 ? (
          scheduleData.map((schedule, index) => (
            <div
              className="w-full pt-40 px-20 pb-50 border-t border-t-gray-5 border-solid"
              key={schedule.trip_id}
            >
              <Link to={`/trip/my?trip_id=${schedule.trip_id}`}>
                <div className="w-full flex justify-between">
                  <div>
                    <p className="text-gray-7">
                      {schedule.start_date} ~ {schedule.end_date} 총 (
                      {totalDay(schedule.start_date, schedule.end_date)}일)
                    </p>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => deleteScheduleHandler(schedule.trip_id)}
                  >
                    <img src="/icons/delete.svg" alt="삭제 아이콘" />
                  </div>
                </div>

                <div>
                  <h3 className="text-24 text-gary-8 mt-16">{index + 1}번째 여행</h3>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <NoContent>일정을 등록해주세요!</NoContent>
        )}
      </div>
    </>
  );
};

export default ScheduleSection;
