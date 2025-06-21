import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ProductDetails from '../pages/ProductDetails';
import AdminProducts from '../pages/AdminProducts';
import Orders from '../pages/Orders';
import Wishlist from '../pages/Wishlist';
import Address from '../pages/Address';
import Payment from '../pages/Payment';
import Help from '../pages/Help';
import About from '../pages/About';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/wishlist" element={<Wishlist />} />
        <Route path="/dashboard/address" element={<Address />} />
        <Route path="/dashboard/payment" element={<Payment />} />
        <Route path="/dashboard/help" element={<Help />} />
        <Route path="/dashboard/about" element={<About />} />

        {/* Profile inside Dashboard */}
        <Route path="/dashboard/profile" element={<Dashboard />} />

        {/* Edit Profile page */}
        <Route path="/dashboard/edit-profile" element={<EditProfile />} />

        {/* Product Details */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Admin */}
        <Route path="/admin/products" element={<AdminProducts />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
