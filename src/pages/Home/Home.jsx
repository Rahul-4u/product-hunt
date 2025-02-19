import { NavLink } from "react-router-dom";
import Banner from "../../components/home/Banner";
import CouponSlider from "../../components/home/CouponSlider";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import TrendingProducts from "../../components/home/TrendingProducts";
import TopProducts from "../../components/home/TopProducts";
import RecentProducts from "../../components/home/RecentProducts";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <TrendingProducts />
      <TopProducts />
      <RecentProducts />
      <CouponSlider />
    </div>
  );
}
