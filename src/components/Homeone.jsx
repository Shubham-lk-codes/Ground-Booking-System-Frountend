import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Homeone() {
  const sliderRef = useRef(null);
  const [grounds, setGrounds] = useState([]);

  // ✅ Fetch grounds from backend
  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const response = await axios.get("http://localhost:5000/grounds");
        setGrounds(response.data.grounds); // response = { success, grounds: [...] }
      } catch (error) {
        console.error("Error fetching grounds:", error);
      }
    };
    fetchGrounds();
  }, []);

  // ✅ Scroll functionality
  const scroll = (direction) => {
    const { current } = sliderRef;
    if (!current) return;
    const scrollAmount = 300;
    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full py-10 bg-gray-50 h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Suggested Venues For You
      </h1>

      {/* Left and Right Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 z-10"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 z-10"
      >
        <ChevronRight size={28} />
      </button>

      {/* Horizontal Scroll Container */}
      <div
        ref={sliderRef}
        className="flex overflow-x-hidden scroll-smooth gap-6 px-10"
      >
        {grounds.length === 0 ? (
          <p className="text-gray-500 text-center w-full">
            Loading venues...
          </p>
        ) : (
          grounds.map((ground) => (
            <div
              key={ground._id}
              className="min-w-[250px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <img
                src={
                  ground.imageUrl ||
                  ground.details?.sliderImages?.[0] ||
                  "https://via.placeholder.com/400x250?text=No+Image"
                }
                alt={ground.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {ground.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {ground.details?.speciality || "Speciality not added"}
                </p>
                <p className="text-yellow-500 font-semibold mt-2">
                  ⭐ {ground.details?.rating || "N/A"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homeone;
