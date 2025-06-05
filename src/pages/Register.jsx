import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-5">
          <h2 className="text-3xl font-bold text-pink-700">Signup</h2>

          <input type="text" placeholder="Your Name" className="w-full border rounded-full px-4 py-2" />
          <input type="email" placeholder="Email" className="w-full border rounded-full px-4 py-2" />
          <input type="password" placeholder="password" className="w-full border rounded-full px-4 py-2" />
          <input type="password" placeholder="Confirm password" className="w-full border rounded-full px-4 py-2" />

          <button className="w-full bg-pink-700 text-white py-2 rounded-full text-lg hover:bg-pink-800 transition">
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-600">
            By creating an account you are accepting our <span className="font-semibold underline">Terms of Services</span>
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex w-1/2 bg-pink-100 items-center justify-center">
        <img src="/assets/illustration.png" alt="fashion" className="max-w-sm" />
      </div>
    </div>
  );
};

export default Register;
