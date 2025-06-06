import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Left side - Signup Box */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center z-10 bg-white">
        <div className="w-[90%] max-w-md bg-white rounded-[40px] p-8 md:p-10 shadow-md space-y-6">
          <h2 className="text-center text-3xl font-bold text-pink-700">Signup</h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-pink-700 text-black px-4 py-3 rounded-full bg-white placeholder-gray-500 focus:outline-pink-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-pink-700 text-black px-4 py-3 rounded-full bg-white placeholder-gray-500 focus:outline-pink-500"
          />
          <input
            type="password"
            placeholder="password"
            className="w-full border border-pink-700 text-black px-4 py-3 rounded-full bg-white placeholder-gray-500 focus:outline-pink-500"
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full border border-pink-700 text-black px-4 py-3 rounded-full bg-white placeholder-gray-500 focus:outline-pink-500"
          />

          <button className="w-full bg-pink-700 text-white py-3 rounded-full text-lg hover:bg-pink-800 transition">
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-700">
            By creating an account you are accepting our <span className="font-semibold underline">Terms of Services</span>
          </p>
        </div>
      </div>

      {/* Right side - RF Illustration only */}
      <div className="hidden md:flex relative w-1/2 h-full items-center justify-center bg-[#fff0f5]">
        <img
          src="/assets/rf.png"
          alt="RF Illustration"
          className="w-[240px] z-10"
        />
      </div>
    </div>
  );
};

export default Register;
