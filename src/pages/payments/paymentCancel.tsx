import { useEffect } from "react";
import { MdSmsFailed } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './paymentSuccess.css';


function PaymentCancel() {
  const Navigate = useNavigate()
  useEffect(() => {
    // Redirect to confirmation page after a delay
    const timer = setTimeout(() => {
        Swal.fire({
            icon: "error",
            title: "Sorry..",
            text: "Your Booking is Cancelled.",
            didClose:()=>Navigate('/')
          });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="payment-success-container">
      <div className="payment-success-icon">
        <MdSmsFailed  size={96} color="red" />
      </div>
      <h1 className='successH1'>Payment Failed!</h1>
      <p>Please wait a moment, we will redirect you to the confirmation </p>
      <div className="loading-spinner"></div>
    </div>
  );
}

export default PaymentCancel
