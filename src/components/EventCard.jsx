import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const EventCard = ({ event }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition"
    >
      <h2 className="text-xl font-semibold text-blue-600">{event.title}</h2>
      <p className="text-gray-600 mt-1">{event.sportType}</p>
      <p className="text-sm mt-2">
        {new Date(event.date).toLocaleDateString()} at {event.time}
      </p>
      <p className="text-gray-700 mt-2 line-clamp-2">{event.description}</p>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {event.venue?.name || "Venue TBD"}
        </span>
        <Link
          to={`/events/${event._id}`}
          className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
        >
          View
        </Link>
      </div>
    </motion.div>
  );
};
