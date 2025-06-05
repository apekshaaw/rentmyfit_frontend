import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="w-full h-screen bg-white flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-8 md:py-0 relative overflow-hidden rounded-[32px]">
      {/* Top Wave */}
      <img
        src="/assets/topwave.png"
        alt="Top Wave"
        className="absolute top-0 right-0 w-[140px] md:w-[220px] z-0"
      />

      {/* Left Content */}
      <div className="flex flex-col justify-center items-start w-full md:w-1/2 space-y-8 z-10">
        <img
          src="/assets/rentmyfit_text_logo.png"
          alt="RentMyFit Logo"
          className="w-48 md:w-56"
        />
        <h1 className="text-2xl md:text-3xl font-semibold text-left">
          Why buy it once when you can rent <br /> the runway every time?
        </h1>
        <Link to="/login">
          <button className="bg-pink-700 text-white px-8 py-3 rounded-full text-lg hover:bg-pink-800 transition">
            Start Renting
          </button>
        </Link>
      </div>

      {/* Right Illustration */}
      <div className="hidden md:flex w-1/2 justify-end z-10">
        <img
          src="/assets/rf.png"
          alt="Illustration"
          className="w-[220px] lg:w-[260px] object-contain"
        />
      </div>
    </div>
  );
};

export default Homepage;
