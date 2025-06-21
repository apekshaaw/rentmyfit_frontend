import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [showImageMenu, setShowImageMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setName(localStorage.getItem('name') || '');
    setEmail(localStorage.getItem('email') || '');
    setProfileImage(localStorage.getItem('profileImage') || '');
    setMobile(localStorage.getItem('mobile') || '');
    setGender(localStorage.getItem('gender') || '');
    setAddress(localStorage.getItem('address') || '');
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
      setShowImageMenu(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/auth/update-profile', {
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
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Profile updated');
        localStorage.setItem('name', data.user.name);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('profileImage', profileImage);
        localStorage.setItem('mobile', mobile);
        localStorage.setItem('gender', gender);
        localStorage.setItem('address', address);

        navigate('/dashboard?tab=profile');
      } else {
        alert(data.message || 'Error updating profile');
      }
    } catch (err) {
      console.error('Update Error:', err);
      alert('Server error');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action is irreversible.')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert('Your account has been deleted');
        localStorage.clear();
        navigate('/register');
      } else {
        const data = await res.json();
        alert(data.message || 'Error deleting profile');
      }
    } catch (err) {
      console.error('Delete Error:', err);
      alert('Server error');
    }
  };

  const handleRemoveImage = () => {
    setProfileImage('');
    localStorage.removeItem('profileImage');
    setShowImageMenu(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-4xl p-8 rounded-xl shadow-md space-y-8 relative"
      >
        {/* Delete Profile link */}
        <div
          className="absolute top-6 right-8 text-sm text-red-600 cursor-pointer underline"
          onClick={handleDelete}
        >
          Delete Profile
        </div>

        <h2 className="text-3xl font-bold text-center text-pink-700 mb-4">Edit Profile</h2>

        {/* Avatar */}
        <div className="flex flex-col items-center space-y-3 relative">
          <img
            src={profileImage || '/assets/default-avatar.png'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-pink-700"
          />
          <div
            className="absolute right-[44%] bottom-[8px] bg-white p-1 rounded-full shadow cursor-pointer"
            onClick={() => setShowImageMenu(!showImageMenu)}
          >
            <FaEdit className="text-pink-700" />
          </div>

          {showImageMenu && (
            <div className="absolute mt-2 p-2 bg-white border border-gray-300 rounded shadow space-y-1 text-sm text-gray-700">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span>Upload Image</span>
              </label>
              <div
                onClick={handleRemoveImage}
                className="cursor-pointer text-red-600 hover:text-red-700"
              >
                Remove Image
              </div>
            </div>
          )}
        </div>

        {/* Fields grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border border-pink-700 rounded px-4 py-3 text-black bg-white focus:outline-pink-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-pink-700 rounded px-4 py-3 text-black bg-white focus:outline-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Mobile Number (+977)</label>
            <input
              type="text"
              placeholder="+977-98XXXXXXXX"
              className="w-full border border-pink-700 rounded px-4 py-3 text-black bg-white focus:outline-pink-500"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-pink-700 rounded px-4 py-3 text-black bg-white focus:outline-pink-500"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">Residential Address</label>
            <input
              type="text"
              className="w-full border border-pink-700 rounded px-4 py-3 text-black bg-white focus:outline-pink-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        {/* Save button center */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="px-12 bg-pink-700 text-white py-3 rounded-full hover:bg-pink-800 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
