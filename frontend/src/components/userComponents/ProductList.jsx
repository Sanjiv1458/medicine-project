import { useState, useEffect } from 'react';
import ProductApi from '../../api/productApi';
import UserApi from '../../api/userApi';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import ToastUtility from '../../utils/ToastUtility';
import { Link } from 'react-router-dom';

const ProductList = ({ selectedCategory, selectedType }) => {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState(null);
  const [enquiryProductId, setEnquiryProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    quantity: null,
  });
  const [products, setProducts] = useState([]);

  const { state } = useAuth();
  const userId = state.user._id;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductApi.getProducts();
        const fetchedProducts = response.data;

        if (Array.isArray(fetchedProducts)) {
          setProducts(fetchedProducts);
        } else {
          console.error('ProductApi.getProducts() did not return an array:', fetchedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEnquiryClick = (productName, productId) => {
    setEnquiryProduct(productName);
    setEnquiryProductId(productId);
    setShowEnquiryModal(true);
  };

  const handleCloseModal = () => {
    setShowEnquiryModal(false);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UserApi.submitProductQuery(userId, {
        id: enquiryProductId,
        product: enquiryProduct,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        quantity: formData.quantity,
      });

      if (response.success) {
        const queryId = response.data._id;
        const path = `/user/query/${queryId}`;
        ToastUtility('Query submitted successfully', path);
      } else {
        toast.error('Error submitting enquiry');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
    }

    setShowEnquiryModal(false);
  };

  // Filter products based on selectedCategory and selectedType
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'All' && !selectedType) {
      return true;
    } else if (selectedCategory === 'All' && selectedType) {
      return product.type === selectedType;
    } else if (product.category === selectedCategory && !selectedType) {
      return true;
    } else {
      return product.category === selectedCategory && product.type === selectedType;
    }
  });

  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Customers also purchased</h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden">
              {/* Wrap the product card with Link */}
              <Link
                to={`/user/product/${product._id}`}
                key={product._id}>
                <img
                  src={product.productImg}
                  alt={product.name}
                  className="rounded-t-lg w-full"
                />
              </Link>
              <div className="p-4">
                <a href="#product-details">
                  <h5 className="mb-2 text-xl font-bold text-gray-800 dark:text-white">{product.name}</h5>
                </a>
                <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">{product.type}</p>
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">{product.description}</p>
                <p className="mb-2 text-sm font-medium text-gray-800 dark:text-white">${product.price}</p>
                <p className="mb-2 text-sm font-medium text-gray-800 dark:text-white">Category: {product.category}</p>
                <p className="mb-2 text-sm font-medium text-gray-800 dark:text-white">Manufacturer: {product.manufacturer}</p>
                <p className="mb-2 text-sm font-medium text-gray-800 dark:text-white">
                  Stock: {product.inventory.quantity} {product.inventory.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
                <button
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 dark:bg-blue-700 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  onClick={() => handleEnquiryClick(product.name, product.id)}>
                  Get Enquiry
                  <svg
                    className="w-4 h-4 ml-2"
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
            </div>
          ))}
        </div>
      </div>

      {showEnquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Product Enquiry - {enquiryProduct}</h2>
            <form onSubmit={handleFormSubmit}>
              {/* Add more form fields as needed */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-800 dark:text-white">ID</label>
                <select
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled>
                  <option value={enquiryProductId}>{enquiryProductId}</option>
                </select>
              </div>
              {/* Add your form fields here */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-800 dark:text-white">Product</label>
                <select
                  className="mt-1 p-2 w-full border rounded-md"
                  disabled>
                  <option value={enquiryProduct}>{enquiryProduct}</option>
                </select>
              </div>
              {/* Add more form fields as needed */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-800 dark:text-white">Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Your Name"
                  required
                  onChange={handleFormChange}
                  name="name"
                />
              </div>
              {/* Add more form fields as needed */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-800 dark:text-white">Email</label>
                <input
                  type="email"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Your Email"
                  required
                  onChange={handleFormChange}
                  name="email"
                />
              </div>
              {/* Add more form fields as needed */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-800 dark:text-white">Phone Number</label>
                <input
                  type="tel"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Your Phone Number"
                  required
                  onChange={handleFormChange}
                  name="phoneNumber"
                />
              </div>
              {/* Add more form fields as needed */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-800 dark:text-white">Quantity</label>
                <input
                  type="number"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Quantity"
                  required
                  onChange={handleFormChange}
                  name="quantity"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                SUBMIT
              </button>
            </form>
            <button
              onClick={handleCloseModal}
              className="mt-4 text-sm text-gray-500 hover:underline cursor-pointer">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
