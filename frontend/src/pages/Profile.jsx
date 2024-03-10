// Profile.jsx
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { state } = useAuth();
  const user = state.user;

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700 rounded-md shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-6">Your Profile</h2>
        <div className="flex items-center mb-6">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-20 h-20 rounded-full object-cover mr-4 shadow-lg"
          />
          <div>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">{user.fullName}</p>
            <p className="text-gray-600 dark:text-gray-300 text-md">Role: {user.role}</p>
          </div>
        </div>
        <hr className="my-4 border-t border-gray-300 dark:border-gray-700" />
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Additional Details</p>
          {/* Add more profile details or components as needed */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <span className="w-6 h-6 mr-2">{/* You can use icons here */}</span>
              <p className="text-gray-600 dark:text-gray-300">Your Detail 1</p>
            </div>
            <div className="flex items-center">
              <span className="w-6 h-6 mr-2">{/* You can use icons here */}</span>
              <p className="text-gray-600 dark:text-gray-300">Your Detail 2</p>
            </div>
            {/* Add more details as needed */}
          </div>
        </div>
        <button
          className="w-full py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300"
          // Add an onClick handler if needed
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;