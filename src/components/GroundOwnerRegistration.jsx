/* eslint-disable no-unused-vars */
// GroundOwnerRegistration.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const GroundOwnerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); // Track registration success
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/ground-owners/register', formData);
      setMessage(response.data.message);
      setSuccess(true); // Mark registration as successful

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
      setSuccess(false); // Reset success state on failure
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Ground Owner Registration</h2>
        {/* Display success or error message */}
        {message && (
          <p
            className={`text-center ${
              success ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            placeholder="Contact Number"
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
          >
            Register
          </button>
        </form>

        {/* Show redirection message if registration is successful */}
        {success && (
          <p className="mt-4 text-center text-gray-600">
            Redirecting to login page...
          </p>
        )}
      </div>
    </div>
  );
};

export default GroundOwnerRegistration;
