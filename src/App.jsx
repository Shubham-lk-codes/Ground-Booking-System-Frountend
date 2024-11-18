import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { BookingPage } from "./pages/BookingPage";
import { LoginPage } from "./pages/LoginPage";
import { PaymentPage } from "./pages/PaymentPage";
import { ProfilePage } from "./pages/ProfilePage";
import { GroundsList } from "./components/Groundlinst";
import {SignupPage} from "./pages/SignupPage"
import {AdminDashboard} from "./pages/AdminDasboardPage";
import {GroundOwnerRegistration} from "./components/GroundOwnerRegistration"
import {AdminDashboardForOwner} from "./pages/AdminDashboardForOwener"
//import { useEffect, useState } from "react";
//import axios from "axios";

export const App = () => {


  return (
    <>
      

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/PaymentPage" element={<PaymentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/grounds" element={<GroundsList />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/register-ground-owner" element={<GroundOwnerRegistration />} />
          <Route path="/admin-dashboard-for-GroundOwener" element={<AdminDashboardForOwner />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}
