import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Help = () => {
  return (
    <div className="flex flex-col items-center text-center px-4 py-10">
      <h1 className="text-3xl font-bold text-black mb-3">How can we help you?</h1>
      <p className="text-gray-700 max-w-xl mb-10">
        If you have any questions about your rentals, delivery, or account, feel free to contact us anytime.
        We’re here to help you get the best out of your RentMyFit experience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Office */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center border-t-4 border-pink-700">
          <FaMapMarkerAlt className="text-pink-700 text-3xl mb-4" />
          <h3 className="font-semibold text-lg text-gray-800 mb-2">OUR MAIN OFFICE</h3>
          <p className="text-sm text-gray-600">Mahakabhi Marg, Dillibazar,<br />Kathmandu, Nepal</p>
        </div>

        {/* Phone */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center border-t-4 border-pink-700">
          <FaPhoneAlt className="text-pink-700 text-3xl mb-4" />
          <h3 className="font-semibold text-lg text-gray-800 mb-2">PHONE NUMBER</h3>
          <p className="text-sm text-gray-600">+977-987654321</p>
        </div>

        {/* Email */}
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center border-t-4 border-pink-700">
          <FaEnvelope className="text-pink-700 text-3xl mb-4" />
          <h3 className="font-semibold text-lg text-gray-800 mb-2">EMAIL</h3>
          <p className="text-sm text-gray-600">rentmyfitteam@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
