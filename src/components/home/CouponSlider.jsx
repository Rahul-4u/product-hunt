import { useQuery } from "@tanstack/react-query";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const CouponSlider = () => {
  const { darkMode } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: coupons = [], refetch } = useQuery({
    queryKey: ["Active"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/active-coupon`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  return (
    <div className="mt-12 px-4 md:px-8 my-20 lg:px-16">
      <h2 className="text-3xl font-bold mb-6 text-center">Valid Coupons</h2>
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showThumbs={false}
        showStatus={false}
        emulateTouch={true}
        className="max-w-4xl mx-auto"
      >
        {coupons.map((coupon) => (
          <div
            key={coupon.code}
            className={`p-6 md:p-8 lg:p-10 rounded-lg shadow-lg ${
              darkMode
                ? "bg-gray-800 text-white"
                : " shadow-xl bg-gray-200 text-gray-900"
            }`}
          >
            <h3 className="text-xl font-bold mb-2">{coupon.code}</h3>
            <p className="mb-2">{coupon.description}</p>
            <p className="text-green-500 font-semibold mb-2">
              Discount: {coupon.discount}
            </p>
            <p className="text-red-500 font-medium">
              Expires on: {new Date(coupon.expiryDate).toDateString()}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CouponSlider;
