import { useState } from 'react';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { UserState } from '../constants/types';
import { useSelector } from 'react-redux';
import LogoutComponent from './LogoutComponent';
import GeneralSidebar from './SidebarComponents/GeneralSidebar';
import AdminSidebar from './SidebarComponents/AdminSidebar';
import SuperAdminSidebar from './SidebarComponents/SuperAdminSidebar';
import TraderSidebar from './SidebarComponents/TraderSidebar';
import CustomerSidebar from './SidebarComponents/CustomerSidebar';

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const [toggleDropDown] = useState(false);
  const [generalMenuOpen, setGeneralMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [traderMenuOpen, setTraderMenuOpen] = useState(false);
  const [customerMenuOpen, setCustomerMenuOpen] = useState(false);
  const [superAdminMenuOpen, setSuperAdminMenuOpen] = useState(false);

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const handleLogout = LogoutComponent();

  console.log('navbar toggle:', toggle);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleCloseToggle = () => {
    setToggle(!toggle);
  };

  const handleTraderMenuToggle = () => {
    setTraderMenuOpen(!traderMenuOpen);
  };
  const handleCustomerMenuToggle = () => {
    setCustomerMenuOpen(!customerMenuOpen);
  };
  const handleGeneralMenuToggle = () => {
    setGeneralMenuOpen(!generalMenuOpen);
  };

  const handleAdminMenuToggle = () => {
    setAdminMenuOpen(!adminMenuOpen);
  };
  const handleSuperAdminMenuToggle = () => {
    setSuperAdminMenuOpen(!superAdminMenuOpen);
  };
  return (
    <div className="flex justify-between bg-primary items-center relative h-[70px] px-3">
      <div className="">Logo</div>

      <div className="">
        <div className="hidden md:flex gap-3 text-xl">
          {currentUser && currentUser !== null ? (
            <div className="">
              <div className="gap-3 flex">
                <Link to="/dashboard">Dashboard</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <div className="gap-2 flex">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>

        <div className="">
          <button className="md:hidden" onClick={handleToggle}>
            {toggle ? (
              <IoMdClose className="text-4xl" />
            ) : (
              <IoMdMenu className="text-4xl" />
            )}
          </button>

          <div
            className={[
              toggle ? 'fade-enter fade-enter-active' : 'hidden',
              'bg-col3 md:hidden overflow-y-visible absolute right-0 h-screen z-[9999] font-bold w-[35vw] top-[70px]',
            ].join(' ')}
          >
            {currentUser && currentUser !== null ? (
              <div className=" ml-[-10px] h-full text-[12px] flex flex-col items-start gap-1 pl-2 mt-6 overflow-y-auto">
                <GeneralSidebar
                  handleGeneralMenuToggle={handleGeneralMenuToggle}
                  generalMenuOpen={generalMenuOpen}
                  toggle={toggleDropDown}
                  handleCloseToggle={handleCloseToggle}
                />

                {(currentUser?.role === 'admin' ||
                  currentUser?.role === 'super_admin') && (
                  <AdminSidebar
                    toggle={toggleDropDown}
                    handleAdminMenuToggle={handleAdminMenuToggle}
                    adminMenuOpen={adminMenuOpen}
                    handleCloseToggle={handleCloseToggle}
                  />
                )}

                {currentUser?.role === 'customer' && (
                  <CustomerSidebar
                    toggle={toggleDropDown}
                    handleCustomerMenuToggle={handleCustomerMenuToggle}
                    customerMenuOpen={customerMenuOpen}
                    handleCloseToggle={handleCloseToggle}
                  />
                )}

                {currentUser?.role === 'trader' && (
                  <TraderSidebar
                    handleCloseToggle={handleCloseToggle}
                    toggle={toggleDropDown}
                    handleTraderMenuToggle={handleTraderMenuToggle}
                    traderMenuOpen={traderMenuOpen}
                  />
                )}

                {currentUser?.role === 'super_admin' && (
                  <SuperAdminSidebar
                    toggle={toggleDropDown}
                    handleSuperAdminMenuToggle={handleSuperAdminMenuToggle}
                    superAdminMenuOpen={superAdminMenuOpen}
                    handleCloseToggle={handleCloseToggle}
                  />
                )}

                <button
                  className="text-red-600 ml-7 mt-7 text-[12px] mb-20 smm:text-[15px] mng:text-[18px]"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 mt-6 pr-10">
                <Link onClick={handleCloseToggle} to="/login" className="">
                  Login
                </Link>
                <Link onClick={handleCloseToggle} to="/register" className="">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
