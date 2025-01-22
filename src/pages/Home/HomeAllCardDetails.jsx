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
      console.error("Failed to update status:", error.message);
    }
  };

  // const handleVotes = async (id) => {
  //   const userId = user?._id || localStorage.getItem("user-id");
  //   if (!userId) {
  //     console.error("User ID not found.");
  //     return;
  //   }

  //   try {
  //     const res = await axiosPublic.patch(
  //       `/product-votes/${id}`,
  //       { userId },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("access-token")}`,
  //         },
  //       }
  //     );
  //     if (res.status === 200) {
  //       refetch(); // Assuming refetch is defined
  //     }
  //   } catch (error) {
  //     console.error("Failed to update votes:", error.message);
  //   }
  // };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">
        Error loading product details.
      </div>
    );

  const {
    name,
    photo,
    description,
    websiteLink,
    timestamp,
    status,
    email,
    price,
    condition,
    ownerName,
    ownerImage,

    votes,
    _id,
  } = product;

  return (
    <div className="container mx-auto p-4 w-11/12">
      {/* Product Details Section */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 border-2">
          <div className="flex justify-between">
            {" "}
            <img
              src={photo}
              alt={name}
              className="w-1/5 rounded-md md:h-32 object-cover"
            />
            <div className="flex gap-2">
              <Button.Group>
                <Button color="gray">
                  {" "}
                  <span>
                    <LiaExternalLinkAltSolid className="text-xl" />
                  </span>{" "}
                  Visit
                </Button>
              </Button.Group>{" "}
              <Button.Group onClick={() => handleVotes(product._id)}>
                <Button color="gray">
                  {" "}
                  <span>
                    <BiSolidUpvote className="text-xl" />
                  </span>{" "}
                  Votes {votes}
                </Button>
              </Button.Group>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">{name}</h1>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-semibold text-green-600">
              ${price}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
              {condition}
            </span>
          </div>
          {/* Seller Info */}
          <div className="border-t pt-4 mt-4">
            <h2 className="font-semibold text-lg">Seller Information</h2>
            <p>
              Name: <span className="font-medium">{ownerName}</span>
            </p>
            <p>
              Email: <span className="font-medium">{email}</span>
            </p>
            {/* {isVerified && (
              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-600 rounded-full">
                Verified Seller
              </span>
            )} */}
          </div>
          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Book Now
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Report Issue
            </button>
          </div>
          <div className="divider"></div>
          <div className="mt-5 ">
            <ProductComment daynamicId={_id} />
          </div>
        </div>
      </div>
    </div>
  );
}
