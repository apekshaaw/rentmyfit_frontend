import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

export default function Wishlist() {
  const [wishlistProductIds, setWishlistProductIds] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  // Fetch wishlist product IDs
  const fetchWishlist = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && Array.isArray(data.wishlist)) {
        const ids = data.wishlist.map((item) => item._id || item); // Normalize _id
        setWishlistProductIds(ids);
      } else {
        console.error('Unexpected wishlist response:', data);
      }
    } catch (err) {
      console.error('Failed to fetch wishlist:', err);
      if (err.status === 401) {
        localStorage.clear();
      }
    }
  };

  // Fetch product details
  const fetchWishlistProducts = async (ids) => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        const filtered = data.filter((prod) => ids.includes(prod._id));
        setWishlistProducts(filtered);
      }
    } catch (err) {
      console.error('Failed to fetch product data:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/auth/wishlist/${productId}`, {
      method: 'DELETE', 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setWishlistProductIds((prev) => prev.filter((id) => id !== productId));
      setWishlistProducts((prev) => prev.filter((p) => p._id !== productId));
    } else {
      console.error('Failed to remove from wishlist:', await res.text());
    }
  } catch (err) {
    console.error('Failed to remove item from wishlist:', err);
  }
};


  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
  if (wishlistProductIds.length > 0) {
    console.log('Fetching products for IDs:', wishlistProductIds); // 🔍 add this
    fetchWishlistProducts(wishlistProductIds);
  } else {
    setWishlistProducts([]);
    setLoading(false);
  }
}, [wishlistProductIds]);


  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-black">Your Wishlist</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : wishlistProducts.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product._id}
              className="relative bg-white rounded-2xl p-4 shadow hover:shadow-lg flex flex-col"
            >
              {/* Remove from Wishlist */}
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-3 right-3 p-0 m-0 bg-transparent border-none outline-none"
              >
                <FaHeart
                  className="text-pink-700"
                  style={{
                    fontSize: '24px',
                    stroke: '#831843',
                    strokeWidth: 2,
                  }}
                />
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-contain mb-3"
              />
              <h3 className="font-semibold text-md mb-1">{product.name}</h3>
              <p className="text-pink-700 font-semibold mb-1">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Sizes:{' '}
                {product.sizes?.length > 0
                  ? product.sizes.join(', ')
                  : 'N/A'}
              </p>

              <button className="mt-auto px-4 py-2 bg-pink-700 text-white rounded-full hover:bg-pink-800 transition">
                Rent Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
