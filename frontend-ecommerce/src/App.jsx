import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from "@react-oauth/google";
// Common Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

// User Pages
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Collection from "./pages/Collection";
import Orders from "./pages/Orders";
import Login from "./pages/Login";

// Admin Components
import AdminNavBar from "./admin/components/NavBar";
import Sidebar from "./admin/components/Sidebar";
import Add from "./admin/pages/Add";
import List from "./admin/pages/List";
import AdminOrders from "./admin/pages/Orders";
import AdminLogin from "./admin/components/Login";
import Verify from "./pages/Verify";

export const backend_url = import.meta.env.VITE_BACKEND_URL;
export const currency = "INR";

const App = () => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || ""
  );
  const CLIENT_ID = "520614897610-ruum58cidfnq81hpjgtungru5n5k27f7.apps.googleusercontent.com";

  useEffect(() => {
    localStorage.setItem("adminToken", adminToken);
  }, [adminToken]);

  return (
    <div className="min-h-screen">
      <ToastContainer />
      <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            (adminToken !== "") ? (
              <div className="bg-gray-100">
                <AdminNavBar setToken={setAdminToken} />
                <hr />
                <div className="flex w-full">
                  <Sidebar />
                  <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                    <Routes>
                      <Route path="add" element={<Add token={adminToken} />} />
                      <Route path="list" element={<List token={adminToken} />} />
                      <Route path="orders" element={<AdminOrders token={adminToken} />} />
                      <Route index element={<Navigate to="/admin/add" replace />} />
                    </Routes>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/admin/login" element={<AdminLogin setToken={setAdminToken} />} />

        {/* User Routes */}
        <Route
          path="/*"
          element={
            <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
              <Navbar />
              <SearchBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/place-order" element={<PlaceOrder />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />
            </div>
          }
        />
      </Routes>
      </GoogleOAuthProvider>
    </div>
    
  );
};

export default App;
