/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const GroundItem = ({ name, imageUrl, description, onBook }) => {
  return (
    <div className="ground-item bg-white shadow-md rounded p-4">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover rounded mb-4" />
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
      <button
        onClick={onBook}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Book Now
      </button>
    </div>
  );
};

export default GroundItem;
