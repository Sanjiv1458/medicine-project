import { useState } from 'react';
import { CheckCircle, XCircle } from 'react-feather';
import toast from 'react-hot-toast';
import ProductApi from '../../api/productApi';

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    id: Number,
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

  const categoryOptions = ['ANTI CANCER', 'ANTI HIV', 'PAIN RELIEF', 'SKIN CARE', 'VITAMINS', 'HEART HEALTH', 'DIGESTIVE', "WOMEN'S HEALTH", 'COLD & FLU', 'DIABETES', 'ALLERGY', 'BONE HEALTH', 'EYE CARE', 'SLEEP AID'];
  const typeOptions = ['TABLET', 'INJECTION', 'CAPSULE', 'CREAM', 'SYRUP', 'INSULIN', 'DROPS'];

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewProduct((prevProduct) => ({
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
    handleImage(file);
  };

  const handleImage = (file) => {
    if (file) {
      setNewProduct({
        ...newProduct,
        productImg: file,
      });

      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      inventory: {
        ...prevProduct.inventory,
        quantity: value,
      },
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      category: value,
    }));
  };

  const handleTypeChange = (e) => {
    const { value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      type: value,
    }));
  };

  const handleTagsChange = (e) => {
    const { value } = e.target;
    const tagsArray = value.split(',').map((tag) => tag.trim());
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      tags: tagsArray,
    }));
  };

  const handleCreateProduct = async () => {
    try {
      await ProductApi.createProduct(newProduct);
      setNewProduct({
        id: null,
        name: '',
        description: '',
        price: null,
        category: '',
        type: '',
        tags: [],
        manufacturer: '',
        inventory: {
          quantity: null,
          inStock: true,
        },
        productImg: null,
      });
      toast.success('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
    }
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
              type="number"
              name="id"
              value={newProduct.id === null ? '' : newProduct.id}
              onChange={handleChange}
              placeholder="ID"
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="number"
              name="price"
              value={newProduct.price === null ? '' : newProduct.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <select
              name="category"
              value={newProduct.category}
              onChange={handleCategoryChange}
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option
                value=""
                disabled>
                Select Category
              </option>
              {categoryOptions.map((category) => (
                <option
                  key={category}
                  value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <select
              name="type"
              value={newProduct.type}
              onChange={handleTypeChange}
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option
                value=""
                disabled>
                Select Type
              </option>
              {typeOptions.map((type) => (
                <option
                  key={type}
                  value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="text"
              name="tags"
              value={newProduct.tags.join(', ')} // Joining the array to display tags as a comma-separated string
              onChange={handleTagsChange}
              placeholder="Tags (comma-separated)"
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="text"
              name="manufacturer"
              value={newProduct.manufacturer}
              onChange={handleChange}
              placeholder="Manufacturer"
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <input
              type="number"
              name="quantity"
              value={newProduct.inventory.quantity === null ? '' : newProduct.inventory.quantity}
              onChange={handleQuantityChange}
              placeholder="Quantity"
              className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="inStock"
                name="inStock"
                checked={newProduct.inventory.inStock}
                onChange={handleCheckboxChange}
                className="sr-only peer"
              />
              <div className={`flex items-center justify-between w-28 h-10 border rounded-full px-2 transition-all duration-300 ${newProduct.inventory.inStock ? 'bg-green-100 border-green-600' : 'bg-red-100 border-red-600 hover:bg-opacity-80'}`}>
                {newProduct.inventory.inStock ? <CheckCircle className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
                <span
                  className={`text-sm font-medium ${newProduct.inventory.inStock ? 'text-green-500' : 'text-red-500'}`}
                  style={{ userSelect: 'none' }}>
                  {newProduct.inventory.inStock ? 'In-Stock' : 'Out-Stock'}
                </span>
              </div>
            </label>
          </div>

          <div className="w-full md:w-full px-4 mb-4">
            <div className="flex flex-col items-center justify-center">
              {imagePreview && (
                <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    className="w-full h-full object-contain"
                    style={{ maxHeight: '250px' }} // Adjust the maxHeight as needed
                  />
                </div>
              )}
              <label
                htmlFor="productImg"
                className="flex flex-col items-center justify-center w-full h-64 border-2 hover:border-blue-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-blue-500 dark:hover:bg-gray-600">
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
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input
                  id="productImg"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="w-full md:w-full px-4 mb-4">
            <button
              onClick={handleCreateProduct}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductForm;
