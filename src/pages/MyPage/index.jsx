import { Outlet } from 'react-router';
import Aside from './components/aside/Aside';

const MyPage = () => {
  return (
    <>
      <section className="w-962 h-auto mx-auto mt-120 flex justify-between relative">
        <Aside></Aside>
        <article className="w-[70%] absolute right-0">
          <Outlet></Outlet>
        </article>
      </section>
    </>
  );
};

export default MyPage;
