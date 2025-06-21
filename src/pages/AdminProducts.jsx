import { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../api';
import ProductForm from '../components/ProductForm';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const navigate = useNavigate();

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

  const handleAdd = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  const handleFormSubmit = async () => {
    await loadProducts();
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        {/* Back Icon */}
        <button
          onClick={() => navigate('/dashboard?tab=home')}
          className="text-pink-700 text-3xl p-0 m-0 bg-transparent border-none outline-none"
        >
          <FaArrowLeft />
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-pink-700 text-center flex-grow">
          Admin Panel: Manage Products
        </h1>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className="px-5 py-2 bg-pink-700 text-white rounded-full text-sm hover:bg-pink-800 transition"
        >
          + Add Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-200 rounded-2xl p-4 shadow hover:shadow-lg flex flex-col"
          >
            {/* Image */}
            <div className="w-full h-60 flex justify-center items-center mb-3">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Info */}
            <h3 className="font-semibold text-md mb-1">{product.name}</h3>
            <p className="text-pink-700 font-semibold mb-1">
              ${product.price?.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Sizes:{' '}
              {product.sizes && product.sizes.length > 0
                ? product.sizes.join(', ')
                : 'N/A'}
            </p>

            {/* Edit & Delete */}
            <div className="mt-auto flex justify-between space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          onAdd={handleFormSubmit}
          onClose={() => setShowForm(false)}
          initialData={editProduct || {}}
          mode={editProduct ? 'edit' : 'add'}
        />
      )}
    </div>
  );
};

export default AdminProducts;
