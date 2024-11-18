/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const GroundItem = ({ name, imageUrl, description }) => {
  return (
    <div className="ground-item bg-white shadow-lg rounded-lg p-5 flex flex-col items-center">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default GroundItem;
