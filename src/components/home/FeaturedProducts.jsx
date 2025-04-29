import { BiSolidUpvote } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useLoadingSpinner from "../../hooks/useLoadingSpinner";

export default function FeaturedProducts() {
  const { user, darkMode } = useAuth();
  const axiosPublic = useAxiosPublic();
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products", true],
    queryFn: async () => {
      const res = await axiosPublic.get(`/product-featured`, {
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
    <div
      className={`${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-gradient-to-b from-gray-50 to-gray-200 text-gray-900"
      } py-16`}
    >
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold">
            {darkMode ? "🌙 Featured Products" : "🚀 Featured Products"}
          </h2>
          <p className="mt-3 text-lg">
            Check out our hand-picked best-selling products.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
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
                  alt={product.title}
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
                    onClick={() => handleVotes(product._id, user._id)}
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
    </div>
  );
}
