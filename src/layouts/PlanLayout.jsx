import { Outlet } from 'react-router-dom';

const PlanLayout = () => {
  return (
    <div className="w-full max-w-560 mx-auto flex flex-col h-screen">
      <div className="text-red-600 h-70">헤더가 이곳에 표시됩니다.</div>
      <div className="flex-1 h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default PlanLayout;
