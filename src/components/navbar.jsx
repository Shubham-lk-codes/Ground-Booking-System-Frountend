import { IoFootballSharp } from "react-icons/io5";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check token in localStorage (you said earlier you store token there)
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleProfileClick = () => {
    navigate("/profile"); // Redirect to profile page
  };

  return (
    <>
      <div
        className="h-[10vh] w-full flex flex-row items-center pt-5"
      >
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
          <Link to="/grounds">
            <h3 className="ml-10 font-bold flex flex-row items-center">
              <IoFootballSharp className="mr-2" /> book
            </h3>
          </Link>
          <h3 className="ml-10 font-bold flex flex-row items-center">
            <FaBookOpen className="mr-2" /> learn
          </h3>
        </div>

        <div className="ml-auto mr-10 flex flex-row space-x-5 items-center">
          {isLoggedIn ? (
            // 🔵 Profile Circle
            <div
              onClick={handleProfileClick}
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-blue-700 transition-all"
            >
              P
            </div>
          ) : (
            <>
              <Link to="/signup"><h1 className="font-bold">Sign up</h1></Link>
              <Link to="/login"><h1 className="font-bold">Login</h1></Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};
