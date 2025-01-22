import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [dropdown, setDropdown] = useState(true);

  const handleDropDown = () => {
    setDropdown(!dropdown);
  };

  const handleLogOut = () => {
    logOut();
  };

  const navOptions = (
    <div className="flex gap-6 text-xl">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/all-products">Products</Link>
      </li>

      {user ? (
        <li>
          <Link to="/profile">Profile</Link>
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
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            YourApp
          </span>
        </a>
        <div className="flex items-center md:order-2  space-x-3 md:space-x-0 rtl:space-x-reverse border-2">
          {user ? (
            <div
              className="relative "
              // onMouseEnter={handleDropDown}
              // onMouseLeave={handleDropDown}
              onClick={handleDropDown}
            >
              <img
                src={user?.photoURL || "/default-avatar.jpg"}
                alt="User Profile"
                className="w-8 h-8 rounded-full"
              />
              {dropdown && (
                <div className="absolute right-0 w-56 -mt-2 z-10 bg-white shadow-lg rounded-lg">
                  <ul className="p-5 space-y-4 text-md font-semibold">
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
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
