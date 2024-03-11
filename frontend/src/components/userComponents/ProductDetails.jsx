import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductApi from '../../api/productApi';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductApi.getProductById(productId);

        if (response) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = () => {
    console.log(`Added to Cart: ${product.name} (${product._id}) - Quantity: ${quantity}`);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`bg-${product.inventory.inStock ? 'white' : 'red-50'} p-8 dark:bg-gray-800`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div>
          <img
            src={product.productImg || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="rounded-lg w-full"
          />
        </div>

        <div className={`text-${product.inventory.inStock ? 'gray-800' : 'red-800'} dark:text-white`}>
          <h2 className="text-4xl font-bold mb-2 dark:text-gray-500">{product.name}</h2>
          <p className="text-sm text-gray-500 mb-4">{product.type}</p>
          <p className="text-lg mb-4">{product.description}</p>

          <div className="flex items-center mb-4">
            <span className="text-gray-800 dark:text-white">Price:</span>
            <p className={`text-xl font-bold ml-2 ${product.inventory.inStock ? 'text-gray-800 dark:text-gray-400' : 'text-red-800'}`}>${product.price.toFixed(2)}</p>
          </div>

          <div className="flex items-center mb-4">
            <span className="text-gray-800 dark:text-white">Category:</span>
            <p className={`ml-2 ${product.inventory.inStock ? 'text-gray-800 dark:text-gray-400' : 'text-red-800'}`}>{product.category}</p>
          </div>

          <div className="flex items-center mb-4">
            <span className="text-gray-800 dark:text-white">Manufacturer:</span>
            <p className={`ml-2 ${product.inventory.inStock ? 'text-gray-800 dark:text-gray-400' : 'text-red-800'}`}>{product.manufacturer}</p>
          </div>

          <div className="flex items-center mb-4">
            <span className="text-gray-800 dark:text-white">Stock:</span>
            <p className={`ml-2 ${product.inventory.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inventory.quantity} {product.inventory.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>

          {/* Quantity and Add to Cart */}
          {product.inventory.inStock && (
            <div className="flex items-center mb-6">
              <label className="mr-2 text-gray-800 dark:text-white">Quantity:</label>
              <select
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 px-2 py-1 text-sm dark:text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-primary">
                {[1, 2, 3, 4, 5].map((option) => (
                  <option
                    key={option}
                    value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button
                className={`inline-flex items-center px-4 py-2 ml-4 text-sm font-medium text-white bg-gray-900 rounded-lg ${product.inventory.inStock ? 'hover:bg-primary-light focus:ring-4 focus:outline-none focus:ring-primary-light' : ''} ${
                  product.inventory.inStock ? '' : 'cursor-not-allowed opacity-50'
                } dark:bg-gray-700 ${product.inventory.inStock ? `dark:hover:bg-primary-dark` : ''}`}
                onClick={() => {
                  if (product.inventory.inStock) {
                    handleAddToCart(product.name, product._id, quantity);
                  }
                }}
                disabled={!product.inventory.inStock}>
                Add to Cart
                <svg
                  className={`w-4 h-4 ml-2 text-${product.inventory.inStock ? 'white' : 'gray-800'} dark:text-white`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          )}

          <hr className="border-gray-300 my-6" />

          {/* Additional Details */}
          <div className="text-sm leading-loose text-gray-700 dark:text-gray-400">
            <p>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo dolorem magni quod mollitia repudiandae ducimus, vitae similique eos. Atque eos harum totam inventore quia et aliquid corporis nesciunt iure velit.
            </p>

            {/* Additional Fields */}
            <p className="mt-4">
              <span className="text-gray-800 dark:text-white">Tags:</span> {product.tags.join(', ')}
            </p>

            <div className="flex items-center mt-6">
              <span className="text-gray-800 dark:text-white">Rating:</span>
              <div className="flex items-center ml-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${star <= product.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1.4 16.62l-3.57-2.72L5 16.22l1.3-4.58-3.44-2.62 4.54-.04L10 3l1.6 4.78 4.54.04-3.44 2.62L15 16.22l-2.83-2.32-3.57 2.72z"
                    />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
