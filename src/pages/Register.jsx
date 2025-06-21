import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError('');

    if (!name || !email || !password) {
      return setError('Please fill in all fields');
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || 'Registration failed');
      }

      alert('You are now registered. You can log in.');
      navigate('/login');
    } catch (err) {
      console.error('Register Error:', err);
      setError('Server error');
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <div className="w-full md:w-1/2 h-full flex items-center justify-center z-10 bg-white">
        <div className="w-[90%] max-w-md bg-[#ffe6f0] rounded-[40px] p-8 md:p-10 shadow-md space-y-6">
          <h2 className="text-center text-3xl font-bold text-pink-700">Signup</h2>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-pink-700 text-black px-4 py-3 rounded-full bg-white placeholder-gray-500 focus:outline-pink-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-pink-700 text-black px-4 py-3 rounded-full bg-white placeholder-gray-500 focus:outline-pink-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-pink-700 text-black px-4 py-3 rounded-full bg-white placeholder-gray-500 focus:outline-pink-500"
          />

          <button
            onClick={handleRegister}
            className="w-full bg-pink-700 text-white py-3 rounded-full text-lg hover:bg-pink-800 transition"
          >
            Sign Up
          </button>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <p className="text-sm text-center text-gray-700">
            By creating an account you are accepting our <span className="font-semibold underline">Terms of Services</span>
          </p>
          <p className="text-sm text-center text-gray-600 mt-2">
            Already have an account? <Link to="/login" className="text-pink-700 font-semibold">Login</Link>
          </p>
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

export default Register;
