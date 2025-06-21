// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setFormData(data);
      })
      .catch(err => console.error('Error fetching product:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setProduct(data);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={formData.image}
          alt={formData.name}
          className="w-full md:w-1/2 rounded"
        />
        <div className="flex-1">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mb-2 w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mb-2 w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mb-2 w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="mb-2 w-full border px-3 py-2 rounded"
              />
              <button
                onClick={handleUpdate}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="mt-2 ml-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-pink-700 text-xl mb-4">${product.price}</p>
              <p className="text-sm text-gray-600 mb-4">Size: {product.size}</p>
              <p className="text-sm text-gray-700 mb-4">Category: {product.category}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 px-4 py-2 bg-pink-700 text-white rounded hover:bg-pink-800"
              >
                Edit Product
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
