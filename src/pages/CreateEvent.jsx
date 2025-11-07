// import { useState } from "react";
// import axios from "axios";
// import { Navbar } from "../components/navbar";

// export const CreateEvent = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     sportType: "",
//     date: "",
//     time: "",
//     venue: "",
//     description: "",
//     maxParticipants: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post("http://localhost:5000/events/create", formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Event created successfully!");
//     } catch (err) {
//       alert(err.response?.data?.message || "Error creating event");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
//         <h1 className="text-2xl font-bold text-blue-600 mb-4">Create New Event</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {["title", "sportType", "venue", "description", "maxParticipants"].map((field) => (
//             <input
//               key={field}
//               type="text"
//               name={field}
//               placeholder={field.replace(/([A-Z])/g, " $1")}
//               value={formData[field]}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-3 py-2"
//               required
//             />
//           ))}
//           <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
//           <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" required />
          
//           <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
//             Create Event
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };


import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const CreateEventModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    sportType: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    maxParticipants: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/events/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Event created successfully!");
      onClose(); // Close modal after creation
    } catch (err) {
      alert(err.response?.data?.message || "Error creating event");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <X size={22} />
            </button>

            <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">
              Create New Event
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {["title", "sportType", "venue", "description", "maxParticipants"].map(
                (field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                )
              )}
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />

              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Create Event
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
