import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import {
  FaBoxOpen,
  FaHeart,
  FaCreditCard,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUserShield,
  FaUserCircle,
} from 'react-icons/fa';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import DashboardHeader from '../components/DashboardHeader';
import Profile from '../pages/Profile';
import Wishlist from '../pages/Wishlist';
import Payment from '../pages/Payment';
import Help from '../pages/Help';
import EditProfileModal from '../components/EditProfileModal';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const defaultTab = params.get('tab') || 'home';

  const [activePage, setActivePage] = useState(defaultTab);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // ✅

  const role = localStorage.getItem('role');
  const { logoutUser } = useCart();

  const handleLogout = () => {
    localStorage.clear();
    logoutUser();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home': return <ProductGrid />;
      case 'wishlist': return <Wishlist />;
      case 'cart': return <Cart />;
      case 'payment': return <Payment />;
      case 'help': return <Help />;
      case 'profile': return <Profile onEditProfile={() => setShowEditProfileModal(true)} />;
      default: return <ProductGrid />;
    }
  };

  const navItem = (label, icon, key) => (
    <div
      onClick={() => setActivePage(key)}
      className={`flex items-center space-x-3 px-3 py-2 rounded cursor-pointer transition ${
        activePage === key ? 'bg-pink-800' : 'hover:bg-pink-600'
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-pink-700 text-white flex flex-col justify-between py-6 px-4">
        <div>
          <div className="flex items-center space-x-2 mb-10">
            <img src="/assets/rff.png" alt="RF Logo" className="w-8 h-8" />
            <span className="text-xl font-bold">RentMyFit</span>
          </div>

          <nav className="space-y-2 text-base">
            {navItem('Home', <FaBoxOpen />, 'home')}
            {navItem('Wishlist', <FaHeart />, 'wishlist')}
            {navItem('Payment Methods', <FaCreditCard />, 'payment')}
            {navItem('Help', <FaQuestionCircle />, 'help')}
            {navItem('Profile', <FaUserCircle />, 'profile')}

            {role === 'admin' && (
              <Link
                to="/admin/products"
                className="flex items-center space-x-3 px-3 py-2 rounded cursor-pointer text-white hover:bg-pink-600"
              >
                <FaUserShield />
                <span>Admin Panel</span>
              </Link>
            )}

            {/* Logout with confirmation */}
            <div
              onClick={() => setShowLogoutConfirm(true)} // ✅
              className="flex items-center space-x-3 px-3 py-2 rounded cursor-pointer hover:bg-pink-600 mt-4"
            >
              <FaSignOutAlt />
              <span>Log Out</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-6 overflow-auto">
        <DashboardHeader onEditProfile={() => setShowEditProfileModal(true)} />
        <div className="mt-6">{renderContent()}</div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <EditProfileModal onClose={() => setShowEditProfileModal(false)} />
      )}

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
    </div>
  );
}
