import { Outlet } from 'react-router-dom';

const PlanLayout = () => {
  return (
    <div className="w-full max-w-560 mx-auto flex flex-col h-full">
      <div className="text-red-600 h-70">헤더가 이곳에 표시됩니다.</div>
      <Outlet />
      <div className="text-red-600 h-70 ">푸터가 이곳에 표시됩니다.</div>
    </div>
  );
};

export default PlanLayout;
