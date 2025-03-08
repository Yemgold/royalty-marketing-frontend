import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { UserState } from '../constants/types';
import { useState } from 'react';
import GeneralSidebar from './SidebarComponents/GeneralSidebar';
import AdminSidebar from './SidebarComponents/AdminSidebar';
import SuperAdminSidebar from './SidebarComponents/SuperAdminSidebar';
import LogoutComponent from './LogoutComponent';
import TraderSidebar from './SidebarComponents/TraderSidebar';
import CustomerSidebar from './SidebarComponents/CustomerSidebar';
import { MdAccountBalanceWallet } from 'react-icons/md';

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  const [generalMenuOpen, setGeneralMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [traderMenuOpen, setTraderMenuOpen] = useState(false);
  const [customerMenuOpen, setCustomerMenuOpen] = useState(false);
  const [superAdminMenuOpen, setSuperAdminMenuOpen] = useState(false);

  const handleLogout = LogoutComponent();

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  if (currentUser?.role === 'admin') {
    console.log(currentUser?.role);
  } else {
    console.log('this is not true');
  }

  const handleSuperAdminMenuToggle = () => {
    setSuperAdminMenuOpen(!superAdminMenuOpen);
  };

  const handleTraderMenuToggle = () => {
    setTraderMenuOpen(!traderMenuOpen);
  };

  const handleCustomerMenuToggle = () => {
    setCustomerMenuOpen(!customerMenuOpen);
  };

  const handleGeneralMenuToggle = () => {
    setGeneralMenuOpen(!generalMenuOpen);
    console.log('GENERAL MENU OPEN:', !generalMenuOpen);
  };

  const handleAdminMenuToggle = () => {
    setAdminMenuOpen(!adminMenuOpen);
  };

  const handleToggle = () => {
    console.log('i am toggling from sidebar');
    setToggle(!toggle);
  };

  return (
    <div className="">
      <div
        className={[
          toggle ? 'w-10' : 'min-w-[180px]',
          ' bg-primary h-full relative bottom-0 mb-32 transition-all duration-300 hidden md:flex overflow-y-auto',
        ].join(' ')}
      >
        <div className="absolute right-3 top-3" onClick={handleToggle}>
          {toggle ? (
            <IoMdClose className="text-2xl " />
          ) : (
            <IoMdMenu className="text-2xl" />
          )}
        </div>

        <div className="mt-10">
          {currentUser && (
            <GeneralSidebar
              handleGeneralMenuToggle={handleGeneralMenuToggle}
              generalMenuOpen={generalMenuOpen}
              toggle={toggle}
            />
          )}

          {(currentUser?.role === 'admin' ||
            currentUser?.role === 'super_admin') && (
            <AdminSidebar
              toggle={toggle}
              handleAdminMenuToggle={handleAdminMenuToggle}
              adminMenuOpen={adminMenuOpen}
            />
          )}

          {currentUser?.role === 'super_admin' && (
            <SuperAdminSidebar
              toggle={toggle}
              handleSuperAdminMenuToggle={handleSuperAdminMenuToggle}
              superAdminMenuOpen={superAdminMenuOpen}
            />
          )}

          {currentUser?.role === 'trader' && (
            <TraderSidebar
              toggle={toggle}
              handleTraderMenuToggle={handleTraderMenuToggle}
              traderMenuOpen={traderMenuOpen}
            />
          )}

          {currentUser?.role === 'customer' && (
            <CustomerSidebar
              toggle={toggle}
              handleCustomerMenuToggle={handleCustomerMenuToggle}
              customerMenuOpen={customerMenuOpen}
            />
          )}

          {currentUser && (
            <button
              className="text-red-800 mt-6 font-bold mb-[100px] ml-5 text-[12px] smm:text-[15px] mng:text-[18px]"
              onClick={handleLogout}
            >
              <span className={toggle ? 'flex' : 'hidden'}>
                <MdAccountBalanceWallet className="text-xl " />
              </span>
              <span
                className={[
                  toggle ? 'hidden' : 'flex',
                  'font-bold italic',
                ].join(' ')}
              >
                Logout
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
