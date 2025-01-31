import { Outlet } from 'react-router-dom';
import Header from '@components/common/Header';
import Footer from '@components/common/Footer';

const DefaultLayout = () => {
  return (
    <div className="w-full max-w-962 mx-auto h-full">
      <div className="h-70">
        <Header />
      </div>

      <Outlet />

      <div className="h-70">
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
