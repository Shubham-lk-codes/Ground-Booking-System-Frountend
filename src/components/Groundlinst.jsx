/* eslint-disable no-unused-vars */
import React from 'react';
import GroundItem from './GroundItem'; // Import the GroundItem component
import { Link } from 'react-router-dom';
import { Navbar } from './navbar';

export const GroundsList = () => {
  // Array of ground data (name, image, description)
   const grounds = [
    {
      name: 'Sunshine Turf',
      imageUrl: './img/2.jpg',
      description: 'A well-maintained turf suitable for all kinds of sports.'
    },
    {
      name: 'Greenfield Stadium',
      imageUrl: './img/3.jpg',
      description: 'The perfect location for football and cricket matches.'
    },
    {
      name: 'BlueSky Sports Arena',
      imageUrl: './img/4.jpg',
      description: 'A large arena with seating and facilities for large events.'
    },
    {
      name: 'Ajay Dayal Sport Club',
      imageUrl: './img/5.jpg',
      description: 'A large arena with seating and facilities for large events.'
    },
    {
      name: 'BlueSky Sports Arena',
      imageUrl: './img/6.jpg',
      description: 'A large arena with seating and facilities for large events.'
    },
    {
      name: 'BlueSky Sports Arena',
      imageUrl: './img/7.jpg',
      description: 'A large arena with seating and facilities for large events.'
    },
    {
      name: 'BlueSky Sports Arena',
      imageUrl: './img/8.jpg',
      description: 'A large arena with seating and facilities for large events.'
    },
    // Add more grounds here
  ];

  return (
    
    <Link to="/booking"><div className="grounds-list-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
      
      {grounds.map((ground, index) => (
        <GroundItem
          key={index}
          name={ground.name}
          imageUrl={ground.imageUrl}
          description={ground.description}
        />
      ))}
    </div>
    </Link>
  );
};

export default GroundsList;
