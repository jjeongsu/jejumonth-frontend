import { Outlet } from 'react-router-dom';
import Header from '@components/common/Header';
import Footer from '@components/common/Footer';

const DefaultLayout = () => {
  return (
    <div>
      <div className="w-full max-w-962 mx-auto h-full">
        <div className="h-70">
          <Header />
        </div>

        <Outlet />

      </div>
      <div className='w-full h-70 mt-10'>
          <Footer />
      </div>
    </div>

  );
};

export default DefaultLayout;
