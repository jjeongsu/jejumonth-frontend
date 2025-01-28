import { Outlet } from 'react-router-dom';
import Header from '@components/common/Header';

const AuthLayout = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full max-w-962  mx-auto flex flex-col h-full">
        <div className="h-70">
          <Header />
        </div>
        <div className="w-314 mx-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
