import { Outlet } from 'react-router-dom';

const TripLayout = () => {
  return (
    <div className="w-full max-w-1234 mx-auto flex flex-col h-full">
      <div className="text-red-600 h-70">헤더가 이곳에 표시됩니다.</div>
      <Outlet />
      <div className="text-red-600 h-70 ">푸터가 이곳에 표시됩니다.</div>
    </div>
  );
};

export default TripLayout;
