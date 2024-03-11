import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';

const UserImageAccordion = ({ user }) => {
  const { fullName, avatar } = user;
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isLoading } = useLogout();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // You can add any additional logic for logout here
    logout();
  };

  return (
    <div className="relative">
      <button
        className="flex items-center focus:outline-none"
        onClick={toggleAccordion}>
        <div className="relative w-10 h-10 overflow-hidden rounded-full">
          <img
            src={avatar}
            alt={fullName}
            className="w-full h-full object-cover"
          />
        </div>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`ml-2 text-gray-700 dark:text-gray-300 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-md rounded-md overflow-hidden ${isOpen ? 'block opacity-100' : 'hidden opacity-0'} transition-all duration-300`}>
        <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="ml-3">
            <p className="text-gray-800 dark:text-white font-semibold">{fullName}</p>
            {/* You can add other user information if needed */}
          </div>
        </div>
        {/* Profile navigation links */}
        <NavLink
          to="/profile"
          className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
          Profile
        </NavLink>
        {/* Add other profile-related navigation links */}
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-red-800 dark:text-red-800 hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-500"
          disabled={isLoading}>
          {isLoading ? 'Logging Out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default UserImageAccordion;
