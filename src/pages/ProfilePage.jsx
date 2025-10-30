import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoFootballSharp } from "react-icons/io5";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if not logged in
      return;
    }

    // 🧠 Load user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const storedHistory = JSON.parse(localStorage.getItem("bookingHistory")) || [];

    if (storedUser) setUser(storedUser);
    setBookings(storedBookings);
    setHistory(storedHistory);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar-styled header */}
      <div className="h-[10vh] w-full flex flex-row items-center pt-5 bg-white shadow">
        <div className="h-10 w-[10vw] bg-black"></div>

        <nav className="ml-5">
          <input
            type="text"
            placeholder="Search..."
            className="w-[30vw] p-2 border border-gray-400 rounded"
          />
        </nav>

        <div className="h-10 w-[10vw] flex flex-row ml-[5vw] items-center">
          <h3 className="ml-10 font-bold flex flex-row items-center">
            <MdOutlineSportsGymnastics className="mr-2" /> play
          </h3>
          <h3 className="ml-10 font-bold flex flex-row items-center">
            <IoFootballSharp className="mr-2" /> book
          </h3>
          <h3 className="ml-10 font-bold flex flex-row items-center">
            <FaBookOpen className="mr-2" /> learn
          </h3>
        </div>

        <div className="ml-auto mr-10 flex flex-row space-x-5 items-center">
          <div
            className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-blue-700 transition-all"
          >
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-10">
        <div className="bg-white p-8 rounded-2xl shadow-md w-[60%] mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
          <div className="flex flex-col space-y-3 mb-5">
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-full font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Bookings Section */}
        <div className="mt-10 bg-white p-8 rounded-2xl shadow-md w-[80%] mx-auto">
          <h2 className="text-xl font-bold mb-3">Your Bookings</h2>
          {bookings.length > 0 ? (
            <ul className="space-y-2">
              {bookings.map((b, i) => (
                <li key={i} className="border p-3 rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{b.groundName}</p>
                    <p className="text-sm text-gray-600">
                      Date: {b.date} | Time: {b.time}
                    </p>
                  </div>
                  <span className="text-green-600 font-semibold">Active</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No active bookings yet.</p>
          )}
        </div>

        {/* Booking History Section */}
        <div className="mt-8 bg-white p-8 rounded-2xl shadow-md w-[80%] mx-auto">
          <h2 className="text-xl font-bold mb-3">Booking History</h2>
          {history.length > 0 ? (
            <ul className="space-y-2">
              {history.map((h, i) => (
                <li key={i} className="border p-3 rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{h.groundName}</p>
                    <p className="text-sm text-gray-600">
                      Date: {h.date} | Time: {h.time}
                    </p>
                  </div>
                  <span className="text-gray-500 font-semibold">Completed</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You haven't made any bookings yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

