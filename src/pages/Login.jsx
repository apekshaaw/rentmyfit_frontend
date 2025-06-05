import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-pink-700">LOGIN</h2>
          <h3 className="text-xl font-bold">WELCOME</h3>

          <input type="email" placeholder="Enter Email" className="w-full border rounded-full px-4 py-2" />
          <input type="password" placeholder="Enter password" className="w-full border rounded-full px-4 py-2" />

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="text-sm">Remember Me</label>
          </div>

          <button className="w-full bg-pink-700 text-white py-2 rounded-full text-lg hover:bg-pink-800 transition">
            Log In
          </button>

          <div className="text-sm text-center text-gray-600">
            <p className="mt-2">Forgot Password?</p>
            <p>
              Don’t have an account? <Link to="/register" className="font-semibold underline">Signup</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex w-1/2 bg-pink-100 items-center justify-center">
        <img src="/assets/illustration.png" alt="fashion" className="max-w-sm" />
      </div>
    </div>
  );
};

export default Login;
