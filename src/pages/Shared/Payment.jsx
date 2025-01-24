import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const stripePromise = loadStripe(
  "pk_test_51QgTa6F8Jy0oy5uAE4kCjWMoWXHLYO1bJTQJkQq6Vjyq3VYqClhM6LrfFuZFvXfFGFEfA1C1cSgcI5blu4kVueKi00zzVoutMV"
);

const CheckoutForm = ({ handleSubscription }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error.message);
      alert("Payment failed!");
    } else {
      console.log("PaymentMethod:", paymentMethod);
      await handleSubscription();
      alert("Payment successful!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <label className="block text-sm font-medium text-gray-700">
        Card Details
      </label>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#32325d",
              "::placeholder": { color: "#aab7c4" },
            },
          },
        }}
        className="mt-2 border px-4 py-2 rounded"
      />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded shadow"
      >
        Pay Now
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleSubscription = async () => {
    try {
      const res = await axiosPublic.patch(
        "/create-payment-intent",
        { email: user.email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      if (res.status === 200) {
        console.log("Subscription updated");
      }
    } catch (error) {
      console.error("Subscription update failed:", error.message);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Subscription Payment
            </h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Enter Payment Details
          </h2>
          <CheckoutForm handleSubscription={handleSubscription} />
        </main>
      </div>
    </Elements>
  );
};

export default PaymentPage;
