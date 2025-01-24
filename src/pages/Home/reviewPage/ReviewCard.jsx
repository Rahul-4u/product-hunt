import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Avatar, Blockquote, Rating } from "flowbite-react";

export default function ReviewCard({ perenId }) {
  const axiosPublic = useAxiosPublic();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews-data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      console.log("Fetched pending products data:", res.data);
      return res.data;
    },
  });

  // Filter products that match the perenId
  const filteredProducts = products?.filter(
    (product) => product.daynamicId === perenId
  );

  return (
    <div>
      <h2>ReviewCard {filteredProducts?.length}</h2>
      <div>
        {filteredProducts?.length > 0 ? (
          filteredProducts?.map((product, index) => (
            <figure
              key={index}
              className="max-w-screen-md md:border-2 md:p-4  md:my-4 md:rounded-md"
            >
              <div className="mb-4 flex items-center">
                <Rating size="md">
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                  <Rating.Star />
                </Rating>
              </div>
              <Blockquote>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {product?.comment}
                </p>
              </Blockquote>
              <figcaption className="mt-6 flex items-center space-x-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={product?.photoURL}
                  alt=""
                />

                <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
                  <cite className="pr-3 font-medium text-gray-900 dark:text-white">
                    {product?.displayName}
                  </cite>
                  <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
                    {product?.email}
                  </cite>
                </div>
              </figcaption>
            </figure>
          ))
        ) : (
          <p>No matching products found.</p>
        )}
      </div>
    </div>
  );
}
