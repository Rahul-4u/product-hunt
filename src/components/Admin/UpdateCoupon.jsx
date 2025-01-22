import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function UpdateCoupon() {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the product details
  const {
    data: coupon = {},
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-coupon", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/all-coupon/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { _id } = coupon;

  const handleUpdate = (e) => {
    e.preventDefault();
    const description = e.target.description.value;
    const expiryDate = e.target.expiryDate.value;
    const code = e.target.code.value;
    const discount = e.target.discount.value;

    const updatedProduct = {
      description,
      expiryDate,
      code,
      discount,
    };

    axiosPublic
      .patch(`/coupon/${_id}`, updatedProduct)
      .then((response) => {
        toast.success("Product updated successfully!");
        refetch();
        navigate(`/dashboard/cupon-list`);
      })
      .catch((error) => {
        toast.error("Failed to update product");
        console.error("Error:", error);
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong!</div>;

  return (
    <div className="cupon-add-page p-6">
      <h1 className="text-3xl font-bold text-center mb-6">UpDate Coupon</h1>

      <form
        onSubmit={handleUpdate}
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
            defaultValue={coupon.code}
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
            defaultValue={coupon.expiryDate}
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
            defaultValue={coupon.description}
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
            defaultValue={coupon.discount}
            name="discount"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
            placeholder="Enter discount amount"
            required
          />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          UpDate Coupon
        </button>
      </form>
    </div>
  );
}
