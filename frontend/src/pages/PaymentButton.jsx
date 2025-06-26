import axios from "axios";

const PaymentButton = ({ amount, bookingData }) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const handlePayment = async () => {
    try {
      // 1. Create order on backend
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/payments/create-order`,
        { amount },
        { withCredentials: true }
      );

      const { id: order_id } = data.order;

      // 2. Configure Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "Bookify",
        description: "Ticket Booking Payment",
        order_id,
        handler: async function (response) {
          const verifyRes = await axios.post(
            `${BASE_URL}/api/v1/payments/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { withCredentials: true }
          );

          if (verifyRes.data.success) {
            alert("Payment Successful!");
            // Optionally confirm booking
            // await axios.post(`${BASE_URL}/api/v1/bookings/confirm`, { bookingData });
          }
        },
        prefill: {
          name: "Sandeep Repala",
          email: "test@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <button onClick={handlePayment} className="btn btn-primary">
      Pay ₹{amount}
    </button>
  );
};

export default PaymentButton;
