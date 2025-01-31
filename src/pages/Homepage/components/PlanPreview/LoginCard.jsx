import PNG_IMAGES from '@public/images/image.js';
import { Link } from 'react-router';

const LoginCard = () => {
  return (
    <div className="flex flex-col  items-center h-full gap-10 pt-80">
      <span className="font-medium text-16 text-gray-7">
        <span className="text-12 block mb-3">일정이 존재하지 않아요...😢</span>
        <br />
        로그인 후 <span className="font-bold text-primary-0 text-18">JEJUMONTH</span> 의
        <br />더 많은 기능을 사용해보세요!{' '}
      </span>
      <Link
        to="/auth"
        className="w-full border border-solid border-gray-5 flex justify-center items-center gap-20 px-10 py-15 rounded-5 hover:bg-gray-3 mt-10 "
      >
        <img src={PNG_IMAGES.dummyUser} className="w-30 h-30" />
        <span className="text-gray-7 font-semibold hover:font-extrabold"> login JEJUMONTH</span>
      </Link>
    </div>
  );
};
export default LoginCard;
