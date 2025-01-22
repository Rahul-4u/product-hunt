import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

export default function CouponList() {
  const axiosPublic = useAxiosPublic();

  // Fetch Coupons from Backend
  const { data: coupons = [], refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/all-coupon`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      console.log("Fetched coupons data:", res.data);
      return res.data;
    },
  });
  const handleActive = async (id) => {
    try {
      const res = await axiosPublic.patch(
        `/coupon-active/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      if (res.status === 200) {
        alert("Product status updated to Accepted!");
        refetch();
      }
    } catch (error) {
      console.error("Failed to update status:", error.message);
      alert("Failed to accept the product. Please try again.");
    }
  };
  const handleInActive = async (id) => {
    try {
      const res = await axiosPublic.patch(
        `/coupon-inactive/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      if (res.status === 200) {
        alert("Product status updated to Accepted!");
        refetch();
      }
    } catch (error) {
      console.error("Failed to update status:", error.message);
      alert("Failed to accept the product. Please try again.");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/coupon-delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Coupon List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Code</th>
              <th className="border px-4 py-2">Discount (%)</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Expiration Date</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td className="border px-4 py-2">{coupon.code}</td>
                  <td className="border px-4 py-2">{coupon.discount}%</td>
                  <td className="border px-4 py-2">{coupon.description}</td>
                  <td className="border px-4 py-2">
                    {new Date(coupon.expirationDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2  capitalize">
                    {coupon.status}
                  </td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleInActive(coupon?._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      InActive
                    </button>
                    <button
                      onClick={() => handleActive(coupon?._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Active
                    </button>
                    <button
                      // onClick={() => handleInActive(coupon?._id)}
                      className=" bg-green-600 text-white px-3 py-1 rounded"
                    >
                      <NavLink to={`/dashboard/coupon-update/${coupon._id}`}>
                        Edite
                      </NavLink>
                    </button>
                    <button
                      onClick={() => handleDelete(coupon?._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center border px-4 py-2">
                  No coupons available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
