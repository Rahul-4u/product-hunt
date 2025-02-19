import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import NormalUser from "../components/NormalUser/NormalUser";
import Moderator from "../components/Moderator/Moderator";
import useModerator from "../hooks/useModerator";
import Admin from "../components/Admin/Admin";
import useAdmin from "../hooks/useAdmin";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoHomeSharp, IoLogOut } from "react-icons/io5";

export default function Dashboard() {
  const { user, logOut } = useAuth();
  const [isModerator] = useModerator();
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();
  const [isNav, setIsNav] = useState(false);

  const handleNav = () => {
    setIsNav(!isNav);
  };

  const handleLogout = () => {
    logOut();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="max-w-[1440px] mx-auto lg:flex">
      {/* Mobile Navbar */}
      <div className="bg-slate-600 h-10 flex items-center justify-between p-2 lg:hidden">
        <NavLink className="text-white" to="/">
          Tech Hount
        </NavLink>
        <button onClick={handleNav} aria-expanded={isNav}>
          <IoMdMenu className="text-xl h-8 w-8 p-1 rounded-full border" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-64 min-h-screen lg:flex lg:flex-col bg-green-500 bg-gradient-to-t from-sky-500 to-blue-500 ${
          isNav ? "block" : "hidden"
        } lg:block`}
      >
        {/* User Profile */}
        <div className="w-full mx-auto pt-10 text-center">
          {user?.photoURL ? (
            <img
              className="mx-auto w-16 rounded-full border-4 border-sky-600"
              src={user.photoURL}
              alt="User Avatar"
            />
          ) : (
            <FaUser className="mx-auto w-16 h-16 rounded-full border-4 border-sky-600 text-gray-200" />
          )}
          <h1 className="font-semibold text-md mt-4">
            {user?.displayName || "Guest"}
          </h1>
          <p className="text-sm">{user?.email || "No email available"}</p>
          <hr className="bg-black border-black border my-2 w-11/12 mx-auto" />
        </div>

        {/* Role-based Menu */}
        <div className="px-8">
          {isAdmin ? <Admin /> : isModerator ? <Moderator /> : <NormalUser />}
        </div>

        {/* Navigation Links */}
        <hr className="bg-black border-black border my-2 w-11/12 mx-auto" />
        <div className="px-8">
          <NavLink to="/" className="flex items-center gap-4 my-2">
            <IoHomeSharp />
            Home
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 my-2"
          >
            <IoLogOut />
            Log-Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
