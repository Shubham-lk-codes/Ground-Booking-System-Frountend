import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const venues = [
  {
    id: 1,
    name: "Elite Sports Arena",
    description: "Spacious turf with night lights and locker rooms.",
    rating: "4.8★",
    img: "https://images.unsplash.com/photo-1599058917212-d750089bc07d",
  },
  {
    id: 2,
    name: "Green Valley Ground",
    description: "Perfect for cricket and football practice.",
    rating: "4.6★",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb",
  },
  {
    id: 3,
    name: "Skyline Turf",
    description: "Premium synthetic turf with seating area.",
    rating: "4.9★",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  },
  {
    id: 4,
    name: "Champion's Arena",
    description: "Great facilities and coaching options available.",
    rating: "4.7★",
    img: "https://images.unsplash.com/photo-1594737625785-c3b031b5a3c1",
  },
  {
    id: 5,
    name: "Urban Kick Park",
    description: "Cityside turf ideal for quick matches.",
    rating: "4.5★",
    img: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
  },
  {
    id: 6,
    name: "Legends Playfield",
    description: "Well-maintained football ground with ample parking.",
    rating: "4.8★",
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
  },
  {
    id: 7,
    name: "Victory Sports Complex",
    description: "Indoor & outdoor courts available for rent.",
    rating: "4.9★",
    img: "https://images.unsplash.com/photo-1577985759186-0854dfd3f218",
  },
  {
    id: 8,
    name: "Arena 24x7",
    description: "Play anytime with 24/7 open turf and lights.",
    rating: "4.7★",
    img: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a",
  },
  {
    id: 9,
    name: "Royal Sports Park",
    description: "Spacious multi-sport ground with cafe.",
    rating: "4.6★",
    img: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  },
  {
    id: 10,
    name: "NextGen Sports Hub",
    description: "Modern turf with great ambience and sound system.",
    rating: "4.9★",
    img: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
  },
];

function Homeone() {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const { current } = sliderRef;
    if (!current) return;

    const scrollAmount = 300; // pixels to scroll each time
    current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full py-10 bg-gray-50">
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
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="min-w-[250px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <img
              src={venue.img}
              alt={venue.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {venue.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {venue.description}
              </p>
              <p className="text-yellow-500 font-semibold mt-2">
                ⭐ {venue.rating}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homeone;
