import React from 'react';

function PosterSection() {
  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between max-w-screen-xl mx-auto p-4">
        {/* Pharmaceutical Poster Section */}
        <section className="md:w-1/2 mb-8 md:mb-0 md:mr-4 transition-transform transform hover:scale-105">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Pharmaceutical Poster</h2>
          {/* Add your pharmaceutical poster image or content here */}
          <img
            src="https://via.placeholder.com/800x400"
            alt="Pharmaceutical Poster"
            className="w-full rounded-md shadow-md"
          />
        </section>

        {/* Noteworthy Pharmaceutical Acquisitions Component */}
        <div className="md:w-1/2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 transition-transform transform hover:scale-105">
          <a
            href="#"
            className="hover:underline">
            <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-800 dark:text-white">Noteworthy Pharmaceutical Acquisitions 2021</h5>
          </a>
          <p className="mb-3 text-gray-600 dark:text-gray-400">Explore the significant acquisitions in the pharmaceutical industry during 2021.</p>
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-transform transform hover:scale-105">
            Read more
            <svg
              className="rtl:rotate-180 w-4 h-4 ms-2 transition-transform transform hover:rotate-180"
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
          </a>
        </div>
      </div>
    </div>
  );
}

export default PosterSection;
