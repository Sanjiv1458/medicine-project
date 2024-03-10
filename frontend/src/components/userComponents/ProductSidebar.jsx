import { useState } from 'react';
import ProductList from './ProductList';
import { TagIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

const ProductSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('');
  const [isCategoryCollapsed, setIsCategoryCollapsed] = useState(false);
  const [isTypeCollapsed, setIsTypeCollapsed] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedType('');
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const toggleCategoryCollapse = () => {
    setIsCategoryCollapsed(!isCategoryCollapsed);
  };

  const toggleTypeCollapse = () => {
    setIsTypeCollapsed(!isTypeCollapsed);
  };

  // Use your custom arrays for categories and types
  const categoryOptions = ['ANTI CANCER', 'ANTI HIV', 'PAIN RELIEF', 'SKIN CARE', 'VITAMINS', 'HEART HEALTH', 'DIGESTIVE', "WOMEN'S HEALTH", 'COLD & FLU', 'DIABETES', 'ALLERGY', 'BONE HEALTH', 'EYE CARE', 'SLEEP AID'];
  const typeOptions = ['TABLET', 'INJECTION', 'CAPSULE', 'CREAM', 'SYRUP', 'INSULIN', 'DROPS'];

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="md:w-64 text-gray-800 dark:text-white overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600">
          <div className="p-4">
            <h2
              className="text-xl font-semibold mb-2 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded transition duration-300"
              onClick={toggleCategoryCollapse}>
              <TagIcon className="w-6 h-6 mr-2 text-gray-500 dark:text-gray-300" />
              Product Categories
              <ChevronDownIcon className={`w-5 h-5 ml-auto transition-transform transform ${isCategoryCollapsed ? 'rotate-0' : 'rotate-180'}`} />
            </h2>
            <ul className={`mb-4 ${isCategoryCollapsed ? 'hidden' : ''}`}>
              {categoryOptions.map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedCategory === category ? 'bg-gray-100 dark:bg-gray-600 text-blue-500 dark:text-blue-300 font-bold' : 'text-gray-800 dark:text-white'}`}
                  onClick={() => handleCategoryChange(category)}>
                  {category}
                </li>
              ))}
            </ul>

            <h2
              className="text-xl font-semibold mb-2 flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded transition duration-300"
              onClick={toggleTypeCollapse}>
              <TagIcon className="w-6 h-6 mr-2 text-gray-500 dark:text-gray-300" />
              Product Types
              <ChevronDownIcon className={`w-5 h-5 ml-auto transition-transform transform ${isTypeCollapsed ? 'rotate-0' : 'rotate-180'}`} />
            </h2>
            <ul className={`${isTypeCollapsed ? 'hidden' : ''}`}>
              {typeOptions.map((type) => (
                <li
                  key={type}
                  className={`cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedType === type ? 'bg-gray-100 dark:bg-gray-600 text-blue-500 dark:text-blue-300 font-bold' : 'text-gray-800 dark:text-white'}`}
                  onClick={() => handleTypeChange(type)}>
                  {type}
                </li>
              ))}
            </ul>
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
    </>
  );
};

export default ProductSidebar;
