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

export default function Dashboard() {
  const { user } = useAuth();
  const [isModerator] = useModerator();
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();
  const [isNav, setIsNav] = useState(false);

  const handleNav = () => {
    setIsNav(!isNav);
  };

  // const isModerator = false;

  // const isAdmin = true;

  return (
    <div className="max-w-[1440px] mx-auto lg:flex">
      <div className="bg-slate-600 h-10 items-center justify-between p-2 lg:hidden flex">
        <NavLink className="text-white " to={"/"}>
          Tech Hount{" "}
        </NavLink>
        <button onClick={handleNav}>
          <IoMdMenu className="text-xl h-8 w-8 p-1 rounded-full border " />
        </button>
      </div>
      <div className="w-64 min-h-screen lg:flex lg:flex-col hidden  bg-green-500  bg-gradient-to-t from-sky-500 to-blue-500">
        <div className="w-full mx-auto">
          <h1></h1>
          {user?.email && (
            <div className="w-full pt-10 items-center text-center mx-auto">
              <img
                className="mx-auto w-16 rounded-full border-4 border-sky-600"
                src={user?.photoURL}
                alt=""
              />
              <h1 className=" font-semibold text-md mt-4">
                {user.displayName}
              </h1>
              <p className="text-sm">{user.email}</p>
            </div>
          )}
        </div>
        <div className="divider h-10"></div>
        {/* -------------------- */}
        <div className="px-8">
          {isAdmin ? <Admin /> : isModerator ? <Moderator /> : <NormalUser />}
        </div>
      </div>
      {isNav && (
        <div className="w-64 min-h-screen  lg:flex-col lg:hidden  bg-green-500  bg-gradient-to-t from-sky-500 to-blue-500">
          <div className="w-full mx-auto">
            <h1></h1>
            {user?.email && (
              <div className="w-full pt-10 items-center text-center mx-auto">
                <img
                  className="mx-auto w-16 rounded-full border-4 border-sky-600"
                  src={user?.photoURL}
                  alt=""
                />
                <h1 className=" font-semibold text-md mt-4">
                  {user.displayName}
                </h1>
                <p className="text-sm">{user.email}</p>
              </div>
            )}
          </div>
          <div className="divider h-10"></div>
          {/* -------------------- */}
          <div className="px-8">
            {isAdmin ? <Admin /> : isModerator ? <Moderator /> : <NormalUser />}
          </div>
        </div>
      )}
      <div className="flex-1 w-full  ">
        <Outlet />
      </div>
    </div>
  );
}
