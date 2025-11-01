import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookingPagecom } from "../components/BookingPageComp";

export const BookingPage = () => {
  const { id, name } = useParams(); // ✅ capture both id and slug name
  const sliderRef = useRef(null);
  const [ground, setGround] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleNext = () => {
    const slides = sliderRef.current?.querySelectorAll(".slider-img");
    if (!slides) return;
    const next = (currentIndex + 1) % slides.length;
    gsap.to(slides[currentIndex], { opacity: 0, duration: 0.8 });
    gsap.to(slides[next], { opacity: 1, duration: 0.8 });
    setCurrentIndex(next);
  };

  const handlePrev = () => {
    const slides = sliderRef.current?.querySelectorAll(".slider-img");
    if (!slides) return;
    const prev = (currentIndex - 1 + slides.length) % slides.length;
    gsap.to(slides[currentIndex], { opacity: 0, duration: 0.8 });
    gsap.to(slides[prev], { opacity: 1, duration: 0.8 });
    setCurrentIndex(prev);
  };

  if (!ground)
    return (
      <div className="h-screen flex justify-center items-center text-2xl">
        Loading Ground Details...
      </div>
    );

  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <div className="flex flex-row overflow-hidden h-[100vh]">
          {/* LEFT SIDE */}
          <div className="bg-black h-[100vh] w-[50vw] relative overflow-hidden">
            <div ref={sliderRef} className="absolute inset-0 z-0 overflow-hidden">
              <motion.img
                src={ground.imageUrl}
                alt={ground.name}
                className="slider-img absolute top-0 left-0 w-full h-full object-cover opacity-0"
                initial={{ opacity: 0 }}
              />
            </div>

            <div className="absolute inset-0 flex justify-between items-center px-6 z-20">
              <button
                onClick={handlePrev}
                className="bg-black/40 hover:bg-black/60 p-3 rounded-full text-white transition"
              >
                <ChevronLeft size={30} />
              </button>
              <button
                onClick={handleNext}
                className="bg-black/40 hover:bg-black/60 p-3 rounded-full text-white transition"
              >
                <ChevronRight size={30} />
              </button>
            </div>

            <div className="relative z-10 hidden">
              <BookingPagecom
                name={ground.name}
                imageUrl={ground.imageUrl}
                description={ground.description}
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="h-[100vh] w-[50vw] flex justify-center">
            <div className="flex flex-col text-center mt-[15vh]">
              <h1 className="text-center font-bold text-[30px] border-2 rounded-lg border-b-2 mb-5 pl-10 pr-10 bg-green-600">
                {ground.name || name}
              </h1>
              <div className="flex flex-row">
                <h2 className="font-bold text-2xl mr-6">Check Availability</h2>
                <h2 className="font-bold text-2xl">Share</h2>
              </div>
              <div className="font-bold m-5 flex flex-col">
                <h3 className="text-[20px] text-gray-700">{ground.location}</h3>
                <p className="text-[18px] text-gray-600">{ground.description}</p>
                <p className="text-[22px] mt-2 text-green-600 font-semibold">
                  ₹{ground.pricePerHour}/hour
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full bg-black bg-opacity-80 text-white p-10 text-center">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ground Information
          </motion.h1>

          <motion.p
            className="text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Welcome to our premium sports ground – {ground.name || name}. Experience top-quality turf,
            modern amenities, and easy booking.
          </motion.p>
        </div>
      </div>
    </>
  );
};
