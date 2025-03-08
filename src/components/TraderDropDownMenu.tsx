import { FcPortraitMode } from 'react-icons/fc';
import NavLinkComponent from './NavLinkComponent';
import { NavLink } from 'react-router-dom';
import { GoDotFill } from 'react-icons/go';
import { SidebarComponentProps } from '../constants/types';

const TraderDropDownMenu = ({
  toggle,
  handleCloseToggle,
}: SidebarComponentProps) => {
  return (
    <div className="flex flex-col items-start ml-[-10px] mr-5 mt-3 gap-3 font-bold">
      <NavLink
        to="/trader/submit-payment"
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
          Submit Payment
        </span>
      </NavLink>

      <NavLink
        to="/trader/create-sales-target"
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
          Sales Target
        </span>
      </NavLink>

      <NavLink
        to="/trader/send-royalty-coins"
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
          Send Coins
        </span>
      </NavLink>
    </div>
  );
};

export default TraderDropDownMenu;
