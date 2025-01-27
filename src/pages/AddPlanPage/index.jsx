import { useNavigate } from 'react-router';
import { useState } from 'react';
import RegisterDayAndTime from './components/RegisterDayAndTime.jsx';
import Search from './components/Search.jsx';
import Detail from './components/Detail.jsx';
import { useFetchTrip, usePostPlan } from '@/hooks/react-query';
import useQueryString from '@/hooks/useQueryString.js';

const AddPlanPage = () => {
  const navigate = useNavigate();
  const [tripId, initialTargetDate] = useQueryString(['trip_id', 'date']);
  const [step, setStep] = useState('SEARCH'); // * SEARCH | DETAIL | TIME
  const [registerData, setRegisterData] = useState({});
  const [detail, setDetail] = useState();

  const [search, setSearch] = useState({
    category: 'all',
    submitKeyword: '',
  });

  const { trip, isLoading } = useFetchTrip(tripId);
  const { postPlanMutation } = usePostPlan(tripId);

  // 최종 일정 생성 "확인"버튼을 눌렀을 때 작동하는 핸들러
  const onRegister = async data => {
    console.log('시간등록 컴포넌트에서 전달받는 데이터', data); // day, time 전달
    const planData = {
      trip_id: tripId,
      date: data.day,
      time: data.time,
      ...registerData,
    };
    await postPlanMutation.mutate({ ...planData });
  };

  const handleBackClick = () => {
    navigate(`/trip/my?trip_id=${tripId}`); // TODO 이렇게 하면 다시 돌아갈때마다 API가 호출되는 문제가 존재
  };

  if (isLoading) {
    return;
  }
  const { start_date: startDate, end_date: endDate } = trip[0];
  const RegisterTimeProps = {
    startDate,
    endDate,
    initialTargetDate,
    onRegister,
    place: registerData.place_name,
  };

  return (
    <div>
      {step === 'SEARCH' && (
        <Search
          search={search}
          setSearch={setSearch}
          onBackClick={handleBackClick}
          onNext={data => {
            // "장소 이미지 "클릭시
            setDetail(data);
            setStep('DETAIL');
          }}
          onSkipDetail={data => {
            // "선택"버튼 클릭시
            setRegisterData(prev => ({ ...prev, ...data }));
            setStep('TIME');
          }}
        />
      )}

      {step === 'DETAIL' && (
        <Detail
          onBackClick={() => {
            setStep('SEARCH');
            setDetail('');
          }}
          contentId={detail}
          onNext={data => {
            // 일정 생성 클릭시
            setRegisterData(prev => ({ ...prev, ...data }));
            setStep('TIME');
          }}
        />
      )}

      {step === 'TIME' && (
        <div className=" h-full">
          <RegisterDayAndTime {...RegisterTimeProps} />
        </div>
      )}
    </div>
  );
};

export default AddPlanPage;
