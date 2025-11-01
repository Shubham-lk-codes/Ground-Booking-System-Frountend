import React from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import playstore from "../assets/img/1.jpg"; // change path if needed
import appstore from "../assets/img/2.jpg"; // duplicate for now or use real app store img

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-8 md:px-20 mt-10">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        {/* Brand Section */}
        <div>
          <h1 className="text-3xl font-bold text-green-400 mb-2">TurfArena</h1>
          <p className="text-sm text-gray-400 mb-4">
            Your Sports Community Platform — connecting players, grounds, and passion.
          </p>
          <p className="text-gray-400 text-sm mb-3">Get the App</p>
          <div className="flex space-x-3">
            <img
              src={playstore}
              alt="Download TurfArena App"
              className="w-32 cursor-pointer hover:opacity-80 transition"
            />
            <img
              src={appstore}
              alt="Download TurfArena App"
              className="w-32 cursor-pointer hover:opacity-80 transition"
            />
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Company</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-green-400 cursor-pointer">About Us</li>
            <li className="hover:text-green-400 cursor-pointer">Contact</li>
            <li className="hover:text-green-400 cursor-pointer">Careers</li>
            <li className="hover:text-green-400 cursor-pointer">Partner With Us</li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Support</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-green-400 cursor-pointer">FAQs</li>
            <li className="hover:text-green-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-green-400 cursor-pointer">Terms of Service</li>
            <li className="hover:text-green-400 cursor-pointer">Cancellation Policy</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-5 text-gray-400 text-2xl">
            <a href="#" className="hover:text-green-400">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-green-400">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-green-400">
              <FaLinkedinIn />
            </a>
            <a href="#" className="hover:text-green-400">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-gray-500 text-sm">
        <p>© 2025 Turfarena Private Limited. All Rights Reserved.</p>
        <p className="mt-2 md:mt-0 text-green-400 font-medium">
          Shubham Lonkar <span className="text-white">Founder of TurfArena Team</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
