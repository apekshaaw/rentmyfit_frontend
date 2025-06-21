import React, { useState } from 'react';
import {
  FaBoxOpen,
  FaHeart,
  FaMapMarkerAlt,
  FaCreditCard,
  FaQuestionCircle,
  FaInfoCircle,
  FaSignOutAlt,
  FaUserShield,
  FaUserCircle,
} from 'react-icons/fa';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import DashboardHeader from '../components/DashboardHeader';
import Profile from '../pages/Profile';  // ✅ import Profile

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const defaultTab = params.get('tab') || 'home';

  const [activePage, setActivePage] = useState(defaultTab);

  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <ProductGrid />;
      case 'wishlist':
        return <h1 className="text-2xl font-bold text-black">Your Wishlist</h1>;
      case 'address':
        return <h1 className="text-2xl font-bold text-black">Delivery Address</h1>;
      case 'payment':
        return <h1 className="text-2xl font-bold text-black">Payment Methods</h1>;
      case 'help':
        return <h1 className="text-2xl font-bold text-black">Help</h1>;
      case 'about':
        return <h1 className="text-2xl font-bold text-black">About Us</h1>;
      case 'profile':
        return <Profile />;   
      default:
        return <ProductGrid />;
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
            {navItem('Delivery Address', <FaMapMarkerAlt />, 'address')}
            {navItem('Payment Methods', <FaCreditCard />, 'payment')}
            {navItem('Help', <FaQuestionCircle />, 'help')}
            {navItem('About', <FaInfoCircle />, 'about')}
            {navItem('Profile', <FaUserCircle />, 'profile')}

            {/* Admin Panel link only for admin */}
            {role === 'admin' && (
              <Link
                to="/admin/products"
                className="flex items-center space-x-3 px-3 py-2 rounded cursor-pointer text-white hover:bg-pink-600"
              >
                <FaUserShield />
                <span>Admin Panel</span>
              </Link>
            )}

            {/* Log out */}
            <div
              onClick={handleLogout}
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
        <DashboardHeader />
        <div className="mt-6">{renderContent()}</div>
      </div>
    </div>
  );
}
