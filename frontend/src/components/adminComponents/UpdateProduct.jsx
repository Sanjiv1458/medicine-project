import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, XCircle } from 'react-feather';
import ProductApi from '../../api/productApi';
import toast from 'react-hot-toast';

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: Number,
    category: '',
    type: '',
    tags: [],
    manufacturer: '',
    inventory: {
      quantity: Number,
      inStock: true,
    },
    productImg: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await ProductApi.getProductById(productId);
        setProduct(productData.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      inventory: {
        ...prevProduct.inventory,
        [name]: checked,
      },
    }));
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    handleImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProduct({
        ...product,
        productImg: file,
      });

      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const handleImage = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange({ target: { files: [file] } });
  };

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      inventory: {
        ...prevProduct.inventory,
        quantity: value,
      },
    }));
  };

  const handleUpdateProduct = async () => {
    await toast.promise(ProductApi.updateProduct(productId, product), {
      loading: 'Updating...',
      success: () => {
        navigate('/admin/products');
        return <b>Product updated successfully!</b>;
      },
      error: (error) => <b>Error updating product: {error.message}</b>,
    });
  };

  return (
    <div
      className="container mx-auto px-4 py-8"
      onDrop={handleDrop}
      onDragOver={handleDragOver}>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="number"
              name="price"
              value={product.price === null ? '' : product.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="text"
              name="type"
              value={product.type}
              onChange={handleChange}
              placeholder="Type"
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="text"
              name="manufacturer"
              value={product.manufacturer}
              onChange={handleChange}
              placeholder="Manufacturer"
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="number"
              name="quantity"
              value={product.inventory.quantity === null ? '' : product.inventory.quantity}
              onChange={handleQuantityChange}
              placeholder="Quantity"
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="relative inline-flex items-center cursor-pointer">
              {' '}
              <input
                type="checkbox"
                id="inStock"
                name="inStock"
                checked={product.inventory.inStock}
                onChange={handleCheckboxChange}
                className="sr-only peer"
              />
              <div className={`flex items-center justify-between w-28 h-10 border rounded-full px-2 transition-all duration-300 ${product.inventory.inStock ? 'bg-green-100 border-green-600' : 'bg-red-100 border-red-600 hover:bg-opacity-80'}`}>
                {product.inventory.inStock ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                <span
                  className={`text-sm font-medium ${product.inventory.inStock ? 'text-green-500' : 'text-red-500'}`}
                  style={{ userSelect: 'none' }}>
                  {product.inventory.inStock ? 'In Stock' : 'Out Stock'}
                </span>
              </div>
            </label>
          </div>

          <div className="w-full md:w-full px-4 mb-4">
            <div className="flex flex-col items-center justify-center">
              {product.productImg && !imagePreview && (
                <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={product.productImg}
                    alt="Selected Image"
                    className="w-full h-full object-contain"
                    style={{ maxHeight: '250px' }}
                  />
                </div>
              )}
            </div>
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-blue-500 dark:hover:bg-gray-600">
              {imagePreview && (
                <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-blue-500 dark:text-blue-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-blue-500 dark:text-blue-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="w-full md:w-full px-4 mb-4">
            <button
              onClick={handleUpdateProduct}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
