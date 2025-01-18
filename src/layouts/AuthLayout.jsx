import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full max-w-962  mx-auto flex flex-col h-full">
        <div className="text-red-600 h-70">헤더가 이곳에 표시됩니다.</div>
        <div className="w-314 mx-auto flex-1">
          <Outlet />
        </div>
        <div className="text-red-600 h-70 ">푸터가 이곳에 표시됩니다.</div>
      </div>
    </div>
  );
};

export default AuthLayout;
