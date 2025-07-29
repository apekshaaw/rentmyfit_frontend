import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaBell, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartModal from './CartModal';

export default function DashboardHeader({ onEditProfile }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // ✅

  const { cartItems, logoutUser } = useCart();

  const [profileImage, setProfileImage] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.profileImage?.trim() || '';
  });

  const [userName, setUserName] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.name || '';
  });

  useEffect(() => {
    const updateUser = () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setProfileImage(user.profileImage?.trim() || '');
      setUserName(user.name || '');
    };

    window.addEventListener('userProfileUpdated', updateUser);
    return () => window.removeEventListener('userProfileUpdated', updateUser);
  }, []);

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const toggleCart = () => setShowCart((prev) => !prev);

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <>
      <header className="flex items-center justify-between mb-6 border-b pb-4">
        <img src="/assets/rentmyfit_text_logo.png" alt="RentMyFit" className="h-10" />

        <div className="flex items-center space-x-4 relative">
          <FaSearch className="text-pink-700 text-xl cursor-pointer" />
          <FaBell className="text-pink-700 text-xl cursor-pointer" />

          {/* Cart Icon */}
          <div className="relative cursor-pointer" onClick={toggleCart}>
            <FaShoppingCart className="text-pink-700 text-xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-1.5">
                {cartItems.length}
              </span>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <img
              src={profileImage || '/assets/default-avatar.png'}
              alt="Profile"
              onClick={toggleMenu}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/default-avatar.png';
              }}
              className="w-10 h-10 rounded-full border-2 border-pink-700 cursor-pointer object-cover"
            />

            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10 text-sm">
                <div className="px-4 py-2 text-gray-700 font-semibold">{userName}</div>
                <hr />
                <button
                  onClick={() => {
                    setShowMenu(false);
                    if (onEditProfile) {
                      onEditProfile();
                    } else {
                      navigate('/dashboard/edit-profile');
                    }
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-pink-100 text-pink-700"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowLogoutConfirm(true); // ✅ Open confirmation
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

      {/* Cart Modal */}
      {showCart && <CartModal onClose={() => setShowCart(false)} />}

      {/* ✅ Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-center">
            <p className="text-lg text-gray-800 font-medium mb-4">Do you really want to log out?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-pink-700 text-white hover:bg-pink-800 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
