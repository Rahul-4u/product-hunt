import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar";

export default function Main() {
  return (
    <div>
      <div>
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}
