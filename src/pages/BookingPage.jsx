/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

// eslint-disable-next-line no-unused-vars

import { grounds } from "../components/GroundData";
import { BookingPagecom } from "../components/BookingPageComp";

// eslint-disable-next-line no-unused-vars
export const BookingPage = ({ name, imageUrl, description }) => {
  return (
    <>
      <div className="flex flex-row">
        <div className="bg-black h-full w-[50vw] ">
          {grounds.map((ground, index) => (
            <BookingPagecom
              key={index}
              name={ground.name}
              imageUrl={ground.imageUrl}
              description={ground.description}
            />
          ))}
        </div>
        <div className="h-[100vh] w-[50vw] flex justify-center">
          <div className="flex flex-col text-center mt-[15vh]">
            <h1 className="text-center font-bold text-[30px] border-2 rounded-lg border-b-2 mb-5 pl-10 pr-10 bg-green-600">
              Book Now
            </h1>
            <div className="flex flex-row">
            <h2 className="font-bold text-2xl mr-6">Check Availability</h2>
            <h2 className="font-bold text-2xl">share</h2>
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
    </>
  );
};
