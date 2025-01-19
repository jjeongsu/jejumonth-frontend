import { Button, Alert } from 'antd';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import {ko} from 'date-fns/locale';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { postTripApi } from '../../apis/supabaseApi.js';
import MyTripPage from './MyTrip.jsx'; // theme css file

export default function TripPage() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  const [apiStatus, setApiStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const result = await postTripApi('jake313', state);
      setMessage(result[0].start_date + ' 부터' + result[0].end_date + ' 까지의 일정이 생성됐습니다.')
      setApiStatus('success');
    } catch (error) {
      console.error(error);
      setApiStatus('error');
      setMessage(error);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', alignContent: 'center' }}>
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
      <Button onClick={handleSubmit}>다음</Button>
      {apiStatus ? (
        apiStatus === 'success' ? (
          <Alert
            message="일정 생성 성공!"
            description={message}
            type="success"
            showIcon
          />
        ) : (
          <Alert
            message="Error"
            description="This is an error message about copywriting."
            type="error"
            showIcon
          />
        )
      ) : null}
    </div>
  );

}