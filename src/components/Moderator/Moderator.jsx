import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { MdNotificationImportant } from "react-icons/md";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";

export default function Moderator() {
  const axiosPublic = useAxiosPublic();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products", true],
    queryFn: async () => {
      const res = await axiosPublic.get(`/product-repot`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      console.log("Fetched pending products data:", res.data);
      return res.data;
    },
  });
  return (
    <div className="text-white">
      <h1 className="text-xl font-semibold mb-10">Moderator {}</h1>
      <div>
        <ul className=" space-y-8">
          <li>
            <NavLink className="flex gap-2" to={"pending-products"}>
              {" "}
              <MdPendingActions className="text-2xl" /> Pending Products
            </NavLink>
          </li>{" "}
          <li>
            <NavLink className="flex items-center gap-2" to={"repot-contenst"}>
              <div className=" relative">
                <MdOutlineReportGmailerrorred className="text-2xl " />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex justify-center items-center">
                  {products.length}
                </span>
              </div>
              Reported Contents
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
