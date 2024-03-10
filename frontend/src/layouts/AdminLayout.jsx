// Layout.jsx
import { useState } from 'react';
import Navbar from '../components/adminComponents/Navbar';
import Sidebar from '../components/adminComponents/Sidebar';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Content area */}
      <div className="flex flex-col flex-1 w-full">
        {/* Navbar */}
        <Navbar onToggleSidebar={toggleSidebar} />

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 my-6">
            {/* Render the children components */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
