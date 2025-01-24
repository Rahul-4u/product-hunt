import { createBrowserRouter, parsePath } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Signup from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Dashboard from "../Layout/Dashboard";
import MyProfile from "../userDashboard/MyProfile";
import AddProduct from "../userDashboard/AddProduct";
import AllProducts from "../pages/AllProcducts/AllProducts";
import MyProducts from "../components/NormalUser/MyProducts";
import ManageUser from "../components/Admin/ManageUser";
import PendingProducts from "../components/Moderator/PendingProducts";
import ModeratorDetails from "../components/Moderator/ModeratorDetails";
import Mdetails from "../components/Moderator/Mdetails";
import ReportedContents from "../components/Moderator/ReportedContents";
import HomeAllCardDetails from "../pages/Home/HomeAllCardDetails";
import ReviewCard from "../pages/Home/reviewPage/ReviewCard";
import UpadateProduct from "../components/NormalUser/UpadateProduct";
import ReportDetails from "../pages/AllProcducts/ReportDetails";
import Statistics from "../components/Admin/Statistics";
import CuponAdd from "../components/Admin/CuponAdd";
import CouponList from "../components/Admin/CouponList";
import UpdateCoupon from "../components/Admin/UpdateCoupon";
import SubscriptionPage from "../pages/Shared/SubscriptionPage";
import Payment from "../pages/Shared/Payment";
import ErrorPage from "../pages/Shared/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/all-product/:id",
        element: (
          <PrivateRoute>
            <HomeAllCardDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/reviews-data/:id",
        element: <ReviewCard />,
      },
      {
        path: "/subscrip",
        element: <SubscriptionPage />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/pending-products/:id",
        element: (
          <PrivateRoute>
            <Mdetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/report-products/:id",
        element: <ReportDetails />,
      },
      {
        path: "/dashboard/product-update/:id",
        element: <UpadateProduct />,
      },
      {
        path: "/dashboard/coupon-update/:id",
        element: <UpdateCoupon />,
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            {" "}
            <AddProduct />,
          </PrivateRoute>
        ),
      },
      {
        path: "my-products",
        element: <MyProducts />,
      },
      {
        path: "manage-user",
        element: <ManageUser />,
      },

      {
        path: "statistics-admin",
        element: <Statistics />,
      },
      {
        path: "add-cupon",
        element: <CuponAdd />,
      },
      {
        path: "pending-products",
        element: <PendingProducts />,
      },
      {
        path: "/dashboard/repot-contenst",
        element: <ReportedContents />,
      },
      {
        path: "cupon-list",
        element: <CouponList />,
      },
    ],
  },
  {
    path: "/signUp",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
