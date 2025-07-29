import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getUser } from '../utils/getUser';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  // Load user and token on first mount
  useEffect(() => {
  const parsedUser = getUser();
  const storedToken = localStorage.getItem('token');
  const id = parsedUser?._id || null;

  setUserId(id);
  setToken(storedToken);
}, []);



  // ✅ NEW: Detect login after redirect and update context
  useEffect(() => {
    const checkLogin = () => {
      const user = getUser();
      const storedToken = localStorage.getItem('token');
      if (user && user._id) {
        setUserId(user._id);
        setToken(storedToken);
      }
    };

    checkLogin(); // run on mount

    window.addEventListener('storage', checkLogin);
    window.addEventListener('focus', checkLogin);

    return () => {
      window.removeEventListener('storage', checkLogin);
      window.removeEventListener('focus', checkLogin);
    };
  }, []);

  // Fetch cart from backend
  const loadCartForUser = useCallback(async () => {
    if (userId && token) {
      try {
        const res = await fetch('http://localhost:5000/api/auth/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setCartItems(data.cart || []);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        console.error('Failed to fetch cart from backend:', err.message);
        setCartItems([]);
      }
    }
  }, [userId, token]);

  // Sync local + remote cart when cart changes
  useEffect(() => {
    if (userId && token) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));

      const validCart = cartItems.filter(
  (item) => item.product && item.selectedSize
);

fetch('http://localhost:5000/api/auth/cart/overwrite', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ cart: validCart }),
})
.catch((err) =>
        console.error('Failed to sync cart to backend:', err.message)
      );
    }
  }, [cartItems, userId, token]);

  // Refresh cart after userId/token change (e.g. after login)
  useEffect(() => {
    if (userId && token) {
      loadCartForUser();
    }
  }, [userId, token, loadCartForUser]);

  // Cart manipulation
  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const index = prevItems.findIndex(
        (item) =>
          item.product === newItem.product &&
          item.selectedSize === newItem.selectedSize
      );
      if (index !== -1) {
        const updated = [...prevItems];
        updated[index].quantity += newItem.quantity;
        return updated;
      }
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (product, selectedSize) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.product === product && item.selectedSize === selectedSize)
      )
    );
  };

  const increaseQuantity = (product, selectedSize) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product === product && item.selectedSize === selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (product, selectedSize) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.product === product && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const logoutUser = () => {
    setUserId(null);
    setToken(null);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartCount,
        setCartItems,
        loadCartForUser,
        logoutUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
