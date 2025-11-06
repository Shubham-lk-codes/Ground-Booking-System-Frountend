import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/navbar";
import { EventCard } from "../components/EventCard";

export const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/events");
        setEvents(res.data.events);
      } catch (err) {
        console.error("Error fetching events", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Upcoming Events</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((e) => <EventCard key={e._id} event={e} />)
          ) : (
            <p className="text-gray-600 text-center col-span-full">No events found.</p>
          )}
        </div>
      </div>
    </>
  );
};
