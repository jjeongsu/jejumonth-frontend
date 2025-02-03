import { useEffect } from 'react';
import { deleteTripApi, getAllTripsApi } from '../../../../apis/supabaseApi';
import { useState } from 'react';

const ScheduleSection = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await getAllTripsApi('test');
        console.log(response);

        setScheduleData(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchScheduleData();
  }, []);

  const deleteScheduleHandler = async tripID => {
    try {
      console.log(tripID);
      const response = await deleteTripApi('test', tripID);
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
      <div>
        <h2 className="text-24 text-gray-13 font-semibold">
          <strong className="text-primary-0">username</strong> 님이 여행 일정
        </h2>
      </div>

      <div className="mt-24">
        {scheduleData.map((schedule, index) => (
          <div
            className="w-full pt-40 px-20 pb-50 border-t border-t-gray-5 border-solid"
            key={schedule.trip_id}
          >
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
          </div>
        ))}
      </div>
    </>
  );
};

export default ScheduleSection;
