/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Modal from "react-modal";


if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
}

export const SignupPage = () => {
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", signupData);
      setMessage(response.data.message);
      if (response.data.success) {
        // Open the modal on successful signup
        setModalIsOpen(true);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={signupData.name}
            onChange={handleSignupChange}
            placeholder="Name"
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleSignupChange}
            placeholder="Email"
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleSignupChange}
            placeholder="Password"
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg"
          >
            Sign Up
          </button>
        </form>
        {message && <p className="text-center">{message}</p>}
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
        <p className="text-center">
          Register as a Groundowener?{" "}
          <Link to="/register-ground-owner" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Welcome Modal"
        className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {signupData.name}!</h2>
          <p className="text-lg text-gray-600 mb-4">Your account has been successfully created!</p>
          <p className="text-sm text-gray-500 mb-6">
            We&lsquo;re excited to have you on board. You can now log in and start using your account.
          </p>
          <button
            onClick={() => {
              setModalIsOpen(false); // Close modal after clicking
              navigate("/"); // Redirect to login page
            }}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </Modal>
    </div>
  );
};
