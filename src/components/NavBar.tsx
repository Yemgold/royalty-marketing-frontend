import { useState } from 'react';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const currentUser = null;

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleCloseToggle = () => {
    setToggle(!toggle);
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
                <button>Logout</button>
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
              'bg-col3 md:hidden overflow-y-visible absolute right-0 h-screen z-[9999] font-bold w-[50vw] top-[70px]',
            ].join(' ')}
          >
            {currentUser && currentUser !== null ? (
              <div className="flex flex-col my-10 items-start pl-6">
                <Link to="/dashboard">Dashboard</Link>
                <button>Logout</button>
              </div>
            ) : (
              <div className="flex flex-col my-6 ml-5">
                <Link onClick={handleCloseToggle} to="/login">
                  Login
                </Link>
                <Link onClick={handleCloseToggle} to="/register">
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
