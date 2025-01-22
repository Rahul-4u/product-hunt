import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function CuponAdd() {
  const axiosSecure = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const code = form.code.value;
    const expiryDate = form.expiryDate.value;
    const description = form.description.value;
    const discount = form.discount.value;

    console.log(code);

    const cuponItem = {
      name: user?.displayName,
      photo: user?.photoURL,
      email: user?.email,

      description,
      code,
      expiryDate,
      discount,
      status: "active",
    };

    try {
      const response = await axiosSecure.post("/add-cupon", cuponItem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      if (response.data.success) {
        alert("Product added successfully!");
        form.reset();
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="cupon-add-page p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Add a New Coupon</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md p-6 rounded"
      >
        {/* Coupon Code */}
        <div className="mb-4">
          <label htmlFor="code" className="block text-sm font-medium mb-1">
            Coupon Code:
          </label>
          <input
            type="text"
            name="code"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter coupon code"
            required
          />
        </div>

        {/* Expiry Date */}
        <div className="mb-4">
          <label
            htmlFor="expiryDate"
            className="block text-sm font-medium mb-1"
          >
            Expiry Date:
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Coupon Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter coupon description"
            required
          />
        </div>

        {/* Discount Amount */}
        <div className="mb-4">
          <label htmlFor="discount" className="block text-sm font-medium mb-1">
            Discount Amount:
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter discount amount"
            required
          />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Add Coupon
        </button>
      </form>
    </div>
  );
}
