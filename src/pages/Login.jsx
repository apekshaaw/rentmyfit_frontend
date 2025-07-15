import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');

    if (!email || !password) {
      return setError('Please fill in all fields');
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || 'Invalid credentials');
      }

      if (data.token) {
        localStorage.setItem('token', data.token); // ✅ fixed here
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', data.user.role);
        navigate('/dashboard?tab=home');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Server error');
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <div className="w-full md:w-1/2 h-full flex items-center justify-center z-10 bg-white">
        <div className="w-[90%] max-w-md bg-[#ffe6f0] rounded-[40px] p-8 md:p-10 shadow-md space-y-6">
          <h2 className="text-center text-3xl font-bold text-pink-700">LOGIN</h2>
          <h3 className="text-center text-xl font-bold text-black">WELCOME</h3>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-pink-700 text-black px-4 py-3 rounded-full bg-white placeholder-gray-500 focus:outline-pink-500"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-pink-700 text-black px-4 py-3 rounded-full bg-white placeholder-gray-500 focus:outline-pink-500"
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              className="accent-pink-700 bg-white border border-gray-300"
            />
            <label htmlFor="remember" className="text-sm text-black">Remember Me</label>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-pink-700 text-white py-3 rounded-full text-lg hover:bg-pink-800 transition"
          >
            Log In
          </button>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <div className="text-sm text-center text-gray-600">
            <p className="mt-2">Forgot Password?</p>
            <p>
              Don’t have an account?{' '}
              <Link to="/register" className="font-semibold text-pink-700">Signup</Link>
            </p>
          </div>
        </div>
      </div>

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

export default Login;
