import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, Delete, Edit } from 'react-feather';
import ProductApi from '../../api/productApi';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { logout } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productsData = await ProductApi.getProducts();
        if (productsData.data == null) {
          navigate('/admin/noProduct');
        } else {
          setProducts(productsData.data);
        }
      } catch (error) {
        logout();
        toast.error('Login Expired, please Login');
      }
    };
    fetchProduct();
  }, [logout, navigate]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await ProductApi.deleteProduct(productId);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleToggleStockStatus = async (productId, currentStatus) => {
    try {
      const updatedProduct = await ProductApi.updateStockStatus(productId, !currentStatus);
      setProducts((prevProducts) => prevProducts.map((product) => (product._id === updatedProduct.data._id ? updatedProduct.data : product)));

      toast.success('Stock status updated successfully');
    } catch (error) {
      console.error('Error updating stock status:', error);
      toast.error('Failed to update stock status');
    }
  };

  const filteredProducts = products.filter((product) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    return (
      product.name.toLowerCase().includes(lowerCaseSearchQuery) ||
      product.description.toLowerCase().includes(lowerCaseSearchQuery) ||
      product.category.toLowerCase().includes(lowerCaseSearchQuery) ||
      product.type.toLowerCase().includes(lowerCaseSearchQuery) ||
      product.manufacturer.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  return (
    <div className="container mx-auto py-8">
      <div className="mt-8">
        <div className="relative m-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name..."
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 block dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 dark:text-gray-600"
            height="32"
            width="32"
            viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm table-auto border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  In Stock
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 border-b border-gray-300 dark:border-gray-700">
                  <td className="p-4">
                    <img
                      src={product.productImg}
                      className="w-12 md:w-20 h-auto max-w-full rounded-md"
                      alt={product.name}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.name}</td>
                  <td className="px-6 py-4 text-black dark:text-white">{product.inventory.quantity}</td>
                  <td
                    className={`px-5 py-4 dark:border-strokedark cursor-pointer`}
                    onClick={() => handleToggleStockStatus(product._id, product.inventory.inStock)}>
                    <div className={`flex items-center justify-between w-20 h-8 border rounded-full px-2 transition-all duration-300 ${product.inventory.inStock ? 'bg-green-100 border-green-600' : 'bg-red-100 border-red-600 hover:bg-opacity-80'}`}>
                      {product.inventory.inStock ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                      <span
                        className={`text-xs font-medium ${product.inventory.inStock ? 'text-green-500' : 'text-red-500'}`}
                        style={{ userSelect: 'none' }}>
                        {product.inventory.inStock ? 'In-Stock' : 'Out-Stock'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">${product.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/admin/updateProduct/${product._id}`}
                        className="hover:text-blue">
                        <Edit className="text-blue-500 hover:text-blue-600 h-6 w-6" />
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="hover:text-red">
                        <Delete className="text-red-500 hover:text-red-600 h-6 w-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
