import { useState } from 'react';
import { createProduct, updateProduct } from '../api';

const categories = [
  'Dress',
  'Shoe',
  'Designer',
  'Ethnicwear',
  'Casual',
  'Formal',
  'Bag',
  'Shades',
];

const getSizesForCategory = (category) => {
  if (category === 'Shoe') {
    return ['EUR 36', 'EUR 37', 'EUR 38', 'EUR 39', 'EUR 40', 'EUR 41', 'EUR 42'];
  } else if (
    ['Dress', 'Designer', 'Ethnicwear', 'Casual', 'Formal'].includes(category)
  ) {
    return ['S', 'M', 'L', 'XL', 'XXL'];
  } else {
    return [];
  }
};

const ProductForm = ({ onAdd, onClose, initialData = {}, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    category: initialData.category || '',
    sizes: initialData.sizes || [],
    price: initialData.price || '',
    image: initialData.image || '',
    availability: initialData.availability || false,
    description: initialData.description || '', // ✅ Added
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'sizes') {
      setFormData((prev) => ({
        ...prev,
        sizes: checked
          ? [...prev.sizes, value]
          : prev.sizes.filter((s) => s !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
        ...(name === 'category' && { sizes: [] }),
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'edit') {
        await updateProduct(initialData._id, formData);
      } else {
        await createProduct(formData);
      }
      if (onAdd) onAdd();
      onClose();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-[40px] shadow-xl w-full max-w-md overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          {mode === 'edit' ? 'Edit Product' : 'Add New Product'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-2 border-pink-700 text-pink-700 placeholder-pink-500 px-4 py-3 rounded-lg bg-white"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border-2 border-pink-700 text-pink-700 px-4 py-3 rounded-lg bg-white"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {getSizesForCategory(formData.category).length > 0 && (
            <div className="text-pink-700">
              <label className="font-semibold block mb-1">Available Sizes:</label>
              <div className="flex flex-wrap gap-2">
                {getSizesForCategory(formData.category).map((sz) => (
                  <label key={sz} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="sizes"
                      value={sz}
                      checked={formData.sizes.includes(sz)}
                      onChange={handleChange}
                      className="accent-pink-700"
                    />
                    <span>{sz}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border-2 border-pink-700 text-pink-700 placeholder-pink-500 px-4 py-3 rounded-lg bg-white"
            required
          />

          <div className="text-pink-700 space-y-2">
            <label className="font-semibold block mb-1">Product Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border-2 border-pink-700 px-4 py-2 rounded-lg bg-white"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-40 object-cover rounded mt-2 border"
              />
            )}
          </div>

          {/* ✅ Description Textarea */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border-2 border-pink-700 text-pink-700 placeholder-pink-500 px-4 py-3 rounded-lg bg-white resize-none"
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="accent-pink-700"
            />
            <label className="text-sm text-pink-700">Available</label>
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-700 text-white rounded hover:bg-pink-800 transition"
            >
              {mode === 'edit' ? 'Update' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
