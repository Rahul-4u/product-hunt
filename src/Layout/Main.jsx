import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar";
import Footer from "../pages/Shared/Footer";

export default function Main() {
  return (
    <div>
      <div>
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
