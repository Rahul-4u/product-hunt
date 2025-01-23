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

  if (isLoading) return <p>Loading product details...</p>;
  if (error) return <p>Failed to fetch product details: {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product?.photo} alt={product.name} className="w-64 h-40 my-4" />
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Status:</strong> {product.status}
      </p>
      <p>
        <strong>Votes:</strong> {product.votes}
      </p>
    </div>
  );
}
