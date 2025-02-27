import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import useLoadingSpinner from "../../hooks/useLoadingSpinner";

export default function MyProducts() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?email=${user.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  const loadingSpinner = useLoadingSpinner(isLoading);
  if (loadingSpinner) {
    return loadingSpinner;
  }

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
        axiosSecure.delete(`/product/${id}`).then((res) => {
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
    <div>
      <h1>My Products</h1>
      <div className="overflow-x-auto">
        <p>Total Products: {products.length}</p>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">
                Product Photo
              </th>
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Number of Votes
              </th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {user?.email &&
              products?.length &&
              products?.map((product, index) => (
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
                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                      <NavLink to={`/dashboard/product-update/${product?._id}`}>
                        Update
                      </NavLink>
                    </button>
                    <button
                      onClick={() => handleDelete(product?._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
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
