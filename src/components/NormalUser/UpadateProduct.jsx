import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function UpdateProduct() {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the product details
  const {
    data: product = {},
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-product", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/all-product/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { _id } = product;

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    const updatedProduct = {
      name,
      photo,
    };

    axiosPublic
      .patch(`/product/${_id}`, updatedProduct)
      .then((response) => {
        toast.success("Product updated successfully!");
        refetch();
        navigate(`/dashboard/my-products`);
      })
      .catch((error) => {
        toast.error("Failed to update product");
        console.error("Error:", error);
      });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong!</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Update Product {product?.name}
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-2 text-lg">Current Name</label>
          <input
            type="text"
            name="name"
            defaultValue={product?.name}
            className="border w-full p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-2 text-lg">Current Photo URL</label>
          <input
            type="text"
            name="photo"
            defaultValue={product?.photo}
            className="border w-full p-2 rounded bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
