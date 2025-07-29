import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../utils/getUser';

export default function EditProfileModal({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // ✅ New

  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // ✅ Needed for redirect after delete

  useEffect(() => {
    const user = getUser() || {};
    setName(user.name || '');
    setEmail(user.email || '');
    setMobile(user.mobile || '');
    setGender(user.gender || '');
    setAddress(user.address || '');
    setProfileImage(user.profileImage || '');
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          gender,
          address,
          profileImage,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        const updatedUser = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          profileImage: data.profileImage,
          mobile: data.mobile,
          gender: data.gender,
          address: data.address,
          wishlist: data.wishlist,
          cart: data.cart,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        window.dispatchEvent(new Event('userProfileUpdated'));
        onClose();
      } else {
        alert(data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Profile update error:', err.message);
      alert('Failed to update profile');
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:5000/api/auth/delete', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        localStorage.clear();
        navigate('/login');
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete account');
      }
    } catch (err) {
      console.error('Delete account error:', err.message);
      alert('Failed to delete account');
    }
  };

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
    setShowImageOptions(false);
  };

  const handleRemoveImage = () => {
    setProfileImage('');
    setShowImageOptions(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black bg-opacity-30">
      <div className="relative w-full max-w-xl bg-white rounded-lg shadow-lg p-8 mx-4 max-h-[90vh] overflow-y-auto">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-700 hover:text-pink-900 text-2xl focus:outline-none bg-transparent border-none p-0"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center text-pink-700 mb-4">Edit Profile</h2>

        {/* 🗑 Delete icon */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-600 text-sm underline"
          >
            Delete Account
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={profileImage?.trim() ? profileImage : '/assets/default-avatar.png'}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-pink-700 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/default-avatar.png';
              }}
            />
            <span
              className="absolute bottom-0 right-0 bg-white border border-pink-700 p-1 rounded-full text-pink-700 text-xs cursor-pointer"
              onClick={() => setShowImageOptions(!showImageOptions)}
            >
              ✎
            </span>

            {showImageOptions && (
              <div className="absolute top-0 right-[-120px] bg-white border border-pink-300 rounded-lg shadow-md z-10 flex flex-col">
                <button
                  className="px-4 py-2 text-pink-700 text-sm hover:bg-gray-100 transition text-left"
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload Image
                </button>
                <button
                  className="px-4 py-2 text-pink-700 text-sm hover:bg-gray-100 transition text-left"
                  onClick={handleRemoveImage}
                >
                  Remove Image
                </button>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleUploadImage}
            />
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-pink-500 text-pink-700 bg-white p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border border-pink-500 text-pink-700 bg-white p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-pink-500 text-pink-700 bg-white p-2"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              className="mt-1 block w-full rounded-md border border-pink-500 text-pink-700 bg-white p-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-pink-500 text-pink-700 bg-white p-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSave}
            className="bg-pink-700 text-white px-6 py-2 rounded-full hover:bg-pink-800 transition"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* ✅ Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center max-w-sm w-full">
            <p className="mb-4 text-gray-800 font-semibold">
              Are you sure you want to delete your account?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
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
