import React from 'react';

function BrandingSection() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      {/* Branding Section */}
      <section className="container mx-auto p-8 rounded-md shadow-md">
        <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">About PharmaCare</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600 transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-3 text-blue-500 dark:text-white">Our Mission</h3>
            <p className="text-gray-700 dark:text-gray-400">At PharmaCare, we are dedicated to providing high-quality pharmaceuticals to improve and save lives. Our mission is to make healthcare accessible and affordable for everyone.</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mt-4 text-blue-500 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          {/* Values */}
          <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600 transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-3 text-blue-500 dark:text-white">Values</h3>
            <p className="text-gray-700 dark:text-gray-400">Our values revolve around integrity, innovation, and a commitment to excellence. We strive to set industry standards in quality and ethical practices.</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mt-4 text-blue-500 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          {/* Vision */}
          <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600 transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-3 text-blue-500 dark:text-white">Vision</h3>
            <p className="text-gray-700 dark:text-gray-400">Our vision is to be a global leader in pharmaceuticals, pioneering breakthroughs in medical science and positively impacting the well-being of communities worldwide.</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mt-4 text-blue-500 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BrandingSection;
