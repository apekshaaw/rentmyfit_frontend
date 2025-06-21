import React, { useState } from 'react';
import { FaShoppingCart, FaBell, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function DashboardHeader() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const profileImage = localStorage.getItem('profileImage');
  const userName = localStorage.getItem('name');

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <header className="flex items-center justify-between mb-6 border-b pb-4">
      <img src="/assets/rentmyfit_text_logo.png" alt="RentMyFit" className="h-10" />

      <div className="flex items-center space-x-4 relative">
        <FaSearch className="text-pink-700 text-xl cursor-pointer" />
        <FaBell className="text-pink-700 text-xl cursor-pointer" />
        <FaShoppingCart className="text-pink-700 text-xl cursor-pointer" />

        <div className="relative">
          <img
            src={profileImage || '/assets/default-avatar.png'}
            alt="Profile"
            onClick={toggleMenu}
            className="w-10 h-10 rounded-full border-2 border-pink-700 cursor-pointer object-cover"
          />

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10 text-sm">
              <div className="px-4 py-2 text-gray-700 font-semibold">{userName}</div>
              <hr />
              <button
                onClick={() => {
                  setShowMenu(false);
                  navigate('/dashboard/edit-profile');
                }}
                className="w-full text-left px-4 py-2 hover:bg-pink-100 text-pink-700"
              >
                Edit Profile
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate('/login');
                }}
                className="w-full text-left px-4 py-2 hover:bg-pink-100 text-red-600"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
