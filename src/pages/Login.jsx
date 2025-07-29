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

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('Login Error: Invalid JSON from backend:', err.message);
        return setError('Server error');
      }

      if (!res.ok) {
        return setError(data.message || 'Invalid credentials');
      }

      if (data.token) {
        // 🧹 Clean old cart if different user
        let prevUser = null;
        try {
          const stored = localStorage.getItem('user');
          if (stored && stored !== 'undefined') {
            prevUser = JSON.parse(stored);
          }
        } catch (err) {
          console.warn('Invalid user JSON in localStorage');
        }

        if (prevUser && prevUser._id && prevUser._id !== data.user._id) {
          localStorage.removeItem(`cart_${prevUser._id}`);
        }

        // ✅ Save new auth data
        localStorage.setItem('token', data.token);
        if (data?.user) {
  const normalizedUser = {
    ...data.user,
    _id: data.user.id || data.user._id, 
  };
  localStorage.setItem('user', JSON.stringify(normalizedUser));
} else {
  console.warn('Login response missing user data');
}


        localStorage.setItem('role', data.user.role);

        // 🛒 Get backend cart
        const cartRes = await fetch('http://localhost:5000/api/auth/cart', {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        const backendCart = cartRes.ok ? (await cartRes.json()).cart || [] : [];

        // 🧠 Get existing local cart
        let localCart = [];
        const localCartKey = `cart_${data.user._id}`;

        try {
          const storedCart = localStorage.getItem(localCartKey);
          if (storedCart && storedCart !== 'undefined') {
            localCart = JSON.parse(storedCart);
          }
        } catch (err) {
          console.warn('Invalid cart JSON in localStorage:', err.message);
        }

        // 🔀 Merge local and backend carts
        const mergedCart = [...backendCart];

        for (const localItem of localCart) {
          const existingIndex = mergedCart.findIndex(
            (item) =>
              item.product === localItem.product &&
              item.selectedSize === localItem.selectedSize
          );

          if (existingIndex !== -1) {
            mergedCart[existingIndex].quantity += localItem.quantity;
          } else {
            mergedCart.push(localItem);
          }
        }

        // 💾 Save merged cart locally
        localStorage.setItem(localCartKey, JSON.stringify(mergedCart));

        // ☁️ Overwrite backend with merged cart
        await fetch('http://localhost:5000/api/auth/cart/overwrite', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.token}`,
          },
          body: JSON.stringify({ cart: mergedCart }),
        });

        // ✅ Redirect
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

// ✅ Safely logout and clear cart
export const logoutUser = () => {
  const storedUser = localStorage.getItem('user');
  let user = null;

  try {
    user = storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.warn('Invalid user JSON in localStorage:', storedUser);
  }

  if (user && user._id) {
    localStorage.removeItem(`cart_${user._id}`);
  }

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
};

export default Login;
