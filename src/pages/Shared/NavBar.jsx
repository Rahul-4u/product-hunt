import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [open, setOpen] = useState();

  const handleDropDown = () => {
    setDropdown(!dropdown);
  };
  const handleNav = () => {
    setOpen(!open);
  };

  const handleLogOut = () => {
    logOut();
  };

  const navOptions = (
    <div className="lg:flex gap-6 text-md space-y-4  lg:space-y-0 items-center  lg:text-xl">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/all-products">Products</Link>
      </li>

      {user ? (
        <li>
          <Link to="/subscrip">Subscrip</Link>
        </li>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </div>
  );

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://i.ibb.co.com/hM6kz3D/images-11-removebg-preview.png"
            className="h-10"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            <span className="text-orange-600 font-bold italic">Pro</span>duct
            Hunt
          </span>
        </a>
        <div className="flex items-center md:order-2  space-x-3 md:space-x-0 rtl:space-x-reverse ">
          {user ? (
            <div
              className="relative flex "
              // onMouseEnter={handleDropDown}
              // onMouseLeave={handleDropDown}
              onClick={handleDropDown}
            >
              <img
                src={user?.photoURL || "/default-avatar.jpg"}
                alt="User Profile"
                className="w-8 h-8 rounded-full "
              />
              <IoMdMenu className="lg:hidden" />

              {dropdown && (
                <div className="absolute right-0 lg:w-56 w-72 lg:-mt-2 mt-12 z-10 bg-white shadow-lg rounded-lg">
                  <ul className="p-5 space-y-4 text-md font-semibold">
                    <span>
                      <li className="lg:hidden">{navOptions}</li>
                    </span>
                    <li>
                      <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                      <Link onClick={handleLogOut}>Logout</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <FaRegUserCircle className="text-2xl" />
          )}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions} </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
