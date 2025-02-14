import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import axios from "axios";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate instead of useHistory
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    // Capture query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get("status");
    const refId = queryParams.get("refId");
    const amount = queryParams.get("amount");
    const pid = queryParams.get("pid");
    const event_id = queryParams.get("event_id");
    const quantity = queryParams.get("quantity");

    if (paymentStatus === "Success") {
      // Send payment details to backend for verification
      axios
        .post("/api/verify-esewa", {
          amount,
          refId,
          pid,
          event_id,
          quantity,
        })
        .then((response) => {
          setLoading(false);
          setStatusMessage(
            "Payment Verified Successfully! Your ticket is confirmed."
          );
          // Redirect to a ticket confirmation page or show ticket info
          setTimeout(() => {
            navigate("/ticket-confirmation"); // use navigate instead of history.push
          }, 3000);
        })
        .catch((error) => {
          setLoading(false);
          setStatusMessage("Payment Verification Failed. Please try again.");
          console.error("Payment Verification Error: ", error);
        });
    } else {
      setLoading(false);
      setStatusMessage(
        "Payment Failed! Please check your payment and try again."
      );
    }
  }, [location, navigate]); // Change history to navigate

  return (
    <div className="payment-status-container">
      <h2>Payment Status</h2>
      {loading ? (
        <p>Processing your payment...</p>
      ) : (
        <div>
          <p>{statusMessage}</p>
          <button onClick={() => navigate("/")}>Go Back to Home</button>{" "}
          {/* use navigate instead of history.push */}
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
