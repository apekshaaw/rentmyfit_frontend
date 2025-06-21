import { FaHeart } from 'react-icons/fa';

const ProductList = ({ products = [], admin = false, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
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
            {!admin && <FaHeart className="text-pink-600 cursor-pointer" />}
          </div>
          <p className="text-pink-700 font-semibold mb-1">${parseFloat(product.price).toFixed(2)}</p>
          <p className="text-sm text-gray-600 mb-2">
            Sizes:{' '}
            {product.sizes && product.sizes.length > 0
              ? product.sizes.join(', ')
              : 'N/A'}
          </p>

          {admin ? (
            <div className="flex justify-between mt-auto pt-2 space-x-2">
              <button
                onClick={() => onEdit(product)}
                className="flex-1 px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(product._id)}
                className="flex-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ) : (
            <button className="mt-auto px-4 py-2 bg-pink-700 text-white rounded-full hover:bg-pink-800 transition">
              Rent Now
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
