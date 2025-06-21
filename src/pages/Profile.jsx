import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setName(localStorage.getItem('name') || '');
    setEmail(localStorage.getItem('email') || '');
    setProfileImage(localStorage.getItem('profileImage') || '');
    setMobile(localStorage.getItem('mobile') || '');
    setGender(localStorage.getItem('gender') || '');
    setAddress(localStorage.getItem('address') || '');
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-pink-700">My Profile</h2>
        <button
          onClick={() => navigate('/dashboard/edit-profile')}
          className="text-sm bg-black text-pink-500 py-2 px-4 rounded hover:bg-gray-900"
        >
          Edit Profile
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center space-y-4">
        <img
          src={profileImage || '/default-avatar.png'}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-pink-700"
        />
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-600">{email}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-6">
          <div>
            <h4 className="font-semibold text-gray-700">Mobile Number:</h4>
            <p className="text-black">{mobile}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Gender:</h4>
            <p className="text-black capitalize">{gender}</p>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-semibold text-gray-700">Residential Address:</h4>
            <p className="text-black">{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
