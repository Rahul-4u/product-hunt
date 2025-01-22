import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { NavLink } from "react-router-dom";

export default function PendingProducts() {
  const axiosPublic = useAxiosPublic();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products", "pending"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/product-status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      console.log("Fetched pending products data:", res.data);
      return res.data;
    },
  });

  const handleAccept = async (id) => {
    try {
      const res = await axiosPublic.patch(
        `/product-status/${id}`,
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

  const handleReject = async (id) => {
    try {
      const res = await axiosPublic.patch(
        `/product-reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      if (res.status === 200) {
        alert("Product status updated to Accepted!");
        refetch(); // Refresh the data
      }
    } catch (error) {
      console.error("Failed to update status:", error.message);
      alert("Failed to accept the product. Please try again.");
    }
  };
  const handleFeatured = async (id) => {
    try {
      const res = await axiosPublic.patch(
        `/product-featured/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      if (res.status === 200) {
        alert("Product status updated to Accepted!");
        refetch(); // Refresh the data
      }
    } catch (error) {
      console.error("Failed to update status:", error.message);
      alert("Failed to accept the product. Please try again.");
    }
  };

  return (
    <div>
      <div className="bg-white border   min-h-screen shadow-xl ml-8 mt-2 shadow-slate-500">
        <h1 className="text-2xl border-b-2 font-bold p-4">
          Pending Products{products.length}{" "}
        </h1>
        <div>
          <p>Total Products: {products?.length}</p>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">
                  Product Photo
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Product Name
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Number of Votes
                </th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      className="w-24 h-16 rounded-md"
                      src={product?.photo}
                      alt={product?.name}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product?.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product?.votes}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product?.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-green-400 px-2 py-1 rounded-md mx-2">
                      <NavLink
                        to={`/dashboard/pending-products/${product._id}`}
                      >
                        Details
                      </NavLink>
                    </button>
                    <button
                      onClick={() => handleAccept(product._id)}
                      disabled={product?.status === "Accepted"}
                      className={`${
                        product.status === "Accepted"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-orange-500 hover:bg-green-600"
                      } text-white px-3 py-1 rounded mr-2`}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleFeatured(product?._id)}
                      disabled={product?.Featured === true}
                      className={`${
                        product.Featured === true
                          ? " bg-green-500 text-white mx-1 px-3 py-1 rounded"
                          : " bg-orange-500 text-white mx-1 px-3 py-1 rounded"
                      } `}
                    >
                      {" "}
                      {/* <span className="flex-1">
                        {product.Featured === true ? (
                          <>
                            <MdOutlineDoneAll />
                          </>
                        ) : (
                          ""
                        )}
                      </span> */}
                      Featured
                    </button>
                    <button
                      onClick={() => handleReject(product?._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
