import { useState } from 'react';
import ProductList from './ProductList';

const ProductSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('');

  // Use your custom arrays for categories and types
  const categoryOptions = ['All', 'ANTI CANCER', 'ANTI HIV', 'PAIN RELIEF', 'SKIN CARE', 'VITAMINS', 'HEART HEALTH', 'DIGESTIVE', "WOMEN'S HEALTH", 'COLD & FLU', 'DIABETES', 'ALLERGY', 'BONE HEALTH', 'EYE CARE', 'SLEEP AID'];
  const typeOptions = ['TABLET', 'INJECTION', 'CAPSULE', 'CREAM', 'SYRUP', 'INSULIN', 'DROPS'];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedType('');
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="md:w-64 text-gray-800 dark:text-white overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Product Categories</h2>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 rounded-md focus:outline-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white">
            {categoryOptions.map((category) => (
              <option
                key={category}
                value={category}>
                {category}
              </option>
            ))}
          </select>

          <h2 className="text-lg font-semibold mb-2 mt-4">Product Types</h2>
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="w-full px-3 py-2 rounded-md focus:outline-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white mt-2">
            {typeOptions.map((type) => (
              <option
                key={type}
                value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-hidden bg-gray-100 dark:bg-gray-800">
        {/* Content Goes Here */}
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Products</h1>
        <ProductList
          selectedCategory={selectedCategory}
          selectedType={selectedType}
        />
      </div>
    </div>
  );
};

export default ProductSidebar;
