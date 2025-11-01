import React from "react";
import { useNavigate } from "react-router-dom";
import vidSrc from "../assets/vid/volly.mp4";

function Hometwo() {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/grounds"); // redirect to your grounds route
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-start overflow-hidden">
      {/* Background Video */}
      <video
        src={vidSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay (dark gradient for better text visibility) */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 w-1/2 px-10 text-white flex flex-col items-start">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Play. Sweat. <span className="text-green-400">Inspire.</span>
        </h1>
        <p className="text-lg mb-8 max-w-md">
          Fitness isn’t just about training the body — it’s about awakening the
          mind. Join us on the field, fuel your energy, and make every game count.
        </p>
        <button
          onClick={handleBook}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
        >
          Book Venue
        </button>
      </div>
    </div>
  );
}

export default Hometwo;
