import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaBoxOpen,
  FaHeart,
  FaMapMarkerAlt,
  FaCreditCard,
  FaQuestionCircle,
  FaInfoCircle,
  FaSignOutAlt,
} from 'react-icons/fa';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full bg-white">
      <div className="w-64 bg-pink-700 text-white flex flex-col justify-between py-6 px-4">
        <div>
          <div className="flex items-center space-x-2 mb-10">
            <img src="/assets/rff.png" alt="RF Logo" className="w-8 h-8" />
            <span className="text-xl font-bold">RentMyFit</span>
          </div>

          <nav className="space-y-6 text-base">
            <Link to="/orders" className="flex items-center space-x-3 text-white hover:text-gray-300 transition">
              <FaBoxOpen />
              <span>Orders</span>
            </Link>
            <Link to="/wishlist" className="flex items-center space-x-3 text-white hover:text-gray-300 transition">
              <FaHeart />
              <span>Wishlist</span>
            </Link>
            <Link to="/address" className="flex items-center space-x-3 text-white hover:text-gray-300 transition">
              <FaMapMarkerAlt />
              <span>Delivery Address</span>
            </Link>
            <Link to="/payment" className="flex items-center space-x-3 text-white hover:text-gray-300 transition">
              <FaCreditCard />
              <span>Payment Methods</span>
            </Link>
            <Link to="/help" className="flex items-center space-x-3 text-white hover:text-gray-300 transition">
              <FaQuestionCircle />
              <span>Help</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-3 text-white hover:text-gray-300 transition">
              <FaInfoCircle />
              <span>About</span>
            </Link>
            <div
              onClick={handleLogout}
              className="flex items-center space-x-3 text-white hover:text-gray-300 transition cursor-pointer"
            >
              <FaSignOutAlt />
              <span>Log Out</span>
            </div>
          </nav>
        </div>
      </div>

      <div className="flex-1 bg-white p-10">
        <h1 className="text-2xl font-bold text-black">About Us</h1>
      </div>
    </div>
  );
}
