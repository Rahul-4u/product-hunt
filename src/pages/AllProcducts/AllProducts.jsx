import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounenc";
import useAuth from "../../hooks/useAuth";
import useLoadingSpinner from "../../hooks/useLoadingSpinner";
import { FaSearch } from "react-icons/fa";

export default function AllProducts() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [searchFun, setSearchFun] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchFun, 500);

  const {
    data = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products", debouncedSearch, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/product-accepted?search=${debouncedSearch}&page=${currentPage}&limit=6`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return res.data;
    },
  });

  const loadingSpinner = useLoadingSpinner(isLoading);
  if (loadingSpinner) {
    return loadingSpinner;
  }

  const { products = [], total = 0, pages = 0 } = data;

  const handleReport = async (id) => {
    try {
      const res = await axiosPublic.patch(
        `/product-repot/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Product reported successfully!");
        refetch();
      }
    } catch (error) {
      console.error("Failed to report product:", error.message);
      toast.error("Failed to report. Please try again.");
    }
  };

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
      console.error("Failed to update votes:", error.message);
    }
  };

  const filteredProducts = products.filter(
    (product) => product?.repot === "false"
  );

  return (
    <div className="max-w-[1440px] mx-auto py-12 px-6">
      {/* Search Bar */}
      <div className="relative w-full max-w-lg mx-auto">
        <input
          type="text"
          value={searchFun}
          onChange={(e) => setSearchFun(e.target.value)}
          placeholder="Search products..."
          className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-300"
        />
        <FaSearch className="absolute left-4 top-4 text-gray-500" />
      </div>

      {/* Total Products */}
      <p className="text-center text-gray-500 mt-4 text-lg">
        {total > 0 ? `${total} products found` : "No products found"}
      </p>

      {/* Product Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              handleReport={handleReport}
              handleVotes={handleVotes}
              userId={localStorage.getItem("user-id")}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">
            No unreported products available.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-5 py-2.5 rounded-lg shadow-md transition-all ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>

        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-5 py-2.5 rounded-lg transition-all ${
              currentPage === index + 1
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === pages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-5 py-2.5 rounded-lg shadow-md transition-all ${
            currentPage === pages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
