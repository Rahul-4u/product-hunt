import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const axiosPublic = useAxiosPublic(); // Custom Axios instance

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axiosPublic
      .post("/create-payment-intent", {
        amount: 1000, // Amount in cents (e.g., $10.00)
      })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => setError("Failed to create payment intent", err));
  }, [axiosPublic]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setProcessing(true);

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet.");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("No card information found.");
      setProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Customer Name", // Replace with dynamic user data if available
          },
        },
      }
    );

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setSuccess("Payment successful!");
      setProcessing(false);
    }
  };

  return (
    <div>
      <h2>Checkout Form</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || processing || !clientSecret}
          style={{
            marginTop: "20px",
            backgroundColor: processing ? "#ddd" : "#5469d4",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: processing ? "not-allowed" : "pointer",
          }}
        >
          {processing ? "Processing..." : "Pay $10"}
        </button>
      </form>
    </div>
  );
}
