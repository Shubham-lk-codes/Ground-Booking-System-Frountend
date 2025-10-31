/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { grounds } from "../components/GroundData";
import { BookingPagecom } from "../components/BookingPageComp";

export const BookingPage = ({ name, imageUrl, description }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slides = sliderRef.current?.querySelectorAll(".slider-img");
    if (!slides) return;

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
  }, []);

  return (
    <>
      <div className="flex flex-row overflow-hidden">
        {/* LEFT SIDE */}
        <div className="bg-black h-[100vh] w-[50vw] relative overflow-hidden">
          {/* 🔥 GSAP + Framer Motion Image Slider */}
          <div ref={sliderRef} className="absolute inset-0 z-0 overflow-hidden">
            {grounds.map((ground, index) => (
              <motion.img
                key={index}
                src={ground.imageUrl}
                alt={ground.name}
                className="slider-img absolute top-0 left-0 w-full h-full object-cover opacity-0"
                initial={{ opacity: 0 }}
              />
            ))}
          </div>

          {/* ✅ Keep your original BookingPagecom section (Unchanged) */}
          <div className="relative z-10 hidden">
            {grounds.map((ground, index) => (
              <BookingPagecom
                key={index}
                name={ground.name}
                imageUrl={ground.imageUrl}
                description={ground.description}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE (Unchanged) */}
        <div className="h-[100vh] w-[50vw] flex justify-center">
          <div className="flex flex-col text-center mt-[15vh]">
            <h1 className="text-center font-bold text-[30px] border-2 rounded-lg border-b-2 mb-5 pl-10 pr-10 bg-green-600">
              Book Now
            </h1>
            <div className="flex flex-row">
              <h2 className="font-bold text-2xl mr-6">Check Availability</h2>
              <h2 className="font-bold text-2xl">Share</h2>
            </div>
            <div className="font-bold m-5 float-start flex flex-col">
              <h1 className="text-[40px]">Timing</h1>
              <h3 className="text-[20px]">6.00 to 7.00</h3>
            </div>
            <div className="">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59696.75388791228!2d78.57148596088606!3d20.748884242571858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd47f04f15aa69d%3A0xe76e35b13382a66c!2sWardha%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1729834614906!5m2!1sen!2sin"
                width="500"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wardha Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {/* ✅ Dummy Ground Info Section (Fixed Position, No Scroll) */}
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white p-5 text-center z-10">
        <h1 className="text-3xl font-bold mb-2">Ground Information</h1>
        <p className="text-lg">
          Welcome to our premium sports grounds. Experience top-quality turf,
          modern amenities, and easy booking. Choose your preferred timing and
          enjoy your match!
        </p>
      </div>
    </>
  );
};
