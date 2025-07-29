import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import { useCart } from "../contexts/CartContext";
import ProductDetails from '../pages/ProductDetails';
import AdminProducts from '../pages/AdminProducts';
import Orders from '../pages/Orders';
import Wishlist from '../pages/Wishlist';
import Address from '../pages/Address';
import Payment from '../pages/Payment';
import Help from '../pages/Help';
import Profile from '../pages/Profile';
import EditProfile from '../components/EditProfileModal';
import { isTokenExpired } from '../utils/token';

const RouterWrapper = () => {
  const navigate = useNavigate();
  const { loadCartForUser } = useCart();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } else {
      loadCartForUser(); 
    }
  }, [navigate, loadCartForUser]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* Admin */}
      <Route path="/admin/products" element={<AdminProducts />} />

      {/* Dashboard as parent layout */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="orders" element={<Orders />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="address" element={<Address />} />
        <Route path="payment" element={<Payment />} />
        <Route path="help" element={<Help />} />
        <Route path="profile" element={<Profile />} />
        <Route path="edit-profile" element={<EditProfile />} />
      </Route>
    </Routes>
  );
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <RouterWrapper />
    </BrowserRouter>
  );
}
