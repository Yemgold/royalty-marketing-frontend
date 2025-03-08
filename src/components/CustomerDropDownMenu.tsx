import { SidebarComponentProps } from '../constants/types';
import { NavLink } from 'react-router-dom';
import NavLinkComponent from './NavLinkComponent';
import { FcPortraitMode } from 'react-icons/fc';
import { GoDotFill } from 'react-icons/go';

const CustomerDropDownMenu = ({
  toggle,
  handleCloseToggle,
}: SidebarComponentProps) => {
  return (
    <div className="flex flex-col items-start ml-[-10px] mr-5 mt-3 gap-3 font-bold">
      <NavLink
        to="/customer/booking-goods"
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
          Booking goods
        </span>
      </NavLink>

      <NavLink
        to="/customer/bid-for-products"
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
          Bid for products
        </span>
      </NavLink>

      <NavLink
        to="/customer/transfer-referral-cash"
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
          Referral cash
        </span>
      </NavLink>

      <NavLink
        to="/customer/withdraw-cash"
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
          Withdraw cash
        </span>
      </NavLink>
    </div>
  );
};

export default CustomerDropDownMenu;
