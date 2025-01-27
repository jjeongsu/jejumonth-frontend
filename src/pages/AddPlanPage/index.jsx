import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTripApi, postPlanApi } from '../../apis/supabaseApi.js';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import RegisterDayAndTime from './components/RegisterDayAndTime.jsx';
import Search from './components/Search.jsx';
import Detail from './components/Detail.jsx';

const AddPlanPage = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const queryParams = new URLSearchParams(location.search);
  const initialTargetDate = queryParams.get('date'); // 사용자가 새로운 plan을 만드려는 date
  const tripId = queryParams.get('trip_id');
  const [step, setStep] = useState('SEARCH'); // * SEARCH | DETAIL | TIME
  const [registerData, setRegisterData] = useState({});
  const [detail, setDetail] = useState();
  // tripId를 기반으로 현재 여행 시작일, 종료일을 가져오기
  const { data: tripData, isLoading } = useQuery({
    queryKey: ['trip', tripId],
    //queryFn: () => getTripApi(userId, tripId), 실제로 동작해야하는 코드
    queryFn: () => getTripApi('test', 30), // 테스트용
  });

  // 최종 plan data를 서버에 등록
  // 내부 인자 객체로 분리
  const uploadPlanMutation = useMutation({
    mutationFn: postPlanApi,
    onSuccess: async () => {
      console.log('성공적으로 plan 데이터를 보냈습니다.');
      await queryClient.invalidateQueries({
        queryKey: ['plans', tripId],
      });
    },
    onError: error => {
      console.log('plan데이터를 보내는데 실패하였습니다.', error);
    },
  });

  // 최종 일정 생성 "확인"버튼을 눌렀을 때 작동하는 핸들러
  const onRegister = async data => {
    console.log('시간등록 컴포넌트에서 전달받는 데이터', data); // day, time 전달
    const planData = {
      trip_id: tripId,
      date: data.day,
      time: data.time,
      ...registerData,
    };
    await uploadPlanMutation.mutate({ ...planData });
  };

  const handleBackClick = () => {
    //navigate(`/trip/my?trip_id=${tripId}`); // TODO 이렇게 하면 다시 돌아갈때마다 API가 호출되는 문제가 존재
    console.log('뒤로가기 버튼 클릭');
  };

  if (isLoading) {
    return;
  }
  const { start_date: startDate, end_date: endDate } = tripData[0];
  const RegisterTimeProps = {
    startDate,
    endDate,
    initialTargetDate,
    onRegister,
    place: registerData.place_name,
  };

  console.log('current step', step);
  console.log('current registerdata', registerData);
  console.log('detail', detail);
  return (
    <div>
      {step === 'SEARCH' && (
        <Search
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
