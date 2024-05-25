import { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './paymentSuccess.css';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
function PaymentSuccess() {
    const Navigate = useNavigate()
  useEffect(() => {
    // Redirect to confirmation page after a delay
    const timer = setTimeout(() => {
        Swal.fire({
            icon: "success",
            title: "Congratulations..",
            text: "Your Booking is Confirmed.",
            didClose:()=>Navigate('/')
          });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="payment-success-container">
      <div className="payment-success-icon">
        <FaCheckCircle size={96} color="#28a745" />
      </div>
      <h1 className='successH1'>Payment Success!</h1>
      <p>Please wait a moment, we will redirect you to the confirmation </p>
      <div className="loading-spinner"></div>
    </div>
  );
}

export default PaymentSuccess;
