/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import GroundItem from "./GroundItem";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";
import { Search } from "lucide-react"; // ✅ Icon import
import Footer from "./footer";

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
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleBooking = (id, name) => {
    const slug = slugify(name);
    navigate(`/grounds/${id}/${slug}`);
  };

  return (
    <>
    
      <Navbar />

      {/* Header + Filters (One Line Layout) */}
      <div className="pt-24 px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-gray-100 p-4 rounded-xl shadow-sm">
          {/* Title */}
          <h1 className="text-lg md:text-xl font-semibold text-gray-800 whitespace-nowrap">
            Sports Venues in Delhi: Discover & Book Nearby Venues
          </h1>

          {/* Right Side: Dropdown + Search */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Dropdown */}
            <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500">
              <option value="">All Sports</option>
              <option value="Cricket">Cricket</option>
              <option value="Football">Football</option>
              <option value="Tennis">Tennis</option>
            </select>

            {/* Search Field with Icon */}
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search venues..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center md:justify-start gap-6 text-gray-700 text-sm md:text-base px-6 mt-6">
        <p className="font-medium">
          Venues <span className="text-blue-600">{grounds.length}</span>
        </p>
        <p className="font-medium">
          Events <span className="text-blue-600">(4)</span>
        </p>
      </div>

      {/* Grounds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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
      <Footer />
    </>
  );
};

export default GroundsList;
