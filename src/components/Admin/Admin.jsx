import { NavLink, useNavigate } from "react-router-dom";
import { MdManageAccounts } from "react-icons/md";
import { FcAddDatabase, FcStatistics } from "react-icons/fc";
import { BsCardChecklist } from "react-icons/bs";
import useAdmin from "../../hooks/useAdmin";
import { useEffect } from "react";

export default function Admin() {
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate("statistics-admin");
    }
  }, [isAdmin, navigate]);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 space-y-8 text-white">Admin</h1>
      <ul className="space-y-4">
        <li className="flex items-center gap-2  font-semibold  text-white">
          <FcStatistics className="text-2xl" />
          <NavLink to={"statistics-admin"}>Statistics</NavLink>
        </li>
        <li className="flex items-center gap-2 font-semibold  text-white">
          <MdManageAccounts className="text-2xl" />
          <NavLink to={"manage-user"}>Manage User</NavLink>
        </li>
        <li className="flex items-center gap-2 font-semibold  text-white">
          <FcAddDatabase className="text-2xl" />
          <NavLink to={"add-cupon"}>Add Cupon</NavLink>
        </li>
        <li className="flex items-center gap-2 font-semibold  text-white">
          <BsCardChecklist className="text-2xl" />
          <NavLink to={"cupon-list"}>Coupon Management</NavLink>
        </li>
      </ul>
    </div>
  );
}
