import { Link, NavLink } from "react-router-dom";
import { FaRegUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const NavBar = () => {
  const { user, logOut, darkMode, setDarkMode } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle dark mode
  };

  const handleDropDown = () => {
    setDropdown(!dropdown);
  };

  const handleNav = () => {
    setOpen(!open);
  };

  const handleLogOut = () => {
    logOut();
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-lg fixed w-full z-50">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
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
        <div className="hidden lg:flex flex-grow justify-center">
          <ul className="flex space-x-6 text-md lg:text-xl font-medium">
            <li>
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-products" className="hover:text-orange-500">
                Products
              </Link>
            </li>
            {user ? (
              <li>
                <Link to="/subscrip" className="hover:text-orange-500">
                  Subscrip
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" className="hover:text-orange-500">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex items-center space-x-4 navbar-end">
          <button onClick={toggleDarkMode} className="text-2xl">
            {darkMode ? (
              <FaSun className="text-yellow-500" />
            ) : (
              <FaMoon className="text-gray-700" />
            )}
          </button>
          {user ? (
            <div className="relative flex" onClick={handleDropDown}>
              <img
                src={user?.photoURL || "/default-avatar.jpg"}
                alt="User Profile"
                className="w-8 h-8 rounded-full"
              />
              <IoMdMenu className="lg:hidden" />
              {dropdown && (
                <div className="absolute right-0 lg:w-56 w-72 lg:-mt-2 mt-12 z-10 bg-white shadow-lg rounded-lg">
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
      </div>
    </nav>
  );
};

export default NavBar;
