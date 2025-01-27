import { NavLink } from 'react-router';
import Logo from '@public/icons/jejumonth-logo';
import './style.css';
const Header = () => {
  return (
    <div className="flex flex-row items-center place-content-between mt-27  ">
      <div className="items-center">
        <NavLink to="/">
          <Logo width={128} height={28} />
        </NavLink>
      </div>

      <div className="flex gap-120 items-center">
        <div className="flex gap-29 text-gray-8">
          <NavLink to="/community" className="font-semibold text-15">
            커뮤니티
          </NavLink>
          <NavLink to="/trip/add-trip" className="font-semibold text-15">
            여행계획
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth">
            <div className="neuromorphism rounded-full w-100 h-34 flex items-center justify-center font-semibold text-gray-7">
              login
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Header;
