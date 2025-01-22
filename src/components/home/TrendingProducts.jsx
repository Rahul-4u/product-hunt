import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { BiSolidUpvote } from "react-icons/bi";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";

export default function TrendingProducts() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trending-product`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      console.log("Fetched pending products data:", res.data);
      return res.data;
    },
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

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Trending Products{products.length}
          </h2>
          <p className="text-gray-600 mt-4">
            Check out our latest and greatest products specially selected for
            you.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                className="w-full h-64 object-cover"
                src={product.photo}
                alt={product.title}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-3">{product.description}</p>
                <p>{product.timestamp}</p>
                <div className="flex gap-2">
                  {product?.tags?.map((tag, index) => (
                    <p key={index}># {tag}</p>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-lg font-semibold text-primary">
                    {product.price}
                  </span>
                  <button
                    onClick={() => handleVotes(product._id, user._id)}
                    className="btn bg-orange-400"
                  >
                    {" "}
                    <BiSolidUpvote />
                    {product.votes}
                  </button>
                  <button className="btn btn-primary">
                    <NavLink
                      to={`/all-product/${product._id}`}
                      className="text-white"
                    >
                      Details
                    </NavLink>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
