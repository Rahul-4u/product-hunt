// PaymentPage.jsx
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ChackoutForm from "./ChackoutForm";

const Payment = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: mens = [], refetch } = useQuery({
    queryKey: ["sub"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/all-users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  const handlsubs = async () => {
    try {
      const res = await axiosPublic.patch(
        `/user-sub`,
        { email: user.email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      if (res.status === 200) {
        alert("Product status updated to Accepted!");
        refetch();
      }
    } catch (error) {
      console.error("Failed to update status:", error.message);
      alert("Failed to accept the product. Please try again.");
    }
  };

  const curentSubs = mens.find((item) => item.email === user.email);

  // ----------payment oparetor
  const stripePromise = loadStripe(
    "pk_test_51QgTa6F8Jy0oy5uAE4kCjWMoWXHLYO1bJTQJkQq6Vjyq3VYqClhM6LrfFuZFvXfFGFEfA1C1cSgcI5blu4kVueKi00zzVoutMV"
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Subscription Payment
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Choose Your Plan
        </h2>

        {/* Payment Form */}
        <div>
          <Elements stripe={stripePromise}>
            <ChackoutForm />
          </Elements>
        </div>
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Enter Payment Details
          </h3>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="cardName"
                className="block text-sm font-medium text-gray-700"
              >
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardName"
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiry"
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label
                  htmlFor="cvc"
                  className="block text-sm font-medium text-gray-700"
                >
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123"
                />
              </div>
            </div>
          </form>
          <button onClick={handlsubs}>{curentSubs?.subs}</button>
        </div>
      </main>
    </div>
  );
};

export default Payment;
