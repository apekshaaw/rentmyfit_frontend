import React, { useState, useContext, useEffect } from 'react';
import { FaHeart, FaShoppingBag, FaMinus, FaPlus, FaRegHeart } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
import { CartContext } from '../contexts/CartContext';

const ProductModal = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useContext(CartContext);

  const token = localStorage.getItem('token');

  if (!product) return null;

  // 🔄 Check if item is already in wishlist
  useEffect(() => {
    let user = null;
try {
  const stored = localStorage.getItem('user');
  if (stored && stored !== 'undefined') {
    user = JSON.parse(stored);
  }
} catch (err) {
  console.warn('Invalid user JSON in localStorage:', err);
}

    const isInWishlist = user?.wishlist?.includes(product._id);
    setIsFavorite(isInWishlist);
  }, [product]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize || quantity < 1) {
      alert('Please select size and quantity');
      return;
    }

    addToCart({ ...product, selectedSize, quantity });
    onClose();
  };

  // 🧠 Toggle Wishlist Function
  const toggleWishlist = async () => {
    if (!token) return;

    try {
      const endpoint = isFavorite
        ? `http://localhost:5000/api/auth/wishlist/${product._id}`
        : `http://localhost:5000/api/auth/wishlist/add`;

      const method = isFavorite ? 'DELETE' : 'POST';
      const body = isFavorite ? null : JSON.stringify({ productId: product._id });

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      const data = await res.json();
      if (res.ok) {
        setIsFavorite(!isFavorite);
        const updatedUser = JSON.parse(localStorage.getItem('user')) || {};
        updatedUser.wishlist = data.wishlist;
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        console.error(data.message || 'Wishlist toggle failed');
      }
    } catch (err) {
      console.error('Wishlist error:', err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-3xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">

        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-black text-2xl p-0 bg-transparent shadow-none"
        >
          <IoArrowBackOutline />
        </button>

        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 text-black text-xl p-0 bg-transparent shadow-none"
        >
          {isFavorite ? <FaHeart className="text-pink-700" /> : <FaRegHeart />}
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-contain mb-4 rounded-lg"
        />

        <div className="text-left px-2">
          <h2 className="text-2xl font-bold text-pink-700 mb-1">{product.name}</h2>
          <p className="text-lg font-semibold text-gray-800 mb-1">${product.price.toFixed(2)}</p>

          {product.sizes?.length > 0 && (
            <div className="mb-3">
              <p className="font-semibold text-gray-700 mb-1">Select Size:</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`px-4 py-2 rounded-lg border-2 ${
                      selectedSize === size
                        ? 'bg-pink-700 text-white border-pink-700'
                        : 'bg-white text-pink-700 border-pink-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <p className="font-semibold text-gray-700">Quantity:</p>
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="bg-gray-200 text-pink-700 px-2 py-1 rounded-full"
            >
              <FaMinus />
            </button>
            <span className="text-lg font-semibold text-pink-700">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="bg-gray-200 text-pink-700 px-2 py-1 rounded-full"
            >
              <FaPlus />
            </button>
          </div>

          {product.description && (
            <p className="text-gray-700 mb-6 whitespace-pre-wrap">
              {product.description}
            </p>
          )}
        </div>

        <div className="w-full flex justify-center">
          <button
            onClick={handleAddToCart}
            className="w-full max-w-xs flex items-center justify-center gap-2 px-6 py-3 bg-pink-700 text-white text-sm font-semibold rounded-full hover:bg-pink-800 transition"
          >
            <FaShoppingBag className="text-md" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
