import { Modal } from 'antd';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { postTripApi } from '../../apis/supabaseApi.js';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/index.jsx';

const AddTripPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  const handleSubmit = async () => {
    try {
      const result = await postTripApi('test', state);
      const message = result[0].start_date + ' 부터 ' + result[0].end_date + ' 까지의 일정이 생성됐습니다.';
      const tripId = result[0].trip_id;
      Modal.success({
        title: 'Success',
        content: message,
        onOk() {
          navigate(`/trip/my?trip_id=${tripId}`)
        },
        okButtonProps : {
          style: {
            backgroundColor: '#FDBA74',
          }
        }
      });
    } catch (error) {
      console.error(error);
      Modal.error({
        title: '일정 생성에 문제가 생겼어요',
        content: '같은 문제가 반복된다면 브라우저를 껐다 켜주세요.',
        okButtonProps : {
          style: {
            backgroundColor: '#FDBA74',
          }
        }
      });
    }
  };

  return (
    <>
      <div className="font-extrabold text-48 text-gray-8 mb-10">여행 일정 등록</div>
      <div className="font-semibold text-16 text-gray-6 mb-25">
        여행을 시작할 날짜, 종료할 날짜를 선택해주세요.
      </div>
      <div className="grid place-items-center">
        <div className="h-412 border-solid border-gray-200 border-[1px] mb-25">
          <DateRangePicker
            onChange={item => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            color="#FF7900"
            locale={ko}
            ranges={state}
            direction="horizontal"
            preventSnapRefocus={true}
            calendarFocus="backwards"
          />
        </div>
        <div className="w-100">
          <Button type="button" label="일정 생성" onClick={handleSubmit}>
            다음
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddTripPage;
