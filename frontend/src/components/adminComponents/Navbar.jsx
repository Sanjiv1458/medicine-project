import { NavLink } from 'react-router-dom';
import DarkModeSwitcher from '../../utils/DarkModeSwitcher';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 dark:bg-gray-800 shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <button
          onClick={onToggleSidebar} // Call the callback function to toggle the sidebar
          className="text-white hover:text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        <div className="text-2xl font-bold text-white">PharmaCare</div>

        {/* Responsive navigation links */}
        <div className="space-x-4 flex items-center md:space-x-8">
          {/* <NavLink
            to="/admin/home"
            activeclassname="text-purple-300"
            className="text-white hover:text-purple-800">
            Home
          </NavLink>
          <NavLink
            to="/admin/product"
            activeclassname="text-purple-300"
            className="text-white hover:text-purple-800">
            Product
          </NavLink>
          <NavLink
            to="/admin/contact"
            activeclassname="text-purple-300"
            className="text-white hover:text-purple-800">
            Contact
          </NavLink> */}
          <DarkModeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
