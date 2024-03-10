import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import DarkModeSwitcher from '../../utils/DarkModeSwitcher';
import useLogout from '../../hooks/useLogout';
import useAuth from '../../hooks/useAuth';
import UserImageAccordion from './UserImageAccordion';
import './App.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('#home');
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { logout, isLoading } = useLogout();
  const { state } = useAuth();
  const isAuthenticated = state.isAuthenticated;

  const handleNavLinkClick = (href) => {
    setActiveLink(href);
    setIsNavOpen(false);
  };

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navItems = [
    { href: 'user/home', text: 'Home' },
    { href: 'user/product', text: 'Product' },
    { href: 'user/company', text: 'Company' },
    { href: 'user/contact', text: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setShowStickyNav(offset > 95);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <nav className={`bg-white border-gray-200 dark:bg-gray-900 ${showStickyNav ? 'sticky-nav' : ''}`}>
        <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
          <NavLink
            to="/"
            className={`flex items-center space-x-3 rtl:space-x-reverse 
              hover:bg-white hover:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-gray-900 ${activeLink === 'home' ? 'active-link' : ''}`}>
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </NavLink>
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={`/${item.href}`}
                activeclassname="bg-teal-500 dark:bg-teal-500 hover:bg-teal-500"
                className={`block px-3 py-2 rounded-md text-gray-900 dark:text-white hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-300`}>
                {item.text}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <DarkModeSwitcher />
            {isAuthenticated ? (
              <>
                <UserImageAccordion user={state.user} /> {/* Wrap both components in a fragment */}
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm text-blue-600 dark:text-blue-500 hover:underline 
                hover:bg-white hover:text-blue-900 dark:hover:text-blue-300 dark:hover:bg-gray-900">
                Login
              </Link>
            )}
          </div>
          {/* Toggle icon for mobile view */}
          <button
            onClick={handleToggleNav}
            className={`md:hidden p-2 focus:outline-none ${isNavOpen ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
            {isNavOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
          </button>
        </div>
        {/* Mobile navigation view */}
        <div className={`md:hidden bg-gray-50 dark:bg-gray-900 p-4 ${isNavOpen ? '' : 'hidden'}`}>
          <div className="max-w-screen-sm mx-auto">
            <ul className="flex flex-col font-medium mt-0 space-y-4 text-sm">
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={`/${item.href}`}
                    onClick={() => handleNavLinkClick(item.href)}
                    activeclassname="bg-teal-500 dark:bg-teal-500 hover:bg-teal-500"
                    className={`block px-3 py-2 rounded-md text-gray-900 dark:text-white hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-300`}>
                    {item.text}
                  </NavLink>
                </li>
              ))}
              {/* Additional Logout Option in Mobile View */}
              {isAuthenticated && (
                <li>
                  <button
                    onClick={logout}
                    className="block px-3 py-2 rounded-md text-red-600 dark:text-red-500 hover:bg-gray-200 hover:text-red-900 dark:hover:text-red-300"
                    disabled={isLoading} // Disable the button while logout is in progress
                  >
                    {isLoading ? 'Logging Out...' : 'Logout'}
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
