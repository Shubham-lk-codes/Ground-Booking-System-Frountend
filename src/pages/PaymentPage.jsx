/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';

export const BookGround = ({ groundId, userId }) => {
  const [amount, setAmount] = useState(500); // Example amount
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = async () => {
    try {
      // Step 1: Create order on backend
      const { data } = await axios.post('/api/payments/create-order', {
        amount,
        groundId,
        userId,
      });

      const options = {
        key: data.key, // Razorpay key
        amount: data.amount, // Amount in paise
        currency: data.currency,
        name: 'Ground Booking',
        description: `Booking for Ground ID: ${groundId}`,
        order_id: data.orderId, // Order ID from backend
        handler: async (response) => {
          try {
            // Step 3: Verify payment on backend
            const verifyRes = await axios.post('/api/payments/verify-payment', response);
            if (verifyRes.data.success) {
              setPaymentStatus('Payment Successful! Your booking is confirmed.');
            } else {
              setPaymentStatus('Payment verification failed.');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
            setPaymentStatus('Error verifying payment.');
          }
        },
        prefill: {
          name: 'Your Name',
          email: 'your.email@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      setPaymentStatus('Error initiating payment.');
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Book Ground</h2>
      <p className="text-lg text-gray-600 mb-4">Amount: ₹{amount}</p>
      <button
        onClick={handlePayment}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
      >
        Pay Now
      </button>
      {paymentStatus && (
        <p
          className={`mt-4 text-center font-semibold ${
            paymentStatus.includes('Successful')
              ? 'text-green-600'
              : 'text-red-600'
          }`}
        >
          {paymentStatus}
        </p>
      )}
    </div>
  );
};

export default BookGround;
``
