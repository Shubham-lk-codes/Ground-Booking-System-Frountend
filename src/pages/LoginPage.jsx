/* eslint-disable no-unused-vars */
/* LoginPage.js */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", loginData, { withCredentials: true });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token); 
        navigate("/"); 
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="Email" required className="w-full px-3 py-2 border rounded-lg" />
          <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Password" required className="w-full px-3 py-2 border rounded-lg" />
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg">Login</button>
        </form>
        {error && <p className="text-center text-red-500">{error}</p>}
        <p className="text-center">Don&rsquo;t have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link></p>
      </div>
    </div>
  );
};
