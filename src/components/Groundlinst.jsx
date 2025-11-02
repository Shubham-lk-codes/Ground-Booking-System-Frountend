/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import GroundItem from "./GroundItem";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";

export const GroundsList = () => {
  const [grounds, setGrounds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const response = await axios.get("http://localhost:5000/grounds");
        setGrounds(response.data.grounds);
      } catch (error) {
        console.error("Error fetching grounds:", error);
      }
    };
    fetchGrounds();
  }, []);

  // ✅ Helper to create slug from name
  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // replace spaces/symbols with -
      .replace(/^-+|-+$/g, ""); // trim hyphens

  const handleBooking = (id, name) => {
    const slug = slugify(name);
    navigate(`/grounds/${id}/${slug}`); // ✅ navigate with slug
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl pt-20">
        {/* Dropdown */}
        <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500">
          <option value="">All</option>
          <option value="grounds">Grounds</option>
          <option value="owners">Owners</option>
          <option value="users">Users</option>
        </select>

        {/* Search Field */}
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {/* Button */}
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Search
        </button>
      </div>

      <div className="grounds-list-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5 pt-20">
        {grounds.map((ground) => (
          <GroundItem
            key={ground._id}
            name={ground.name}
            imageUrl={ground.imageUrl}
            description={ground.description}
            pricePerHour={ground.pricePerHour}
            onBook={() => handleBooking(ground._id, ground.name)}
          />
        ))}
      </div>
    </>
  );
};

export default GroundsList;
