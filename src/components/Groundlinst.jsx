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
