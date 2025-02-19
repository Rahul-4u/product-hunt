import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { BiSolidUpvote } from "react-icons/bi";
import useLoadingSpinner from "../../hooks/useLoadingSpinner";

const RecentProducts = () => {
  const { user, darkMode } = useAuth(); // Get darkMode from useAuth hook
  const axiosPublic = useAxiosPublic();

  const {
    data: recentProducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products", true],
    queryFn: async () => {
      const res = await useAxiosPublic.get(`/product-featured`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  const loadingSpinner = useLoadingSpinner(isLoading);
  if (loadingSpinner) {
    return loadingSpinner;
  }

  const handleVotes = async (id) => {
    const userId = localStorage.getItem(user._id);
    try {
      const res = await axiosPublic.patch(
        `/product-votes/${id}`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      if (res.status === 200) {
        refetch();
      }
    } catch (error) {
      console.error("Failed to update status:", error.message);
    }
  };

  return (
    <section
      className={`py-10 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}
      id="recent-products"
    >
      <div className="max-w-screen-xl mx-auto">
        <h2
          className={`text-3xl font-semibold text-center mb-6 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Recent Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recentProducts.map((product) => (
            <div
              key={product._id}
              className={`relative bg-white ${
                darkMode ? "bg-opacity-40 text-white" : "bg-opacity-60"
              } backdrop-blur-lg shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300`}
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  className="w-full h-64 object-cover rounded-t-2xl transform hover:scale-105 transition-transform duration-300"
                  src={product.photo}
                  alt={product.name}
                />
                <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 text-xs font-bold rounded-lg shadow-md">
                  Featured
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="mt-2 line-clamp-2">{product.description}</p>
                <p className="text-sm mt-1">
                  {new Date(product.timestamp).toDateString()}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {product?.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className={`${
                        darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-gray-200 text-gray-700"
                      } text-xs px-2 py-1 rounded-full`}
                    >
                      # {tag}
                    </span>
                  ))}
                </div>

                {/* Price & Vote Section */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-semibold text-green-700">
                    💲 {product.price}
                  </span>

                  {/* Vote Button */}
                  <button
                    onClick={() => handleVotes(product._id)}
                    className={`flex items-center gap-1 px-4 py-1.5 ${
                      darkMode
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                        : "bg-gradient-to-r from-orange-500 to-red-500"
                    } text-white rounded-lg hover:scale-105 transition transform`}
                  >
                    <BiSolidUpvote className="text-lg" />
                    {product.votes}
                  </button>
                </div>

                {/* Details Button */}
                <div className="mt-4">
                  <NavLink
                    to={`/all-product/${product._id}`}
                    className="block w-full text-center bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
                  >
                    View Details
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProducts;
