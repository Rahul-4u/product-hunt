import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar";
import Footer from "../pages/Shared/Footer";
import useAuth from "../hooks/useAuth";

export default function Main() {
  const { darkMode } = useAuth();

  // Dynamically set the class name for dark mode

  return (
    <div
      className={` ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div>
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
