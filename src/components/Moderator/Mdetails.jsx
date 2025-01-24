import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function Mdetails() {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  // Fetch the product details
  const {
    data: product = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product-details", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/pending-products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading)
    return <p className="text-center text-xl">Loading product details...</p>;
  if (error)
    return (
      <p className="text-center text-xl text-red-500">
        Failed to fetch product details: {error.message}
      </p>
    );

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        {/* Product Image */}
        <div className="md:w-1/3">
          <img
            src={product?.photo}
            alt={product?.name}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="p-6 md:w-2/3">
          <h1 className="text-3xl font-bold text-gray-800">{product?.name}</h1>
          <p className="text-xl text-gray-600 mt-2">
            <strong>Description:</strong> {product?.description}
          </p>
          <p className="text-lg text-gray-700 mt-4">
            <strong>Price:</strong> ${product?.price}
          </p>
          <p className="text-lg text-gray-700 mt-2">
            <strong>Status:</strong> {product?.status}
          </p>
          <p className="text-lg text-gray-700 mt-2">
            <strong>Votes:</strong> {product?.votes}
          </p>

          {/* Optional: Button to go to another page */}
          <div className="mt-6">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
