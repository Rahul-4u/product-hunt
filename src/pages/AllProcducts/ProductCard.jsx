import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";

export default function ProductCard({
  product,
  handleReport,
  handleVotes,
  userId,
}) {
  const { user } = useAuth();
  const [isModal, setIsModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const axiosSecure = useAxiosPublic();

  const handleModale = () => {
    setIsModal(!isModal);
  };

  // Report Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const repotext = form.repotext.value;

    const productItem = {
      name: product?.name,
      photo: product?.photo,
      description: product?.description,
      ownerName: product?.ownerName,
      ownerImage: user?.photoURL,
      email: user?.email,
      repotext,
      productId: product._id,
    };

    try {
      const response = await axiosSecure.post("/product-report", productItem);
      if (response.data.success) {
        alert("Product reported successfully!");
        form.reset();
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to report product. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 relative group">
      {/* Product Image with Dynamic Hover Effect */}
      <img
        src={product?.photo}
        alt={product?.name}
        className="h-36 lg:h-48 w-full lg:object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* Product Info */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {product?.name}
        </h2>
        <p className="text-gray-600 mt-3">{product?.description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-800 font-bold text-xl">${product?.price}</p>
          <p className="text-gray-500 text-sm">Upvotes: {product?.upvotes}</p>
        </div>
        <div className="flex justify-between items-center mt-6">
          {/* Product Detail Button */}
          <NavLink
            to={`/all-product/${product._id}`}
            className="bg-green-600 text-white px-6 py-2 rounded-md shadow-lg transition-all hover:bg-green-700"
          >
            View Details
          </NavLink>

          {/* Vote Button */}
          <button
            onClick={() => handleVotes(product?._id)}
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-lg hover:bg-blue-600 transition"
          >
            Vote {product?.votes}
          </button>

          {/* Report Button */}
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-red-700 transition"
            onClick={handleModale}
          >
            Report
          </button>
        </div>
      </div>

      {/* Report Modal - Dynamically Added */}
      {isModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-96 relative transform scale-95 transition-all duration-300 ease-in-out"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Report Product
            </h3>
            <textarea
              className="w-full border border-gray-300 rounded-md p-4 mb-6 text-gray-600"
              rows="5"
              name="repotext"
              placeholder="Enter your reason for reporting..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            ></textarea>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleModale}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
