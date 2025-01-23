import Banner from "../../components/home/Banner";
import CouponSlider from "../../components/home/CouponSlider";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import TrendingProducts from "../../components/home/TrendingProducts";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <TrendingProducts />
      <CouponSlider />
    </div>
  );
}
