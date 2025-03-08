import { NavLink } from 'react-router-dom';
import NavLinkComponent from '../components/NavLinkComponent';
import { FcPortraitMode } from 'react-icons/fc';
import { CgPassword } from 'react-icons/cg';
import { SidebarComponentProps, UserState } from '../constants/types';
import { GoDotFill } from 'react-icons/go';
import { useSelector } from 'react-redux';

const GeneralDropDownMenu = ({
  toggle,
  handleCloseToggle,
}: SidebarComponentProps) => {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );
  return (
    <div className="flex flex-col items-start mr-5 mt-3 gap-3 font-bold">
      <NavLink
        to={
          currentUser.role === 'trader'
            ? '/trader/dashboard'
            : currentUser.role === 'customer'
            ? '/customer/dashboard'
            : ''
        }
        onClick={handleCloseToggle}
        className={(isActive) => NavLinkComponent(isActive)}
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <FcPortraitMode className="text-xl" />
        </span>
        <span
          className={[toggle ? 'hidden' : 'block', 'flex items-center'].join(
            ' '
          )}
        >
          <GoDotFill />
          Dashboard
        </span>
      </NavLink>

      <NavLink
        to="/change-password"
        onClick={handleCloseToggle}
        className={(isActive) => NavLinkComponent(isActive)}
      >
        <span className={toggle ? 'block' : 'hidden'}>
          <CgPassword className="text-xl " />
        </span>
        <span
          className={[
            toggle ? 'hidden' : 'block',
            'flex items-center text-[13px]',
          ].join(' ')}
        >
          <GoDotFill />
          Change Password
        </span>
      </NavLink>
    </div>
  );
};

export default GeneralDropDownMenu;
