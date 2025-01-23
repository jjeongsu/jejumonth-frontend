import { Outlet } from 'react-router';
import Aside from './components/aside/Aside';

const MyPage = () => {
  return (
    <>
      <section className="w-962 h-auto mx-auto mt-120 flex justify-between gap-70">
        <Aside></Aside>
        <Outlet></Outlet>
      </section>
    </>
  );
};

export default MyPage;
