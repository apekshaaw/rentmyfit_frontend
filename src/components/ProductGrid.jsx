import { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import { FaHeart } from 'react-icons/fa';

const categories = [
  'Popular', 'New Arrivals', 'Dress', 'Shoe', 'Bag',
  'Accessories', 'Designer', 'Ethnicwear', 'Casual', 'Formal',
];

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [favorites, setFavorites] = useState([]);

  const token = localStorage.getItem('token');

  // Fetch products + wishlist once
  useEffect(() => {
    const loadAll = async () => {
      try {
        const productData = await fetchProducts();
        setProducts(productData);
      } catch (err) {
        console.error('Failed to load products:', err);
      }

      if (token) {
        try {
          const res = await fetch('http://localhost:5000/api/auth/wishlist', {
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = await res.json();
          if (Array.isArray(data.wishlist)) {
            setFavorites(data.wishlist.map((item) => item._id || item));
          }
        } catch (err) {
          console.error('Failed to fetch wishlist:', err);
        }
      }
    };

    loadAll();
  }, [token]);

  const toggleFavorite = async (productId) => {
  if (!token) {
    alert('Please login to use wishlist.');
    return;
  }

  const isFav = favorites.includes(productId);

  const url = isFav
    ? `http://localhost:5000/api/auth/wishlist/${productId}` // DELETE
    : 'http://localhost:5000/api/auth/wishlist/add';         // POST

  const options = {
    method: isFav ? 'DELETE' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  if (!isFav) {
    options.body = JSON.stringify({ productId });
  }

  try {
    const res = await fetch(url, options);
    if (res.ok) {
      setFavorites((prev) =>
        isFav ? prev.filter((id) => id !== productId) : [...prev, productId]
      );
    } else {
      console.error('Failed to update wishlist:', await res.text());
    }
  } catch (err) {
    console.error('Wishlist toggle failed:', err);
  }
};
  const filteredProducts =
    activeCategory === 'Popular'
      ? products
      : products.filter((p) =>
          p.category?.toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <div>
      {/* Categories */}
      <div className="flex space-x-3 overflow-x-auto pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-pink-700 text-white'
                : 'bg-gray-200 text-pink-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="relative bg-white rounded-2xl p-4 shadow hover:shadow-lg flex flex-col"
          >
            {/* Favorite Toggle */}
            <button
              onClick={() => toggleFavorite(product._id)}
              className="absolute top-3 right-3 bg-transparent"
            >
              <FaHeart
                className={`transition-all duration-200 ${
                  favorites.includes(product._id) ? 'text-pink-700' : 'text-white'
                }`}
                style={{
                  fontSize: '24px',
                  stroke: '#831843',
                  strokeWidth: 2,
                }}
              />
            </button>

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-contain mb-3"
            />

            {/* Product Info */}
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

            {/* Rent Button */}
            <button className="mt-auto px-4 py-2 bg-pink-700 text-white rounded-full hover:bg-pink-800 transition">
              Rent Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
