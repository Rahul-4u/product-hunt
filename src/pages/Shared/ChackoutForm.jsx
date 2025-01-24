import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ clientSecret, handleSubscription }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe.js has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Payment method creation error:", error.message);
      alert("Payment failed. Please check your card details.");
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      console.error("Payment confirmation error:", confirmError.message);
      alert("Payment failed. Please try again.");
      return;
    }

    if (paymentIntent.status === "succeeded") {
      alert("Payment successful!");
      await handleSubscription(); // Update subscription status
    } else {
      alert("Payment not completed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Card Details</label>
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
