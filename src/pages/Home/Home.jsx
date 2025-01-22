import { Component } from "../../components/Component";
import Banner from "../../components/home/Banner";
import CouponSlider from "../../components/home/CouponSlider";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import TrendingProducts from "../../components/home/TrendingProducts";
import PendingProducts from "../../components/Moderator/PendingProducts";
import useAuth from "../../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <TrendingProducts />
      <CouponSlider />
      <Component />
      <PendingProducts />
    </div>
  );
}
