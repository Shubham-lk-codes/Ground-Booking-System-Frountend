/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GroundItem from './GroundItem';

export const GroundsList = () => {
  const [grounds, setGrounds] = useState([]);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/grounds'); // Adjust API endpoint
        setGrounds(response.data.grounds);
      } catch (error) {
        console.error('Error fetching grounds:', error);
      }
    };

    fetchGrounds();
  }, []);

  const handleBooking = async (groundId) => {
    const amount = 500; // Example booking amount
    const userId = "12345"; // Replace with logged-in user ID

    try {
      // Step 1: Create order
      const orderResponse = await axios.post('http://localhost:5000/api/payment/create-order', {
        amount,
        groundId,
        userId,
      });

      const { orderId, amount: orderAmount, currency } = orderResponse.data;

      // Step 2: Initialize Razorpay
      const options = {
        key: "rzp_live_W52is7CYnDpVKo", // Razorpay Key ID
        amount: orderAmount,
        currency,
        name: "Ground Booking",
        description: `Booking ground: ${groundId}`,
        order_id: orderId,
        handler: async function (response) {
          const verificationResponse = await axios.post('http://localhost:5000/api/payment/verify-payment', {
            ...response,
            groundId,
            userId,
            amount,
          });

          if (verificationResponse.data.success) {
            alert('Payment successful! Booking confirmed.');
          } else {
            alert('Payment verification failed.');
          }
        },
        prefill: {
          name: "John Doe", // Replace with logged-in user name
          email: "john.doe@example.com", // Replace with logged-in user email
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error in booking:', error);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="grounds-list-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
      {grounds.map((ground) => (
        <GroundItem
          key={ground._id}
          name={ground.name}
          imageUrl={ground.imageUrl}
          description={ground.description}
          onBook={() => handleBooking(ground._id)}
        />
      ))}
    </div>
  );
};

export default GroundsList;
