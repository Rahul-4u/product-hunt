import { NavLink } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function ReportedContents() {
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

  const handleDelete = async (id) => {
    try {
      const res = await axiosPublic.delete(
        `/product-delete/${id}`,
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

  const handleReport = async (id) => {
    try {
      const res = await axiosPublic.patch(
        `/product-repot-back/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Product status updated to Accepted!");
        refetch();
      }
    } catch (error) {
      console.error("Failed to update status:", error.message);
      toast.error("Failed to accept the product. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Reported Contents
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-6 py-3 border-b border-gray-300">
                Product Name
              </th>

              <th className="text-left px-6 py-3 border-b border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b border-gray-200">
                  {product?.name}
                </td>

                <td className="px-6 py-4 border-b border-gray-200">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">
                    <NavLink to={`/dashboard/report-products/${product?._id}`}>
                      View Details
                    </NavLink>
                  </button>
                  <button
                    className=" bg-green-500 text-white px-4 mx-2 py-2 rounded hover:bg-red-600"
                    onClick={() => handleReport(product?._id)}
                  >
                    Resolve Report
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete(product?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
