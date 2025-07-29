import React, { useEffect } from 'react';
import { FaTimes, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import khaltiConfig from '../utils/khaltiConfig';

const CartModal = ({ onClose }) => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const subtotal = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const config = khaltiConfig(subtotal * 100, (payload) => {
      alert('✅ Payment Successful with Khalti!');
      console.log('Khalti payload:', payload);
    });

    const checkout = new window.KhaltiCheckout(config);
    checkout.show({ amount: subtotal * 100 });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-600 text-lg bg-transparent"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-pink-700 text-center">
          Your Shopping Cart
        </h2>

        {cartItems?.length === 0 ? (
          <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Size: {item.selectedSize}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() =>
                            decreaseQuantity(item.id, item.selectedSize)
                          }
                          className="p-1 rounded-full bg-gray-200 text-pink-700 hover:bg-gray-300"
                        >
                          <FaMinus size={10} />
                        </button>
                        <span className="text-sm font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            increaseQuantity(item.id, item.selectedSize)
                          }
                          className="p-1 rounded-full bg-gray-200 text-pink-700 hover:bg-gray-300"
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      removeFromCart(item.id, item.selectedSize)
                    }
                    className="text-red-500 hover:text-red-700 bg-transparent"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Subtotal & Checkout */}
            <div className="mt-8 border-t pt-6 text-right">
              <p className="text-lg font-semibold text-gray-800 mb-3">
                Subtotal: ${subtotal.toFixed(2)}
              </p>
              <div className="flex justify-end items-center gap-2 mb-4">
                <span className="text-sm text-gray-500">Payment Method:</span>
                <img
                  src="/assets/khalti_logo.png"
                  alt="Khalti"
                  className="h-5"
                />
              </div>
              <button
                onClick={handleCheckout}
                className="bg-pink-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-800 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
