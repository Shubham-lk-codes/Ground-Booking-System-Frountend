import { IoFootballSharp } from "react-icons/io5";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [grounds, setGrounds] = useState([]); // all grounds
  const [searchTerm, setSearchTerm] = useState(""); // search input value
  const [filteredGrounds, setFilteredGrounds] = useState([]); // filtered results
  const navigate = useNavigate();

  // ✅ Fetch all grounds once
  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const response = await axios.get("http://localhost:5000/grounds");
        setGrounds(response.data.grounds || response.data);
      } catch (error) {
        console.error("Error fetching grounds:", error);
      }
    };
    fetchGrounds();
  }, []);

  // ✅ Check login token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  // ✅ Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredGrounds([]);
      return;
    }

    const filtered = grounds.filter((ground) =>
      ground.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredGrounds(filtered);
  };

  // ✅ When a user clicks a result
  const handleSelectGround = (id) => {
    setSearchTerm("");
    setFilteredGrounds([]);
    navigate(`/grounds/${id}`);
  };

  const handleProfileClick = () => navigate("/profile");
  const handleEventsClick = () => navigate("/events");

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-[9vh] flex flex-row items-center pt-2 bg-white shadow-md z-50 px-4 md:px-8">
        {/* Logo */}
        <div className="h-10 w-auto bg-black text-white px-4 flex items-center font-semibold text-sm sm:text-base md:text-lg">
          TurfArena
        </div>

        {/* ✅ Search Section */}
        <div className="relative ml-4 sm:ml-6 w-[40vw]">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search grounds..."
            className="w-full p-2 border border-gray-400 rounded text-sm md:text-base focus:outline-none"
          />

          {/* Dropdown results */}
          {filteredGrounds.length > 0 && (
            <ul className="absolute z-50 bg-white border border-gray-300 mt-1 w-full rounded shadow-md max-h-60 overflow-y-auto">
              {filteredGrounds.map((ground) => (
                <li
                  key={ground._id}
                  onClick={() => handleSelectGround(ground._id)}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm md:text-base"
                >
                  {ground.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Nav links */}
        <div className="flex flex-row ml-[3vw] items-center text-sm sm:text-base">
          <h3 className="ml-6 font-bold flex flex-row items-center">
            <MdOutlineSportsGymnastics className="mr-2" /> play
          </h3>

          <Link to="/grounds">
            <h3 className="ml-6 font-bold flex flex-row items-center">
              <IoFootballSharp className="mr-2" /> book
            </h3>
          </Link>

          <div
            className="ml-6 font-bold flex flex-row items-center cursor-pointer"
            onClick={handleEventsClick}
          >
            <FaBookOpen className="mr-2" /> events
          </div>
        </div>

        {/* Auth / Profile */}
        <div className="ml-auto mr-5 sm:mr-10 flex flex-row space-x-3 sm:space-x-5 items-center text-sm sm:text-base">
          {isLoggedIn ? (
            <div
              onClick={handleProfileClick}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-blue-700 transition-all"
            >
              P
            </div>
          ) : (
            <>
              <Link to="/signup">
                <h1 className="font-bold">Sign up</h1>
              </Link>
              <Link to="/login">
                <h1 className="font-bold">Login</h1>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};
