/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import GroundItem from "./GroundItem";
import { useNavigate } from "react-router-dom";

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
    <div className="grounds-list-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
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
  );
};

export default GroundsList;
