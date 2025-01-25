import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ProductComment from "./reviewPage/ProductComment";
import { Button } from "flowbite-react";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { BiSolidUpvote } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";

export default function HomeAllCardDetails() {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

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

  const handleVotes = async (productId) => {
    if (!user?._id) {
      alert("Please log in to vote.");
      return;
    }

    try {
      const res = await axiosPublic.patch(
        `/product-votes/${productId}`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      if (res.status === 200) {
        refetch();
        alert("Vote submitted successfully!");
      }
    } catch (error) {
      console.error("Failed to update votes:", error.message);
      alert("An error occurred while submitting your vote. Please try again.");
    }
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">
        Error loading product details. Please try again later.
      </div>
    );

  const {
    name,
    photo,
    description,
    websiteLink,
    timestamp,
    votes,
    price,
    condition,
    ownerName,
    ownerImage,
  } = product;

  return (
    <div className="container mx-auto p-4 w-11/12">
      {/* Product Details Section */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 border-2">
          <div className="flex justify-between">
            <img
              src={photo || "/default-product.jpg"}
              alt={name}
              className="w-1/5 rounded-md md:h-32 object-cover"
            />
            <div className="flex gap-2">
              <Button.Group>
                <Button color="gray">
                  <LiaExternalLinkAltSolid className="mr-1" />
                  <a
                    href={websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
                  </a>
                </Button>
                <Button onClick={() => handleVotes(id)} color="success">
                  <BiSolidUpvote className="mr-1" />
                  {votes || 0} Votes
                </Button>
              </Button.Group>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-gray-600">{description}</p>
            <p className="mt-2">
              <strong>Condition:</strong> {condition || "Not specified"}
            </p>
            <p>
              <strong>Price:</strong> ${price || "Contact for pricing"}
            </p>
            <p>
              <strong>Owner:</strong> {ownerName || "Unknown"}
            </p>
            <p className="text-gray-500 text-sm">
              Posted on: {new Date(timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Product Comments */}
      <ProductComment productId={id} />
    </div>
  );
}
