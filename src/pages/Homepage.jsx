import { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import { FaHeart, FaShoppingCart, FaSearch, FaBell } from 'react-icons/fa';

const categories = [
  'Popular',
  'New Arrivals',
  'Dress',
  'Shoe',
  'Bag',
  'Accessories',
  'Designer',
  'Ethnicwear',
  'Casual',
  'Formal',
];

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Popular');

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error loading products:', err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts =
    activeCategory === 'Popular'
      ? products
      : products.filter((p) =>
          p.category?.toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top bar */}
      <header className="flex justify-between items-center px-6 py-4 shadow-md sticky top-0 bg-white z-50">
        <img src="/assets/rentmyfit_text_logo.png" alt="RentMyFit" className="w-36" />

        <div className="flex items-center space-x-6 text-pink-700 text-xl">
          <FaSearch className="cursor-pointer" />
          <FaBell className="cursor-pointer" />
          <FaShoppingCart className="cursor-pointer" />
        </div>
      </header>

      {/* Categories tabs */}
      <div className="flex space-x-3 overflow-x-auto px-6 py-4 border-b">
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

      {/* Products */}
      <div className="px-6 py-8">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl p-4 shadow hover:shadow-lg flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl mb-3"
                />
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-md">{product.name}</h3>
                  <FaHeart className="text-pink-600 cursor-pointer" />
                </div>
                <p className="text-pink-700 font-semibold mb-1">${product.price}</p>
                <p className="text-sm text-gray-600 mb-2">
                  Sizes:{' '}
                  {product.sizes && product.sizes.length > 0
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
    </div>
  );
};

export default Homepage;
