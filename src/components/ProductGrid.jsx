import { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import { FaHeart } from 'react-icons/fa';

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

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [favorites, setFavorites] = useState([]);

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

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
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

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="relative bg-white rounded-2xl p-4 shadow hover:shadow-lg flex flex-col"
            >
              {/* Favorite button */}
              <button
                onClick={() => toggleFavorite(product._id)}
                className="absolute top-3 right-3 p-0 m-0 bg-transparent border-none outline-none"
              >
                <FaHeart
                  className={`transition-all duration-200 ${
                    favorites.includes(product._id) ? 'text-pink-700' : 'text-white'
                  }`}
                  style={{
                    fontSize: '24px',
                    stroke: '#831843', // dark pink stroke (pink-900)
                    strokeWidth: 2,
                  }}
                />
              </button>

              {/* Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-contain mb-3"
              />

              {/* Name & price */}
              <h3 className="font-semibold text-md mb-1">{product.name}</h3>
              <p className="text-pink-700 font-semibold mb-1">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-600 mb-2">
                Sizes:{' '}
                {product.sizes && product.sizes.length > 0
                  ? product.sizes.join(', ')
                  : 'N/A'}
              </p>

              {/* Rent Now button */}
              <button className="mt-auto px-4 py-2 bg-pink-700 text-white rounded-full hover:bg-pink-800 transition">
                Rent Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
