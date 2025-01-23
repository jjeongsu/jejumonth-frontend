import { Outlet } from 'react-router';
import Aside from './components/aside/Aside';

const MyPage = () => {
  return (
    <>
      <header className="w-full bg-orange-500">헤더구역</header>
      <section className="w-962 h-auto mx-auto mt-120 flex justify-between gap-70">
        <Aside></Aside>
        <Outlet></Outlet>
      </section>
      <footer>푸터구역</footer>
    </>
  );
};

export default MyPage;
