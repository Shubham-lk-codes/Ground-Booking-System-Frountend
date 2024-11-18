import { IoFootballSharp } from "react-icons/io5";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Navbar = () => {
  
  return (
    <>
      <div
        className="h-[10vh] w-full flex flex-row items-center 
       pt-5"
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
         <Link to="/grounds"> <h3 className="ml-10 font-bold flex flex-row items-center">
            <IoFootballSharp className="mr-2" /> book
          </h3></Link>
          <h3 className="ml-10 font-bold flex flex-row items-center">
            <FaBookOpen className="mr-2" /> learn
          </h3>
        </div>
        <div className="ml-auto mr-10 flex flex-row space-x-5">
          <Link to="/signup"><h1 className="font-bold">Sign up</h1></Link>
          <Link to="/login"><h1 className="font-bold">Login</h1></Link>
        </div>
      </div>
    </>
  );
};
