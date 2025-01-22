import { FaShapes, FaShoppingCart, FaUser } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function NormalUser() {
  return (
    <div>
      {" "}
      <ul className=" space-y-4">
        <li>
          <NavLink to={"my-profile"} className="flex items-center gap-4">
            <span>
              <FaUser />
            </span>
            My Profile
          </NavLink>
        </li>
        <li>
          <NavLink to={"my-products"} className="flex items-center gap-4">
            <span>
              <FaShoppingCart />
            </span>
            My Products
          </NavLink>
        </li>
        <li>
          <NavLink to={"add-product"} className="flex items-center gap-4">
            <span>
              <MdAddShoppingCart />
            </span>
            Add Product
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
