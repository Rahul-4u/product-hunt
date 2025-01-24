import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SubscriptionPage = () => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Handle the coupon code application
  const handleCouponApply = () => {
    if (couponCode === "SAVE10") {
      setDiscount(10); // Apply 10% discount
    } else {
      alert("Invalid coupon code");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Main Subscription Section */}
      <section className="flex justify-center mt-12 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Basic Plan */}
          {/* <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold">Basic Plan</h3>
            <p className="text-lg mt-2">$10/month</p>
            <ul className="mt-4 list-disc pl-6 text-gray-700">
              <li>Access to all tech products</li>
              <li>Upvote functionality</li>
            </ul>
            <NavLink
              to={"/payment"}
              className="bg-green-500 text-white mt-6 py-2 px-4 rounded hover:bg-green-600"
            >
              Subscribe Now
            </NavLink>
          </div> */}

          {/* Premium Plan */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold">Premium Plan</h3>
            <p className="text-lg mt-2">$20/month</p>
            <ul className="mt-4 list-disc pl-6 text-gray-700">
              <li>All features of Basic Plan</li>
              <li>Exclusive Coupons</li>
              <li>Featured Product Access</li>
            </ul>
            <button className="bg-green-500 text-white mt-6 py-2 px-4 rounded hover:bg-green-600">
              Subscribe Now
            </button>
          </div>

          {/* Coupon Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold">Have a Coupon Code?</h3>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="mt-4 p-2 border border-gray-300 rounded w-full"
            />
            <button
              onClick={handleCouponApply}
              className="bg-blue-500 text-white mt-4 py-2 px-4 rounded hover:bg-blue-600"
            >
              Apply Coupon
            </button>
            {discount > 0 && (
              <p className="text-green-500 mt-2">Discount: ${discount}</p>
            )}
          </div>
        </div>
      </section>

      {/* Payment Section */}
      {/* <section className="mt-12 text-center">
        <h3 className="text-2xl font-semibold">Payment</h3>
        <p className="mt-4 text-xl">Total: ${20 - discount}/month</p>
        <button className="bg-orange-500 text-white py-2 px-6 rounded mt-4 hover:bg-orange-600">
          <NavLink to={"/payment"}>Proceed to Payment</NavLink>
        </button>
      </section> */}

      {/* Footer */}
    </div>
  );
};

export default SubscriptionPage;
