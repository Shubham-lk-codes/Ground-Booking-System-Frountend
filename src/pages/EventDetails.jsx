import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../components/navbar";

export const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/events/${id}`);
      setEvent(res.data.event);
    } catch (err) {
      console.error("Error fetching event", err);
    }
  };

  const joinEvent = async () => {
    try {
      const token = localStorage.getItem("token"); // optional if auth enabled
      await axios.post(`http://localhost:5000/events/${id}/join`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Joined successfully!");
      fetchEvent();
    } catch (err) {
      alert(err.response?.data?.message || "Error joining event");
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (!event) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-blue-600">{event.title}</h1>
        <p className="mt-2 text-gray-700">{event.description}</p>
        <div className="mt-4 space-y-2">
          <p><b>Sport:</b> {event.sportType}</p>
          <p><b>Date:</b> {new Date(event.date).toLocaleDateString()}</p>
          <p><b>Time:</b> {event.time}</p>
          <p><b>Venue:</b> {event.venue?.name || "Not available"}</p>
          <p><b>Participants:</b> {event.participants?.length}/{event.maxParticipants}</p>
        </div>

        <button
          onClick={joinEvent}
          className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Join Event
        </button>
      </div>
    </>
  );
};
