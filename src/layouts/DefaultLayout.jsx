import { Outlet } from 'react-router-dom';
import Header from '@components/common/Header';
const DefaultLayout = () => {
  console.log('hello');

  return (
    <div className="w-full max-w-962 mx-auto h-full">
      <div className="h-70">
        <Header />
      </div>

      <Outlet />

      <div className="text-red-600 bg-red-200 h-70">푸터가 이곳에 표시됩니다.</div>
    </div>
  );
};

export default DefaultLayout;
