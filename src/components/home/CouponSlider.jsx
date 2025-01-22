import { useQuery } from "@tanstack/react-query";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const CouponSlider = () => {
  const axiosPublic = useAxiosPublic();
  const { data: coupons = [], refetch } = useQuery({
    queryKey: ["Active"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/active-coupon`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      console.log("Fetched pending products data:", res.data);
      return res.data;
    },
  });

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Valid Coupons</h2>
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showThumbs={false}
        showStatus={false}
        emulateTouch={true}
        className="max-w-3xl mx-auto"
      >
        {coupons.map((coupon) => (
          <div key={coupon.code} className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-lg font-bold mb-2">{coupon.code}</h3>
            <p className="text-gray-700 mb-2">{coupon.description}</p>
            <p className="text-green-600 font-bold mb-2">
              Discount: {coupon.discount}
            </p>
            <p className="text-red-500">
              Expires on: {new Date(coupon.expiryDate).toDateString()}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CouponSlider;
