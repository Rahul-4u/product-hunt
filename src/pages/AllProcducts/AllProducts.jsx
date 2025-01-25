import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounenc";
import useAuth from "../../hooks/useAuth";
import useLoadingSpinner from "../../hooks/useLoadingSpinner";

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
      console.log("Fetched products data:", res.data);
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
        toast.success("Product status updated to Accepted!");
        refetch();
      }
    } catch (error) {
      console.error("Failed to update status:", error.message);
      toast.error("Failed to accept the product. Please try again.");
    }
  };

  const handleVotes = async (id) => {
    const userId = localStorage.getItem(products._id, user._id);
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

  const filteredProducts = products.filter(
    (product) => product?.repot === "false"
  );

  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="w-11/12 mx-auto my-6">
        <input
          type="text"
          value={searchFun}
          onChange={(e) => setSearchFun(e.target.value)}
          placeholder="Search products..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <p className="w-11/12 mx-auto text-gray-500">
        {total > 0 ? `${total} products found` : "No products found"}
      </p>

      <div className="w-11/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2  gap-8">
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
          <p>No unreported products available.</p>
        )}
      </div>

      <div className="flex justify-center items-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-4 py-2 border rounded-md mx-2 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>

        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 border rounded-md mx-1 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === pages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-4 py-2 border rounded-md mx-2 ${
            currentPage === pages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
