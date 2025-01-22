import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

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

  // ---------------------report info

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
      const response = await axiosSecure.post(
        "/product-report",
        productItem
        // {},
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        //   },
        // }
      );
      if (response.data.success) {
        alert("Product added successfully!");
        form.reset();
        setSelectedTags([]);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="bg-white w-11/12 lg:w-full shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <img
        src={product?.photo}
        alt={product?.name}
        className=" h-36 lg:h-48 w-full lg:object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{product?.name}</h2>
        <p className="text-gray-600 mt-2">{product?.description}</p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-800 font-semibold">
            Price: ${product?.price}
          </p>
          <p className="text-gray-500 text-sm">Upvotes: {product?.upvotes}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => handleVotes(product?._id)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Vote {product?.votes}
          </button>
          {/* <button onClick={() => handleReport(product?._id)}>Report</button> */}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={handleModale}
          >
            reop
          </button>
        </div>
      </div>

      {isModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <h3 className="text-lg font-bold mb-4">Report Product</h3>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-4"
              rows="5"
              name="repotext"
              placeholder="Enter your reason for reporting..."
              onChange={(e) => setReportReason(e.target.value)}
            ></textarea>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleModale}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReport(product?._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
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
