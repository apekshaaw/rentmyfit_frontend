import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <p className="text-lg text-gray-700">Your cart is empty.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <ul className="space-y-4">
        {cartItems.map((item, idx) => (
          <li key={idx} className="border p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="text-pink-700 font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
