/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FaStar, FaFutbol, FaBaseballBall } from "react-icons/fa"; // icons

const GroundItem = ({ name, imageUrl, description, onBook, pricePerHour }) => {
  return (
    <div className="ground-item bg-white shadow-md rounded p-4 hover:scale-105 transition-transform">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600">{description}</p>

      {/* Price, Rating & Sports Row */}
      <div className="flex items-center justify-between mt-3">
        {/* Left side - Price */}
        <p className="text-gray-800 font-bold">₹{pricePerHour}/hour</p>

        {/* Right side - Rating & Sports */}
        <div className="flex items-center space-x-3">
          {/* Rating */}
          <div className="flex items-center text-yellow-500 text-sm">
            <FaStar className="mr-1" />
            <span className="text-gray-700 font-medium">4.5</span>
          </div>

          {/* Sports Icons */}
          <div className="flex items-center space-x-2 text-gray-700 text-lg">
            <FaFutbol />
            <FaBaseballBall />
          </div>
        </div>
      </div>

      <button
        onClick={onBook}
        className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Book Now
      </button>
    </div>
  );
};

export default GroundItem;
