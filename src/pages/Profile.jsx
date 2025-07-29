import React, { useEffect, useState } from 'react';
import EditProfileModal from '../components/EditProfileModal';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchProfileData = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser || storedUser === 'undefined') return;

      const user = JSON.parse(storedUser);

      setName(user.name || '');
      setEmail(user.email || '');
      setMobile(user.mobile || '');
      setGender(user.gender || '');
      setAddress(user.address || '');
      setProfileImage(user.profileImage || '');
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error.message);
    }
  };

  useEffect(() => {
  fetchProfileData();

  const listener = () => fetchProfileData();
  window.addEventListener('userProfileUpdated', listener);

  return () => {
    window.removeEventListener('userProfileUpdated', listener);
  };
}, []);


  const handleCloseModal = () => {
    setShowEditModal(false);
    setTimeout(fetchProfileData, 300); // slight delay to ensure localStorage has updated
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start p-6 bg-gray-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-pink-700">My Profile</h2>
          <button
            onClick={() => setShowEditModal(true)}
            className="text-sm bg-pink-700 text-white py-2 px-4 rounded hover:bg-pink-800 transition"
          >
            Edit Profile
          </button>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <img
            src={profileImage && profileImage.startsWith('data:image') ? profileImage : '/assets/default-avatar.png'}
            alt="Profile"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/default-avatar.png';
            }}
            className="w-28 h-28 rounded-full object-cover border-2 border-pink-700"
          />
          <h3 className="text-xl font-bold text-pink-800">{name}</h3>
          <p className="text-gray-600">{email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <h4 className="text-sm text-gray-500">Mobile Number</h4>
            <p className="text-lg text-gray-800">{mobile}</p>
          </div>
          <div>
            <h4 className="text-sm text-gray-500">Gender</h4>
            <p className="text-lg text-gray-800 capitalize">{gender}</p>
          </div>
          <div className="md:col-span-2">
            <h4 className="text-sm text-gray-500">Residential Address</h4>
            <p className="text-lg text-gray-800">{address}</p>
          </div>
        </div>
      </div>

      {showEditModal && <EditProfileModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Profile;
