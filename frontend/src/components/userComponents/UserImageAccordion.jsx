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
        <img
          src={avatar}
          alt={fullName}
          className="w-8 h-8 rounded-full object-cover"
        />
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`ml-2 text-gray-700 dark:text-gray-300 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      <div className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-md rounded-md ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex items-center p-2">
          <div className="ml-3">
            <p className="text-gray-800 dark:text-white font-semibold">{fullName}</p>
            {/* You can add other user information if needed */}
          </div>
        </div>
        {/* Profile navigation links */}
        <NavLink
          to="/profile"
          className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800">
          Profile
        </NavLink>
        {/* Add other profile-related navigation links */}
        <button
          onClick={handleLogout}
          className="block px-4 py-2 text-red-600 dark:text-red-500 hover:bg-gray-200 hover:text-red-900 dark:hover:text-red-300"
          disabled={isLoading}>
          {isLoading ? 'Logging Out...' : 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default UserImageAccordion;
