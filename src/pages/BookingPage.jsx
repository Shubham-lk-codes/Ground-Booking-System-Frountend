import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { Star, Share2 } from "lucide-react";
import { FaStar, FaFutbol, FaBaseballBall } from "react-icons/fa";
import { BookingPagecom } from "../components/BookingPageComp";
import Footer from "../components/footer";
import { Navbar } from "../components/navbar";

export const BookingPage = () => {
  const { id, name } = useParams();
  const sliderRef = useRef(null);
  const [ground, setGround] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [grounds, setGrounds] = useState([]);
  const [rating,setRating]=useState(0);
  const [essage,setMessage]=useState("");

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

  useEffect(() => {
    const fetchGround = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/grounds/${id}`);
        setGround(response.data.ground);
      } catch (error) {
        console.error("Error fetching ground:", error);
      }
    };
    fetchGround();
  }, [id]);

  useEffect(() => {
    if (!ground?.imageUrl) return;
    const slides = sliderRef.current?.querySelectorAll(".slider-img");
    if (!slides) return;

    slides.forEach((img, i) => (img.style.opacity = i === 0 ? 1 : 0));

    let tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    slides.forEach((img) => {
      tl.to(img, {
        opacity: 1,
        duration: 1,
        scale: 1.05,
        ease: "power2.out",
      }).to(img, {
        opacity: 0,
        duration: 1,
        scale: 1,
        ease: "power2.in",
        delay: 2,
      });
    });
    return () => tl.kill();
  }, [ground]);

  if (!ground)
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Loading Ground Details...
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center bg-gray-50 pb-20 pt-20">
        {/* ===== TOP SECTION ===== */}
        <div className="flex flex-col w-full max-w-[1300px] px-5 lg:px-0 mt-8">
          {/* NAME + RATING */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {ground.name || name}
            </h1>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg mt-4 md:mt-0 transition">
              Book Now
            </button>
          </div>

          {/* LOCATION + RATING */}
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-gray-600 text-lg">
              📍 {ground.location || "Palace Road"}
            </span>
            <div className="flex items-center text-yellow-500">
              <Star className="w-5 h-5 fill-yellow-500 text-yellow-500 mr-1" />
              <span className="text-gray-700 font-semibold">3.5</span>
              <span className="text-gray-500 ml-1 text-sm">(13 ratings)</span>
              <button className="ml-3 text-green-600 text-sm font-semibold hover:underline">
                Rate Venue
              </button>
            </div>
          </div>

          {/* IMAGE + DETAILS */}
          <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg overflow-hidden">
            {/* LEFT IMAGE SECTION */}
            <div
              ref={sliderRef}
              className="relative w-full lg:w-[65%] h-[350px] lg:h-[500px] overflow-hidden"
            >
              <motion.img
                src={ground.imageUrl}
                alt={ground.name}
                className="slider-img absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
              />
            </div>

            {/* RIGHT DETAILS SECTION */}
            <div className="w-full lg:w-[35%] bg-white p-6 flex flex-col justify-between">
              {/* SHARE + CORPORATE */}
              <div className="flex flex-col sm:flex-row justify-between mb-6">
                <button className="flex items-center justify-center border border-gray-300 rounded-md py-2 px-4 mb-3 sm:mb-0 hover:bg-gray-100">
                  <Share2 className="w-5 h-5 mr-2" /> Share
                </button>
                <button className="border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-100 text-green-700 font-semibold">
                  Bulk / Corporate
                </button>
              </div>

              {/* TIMING */}
              <div className="border border-gray-200 rounded-md p-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Timing
                </h2>
                <p className="text-gray-600 text-base">8 AM - 9 PM</p>
              </div>

              {/* LOCATION */}
              <div className="border border-gray-200 rounded-md p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Location
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Sports Block (behind Freedom park), Dr Manmohan Singh
                  Bengaluru City University, Palace Road, Bangalore - 560009
                  (Main Entrance gate next to Cauvery Bhavana Bus stand on
                  google maps)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM INFO SECTION ===== */}
        <div className="w-full text-center py-12 mt-10 h-screen pr-20 pl-20">
          <div className="mb-10">
            <h1 className="text-2xl font-bold mb-4">Sports Available</h1>
            <div className="flex justify-center space-x-4 text-green-600 text-4xl">
              <FaFutbol />
              <FaBaseballBall />
            </div>
          </div>

          {/* ✅ FIXED AMENITIES SECTION */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
            <div className="flex flex-wrap justify-center">
              {ground.amenities && ground.amenities.length > 0 ? (
                ground.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    {amenity}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No amenities listed.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
