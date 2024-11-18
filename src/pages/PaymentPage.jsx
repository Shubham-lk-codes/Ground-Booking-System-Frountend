/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';

export const PaymentPage = () => {
  const handlePayment = async () => {
    try {
      
      const {data:{key}}= await axios.post("http://localhost:5000/api/getkey")

      // Step 1: Create an order on the server
      const { data: order } = await axios.post('/api/payment/create-order', {
        amount: 500, // Amount in INR
      });

      // Step 2: Display Razorpay payment modal
      const options = {
        key, // Razorpay key_id
        amount: order.amount,
        currency: order.currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: order.id,
        handler: async function (response) {
          // Step 3: Verify payment on the server
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          const verification = await axios.post('/api/payment/verify-payment', {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          });

          if (verification.data.success) {
            alert('Payment Successful!');
          } else {
            alert('Payment Verification Failed!');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error in payment:', error);
    }
  };

  return (
    <div className="payment-page">
      <h1>Pay with Razorpay</h1>
      <button onClick={handlePayment} className="btn btn-primary">
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
