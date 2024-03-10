import React, { useState } from 'react';
import faqData from './product/faqData';

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [accordionState, setAccordionState] = useState({
    stats: true,
    about: false,
    faq: Array(faqData.length).fill(false),
  });

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleAccordionClick = (index) => {
    setAccordionState((prevState) => {
      const newAccordionState = [...prevState.faq];
      newAccordionState[index] = !newAccordionState[index];
      return { ...prevState, faq: newAccordionState };
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stats':
        return (
          <div
            className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
            role="tabpanel"
            aria-labelledby="stats-tab">
            <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">50M+</dt>
                <dd className="text-gray-500 dark:text-gray-400">Patients Served</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">120M+</dt>
                <dd className="text-gray-500 dark:text-gray-400">Prescriptions Fulfilled</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">1500+</dt>
                <dd className="text-gray-500 dark:text-gray-400">Life-Saving Medications</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">1.5M+</dt>
                <dd className="text-gray-500 dark:text-gray-400">Medical Professionals Connected</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">80+</dt>
                <dd className="text-gray-500 dark:text-gray-400">Global Partnerships</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">99.9%</dt>
                <dd className="text-gray-500 dark:text-gray-400">Supply Chain Accuracy</dd>
              </div>
            </dl>
          </div>
        );

      case 'about':
        return (
          <div
            className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
            role="tabpanel"
            aria-labelledby="about-tab">
            <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Innovating Healthcare for a Better Tomorrow</h2>
            <p className="mb-5 text-gray-500 dark:text-gray-400">At PharmaCare, we are on a mission to revolutionize healthcare through cutting-edge solutions and unwavering commitment. Our dedication extends beyond pharmaceuticals to create a healthier, more sustainable world for everyone.</p>
            <ul
              role="list"
              className="space-y-4 text-gray-500 dark:text-gray-400">
              <li className="flex space-x-2 rtl:space-x-reverse items-center">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="leading-tight">Pioneering pharmaceutical research</span>
              </li>
              <li className="flex space-x-2 rtl:space-x-reverse items-center">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="leading-tight">Advancing patient-centric healthcare</span>
              </li>
              <li className="flex space-x-2 rtl:space-x-reverse items-center">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="leading-tight">Ensuring accessibility and affordability</span>
              </li>
              <li className="flex space-x-2 rtl:space-x-reverse items-center">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="leading-tight">Ethical practices and integrity</span>
              </li>
            </ul>
          </div>
        );

      case 'faq':
        return (
          <div
            className="p-4 bg-white rounded-lg dark:bg-gray-800"
            role="tabpanel"
            aria-labelledby="faq-tab">
            <div
              id="accordion-flush"
              data-accordion="collapse"
              data-active-classes="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              data-inactive-classes="text-gray-500 dark:text-gray-400">
              {/* FAQ content goes here */}
              {faqData.map((item, index) => (
                <div key={index}>
                  <h2 id={`accordion-heading-${index}`}>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                      data-accordion-target={`#accordion-body-${index}`}
                      aria-expanded={accordionState.faq[index]}
                      aria-controls={`accordion-body-${index}`}
                      onClick={() => handleAccordionClick(index)}>
                      <span>{item.question}</span>
                      <svg
                        data-accordion-icon
                        className={`w-3 h-3 transition-transform transform ${accordionState.faq[index] ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                    </button>
                  </h2>
                  <div
                    id={`accordion-body-${index}`}
                    className={`${accordionState.faq[index] ? 'block' : 'hidden'} py-5 border-b border-gray-200 dark:border-gray-700`}
                    aria-labelledby={`accordion-heading-${index}`}>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 p-4">
      <div className="sm:hidden">
        <label
          htmlFor="tabs"
          className="sr-only">
          Select tab
        </label>
        <select
          id="tabs"
          className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => handleTabClick(e.target.value)}
          value={activeTab}>
          <option value="stats">Statistics</option>
          <option value="about">Services</option>
          <option value="faq">FAQ</option>
        </select>
      </div>
      <ul
        className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse space-x-4 my-4"
        id="fullWidthTab"
        data-tabs-toggle="#fullWidthTabContent"
        role="tablist">
        <li className="w-full">
          <button
            id="stats-tab"
            data-tabs-target="#stats"
            type="button"
            role="tab"
            aria-controls="stats"
            aria-selected={activeTab === 'stats'}
            className={`inline-block w-full p-4 rounded-ss-lg ${activeTab === 'stats' ? 'bg-teal-500 text-white focus:outline-none' : 'bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600'}`}
            onClick={() => handleTabClick('stats')}>
            Statistics
          </button>
        </li>
        <li className="w-full">
          <button
            id="about-tab"
            data-tabs-target="#about"
            type="button"
            role="tab"
            aria-controls="about"
            aria-selected={activeTab === 'about'}
            className={`inline-block w-full p-4 ${activeTab === 'about' ? 'bg-teal-500 text-white focus:outline-none' : 'bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600'}`}
            onClick={() => handleTabClick('about')}>
            Services
          </button>
        </li>
        <li className="w-full">
          <button
            id="faq-tab"
            data-tabs-target="#faq"
            type="button"
            role="tab"
            aria-controls="faq"
            aria-selected={activeTab === 'faq'}
            className={`inline-block w-full p-4 rounded-se-lg ${activeTab === 'faq' ? 'bg-teal-500 text-white focus:outline-none' : 'bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600'}`}
            onClick={() => handleTabClick('faq')}>
            FAQ
          </button>
        </li>
      </ul>

      <div
        id="fullWidthTabContent"
        className="border-t border-gray-200 dark:border-gray-600">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default FAQSection;
