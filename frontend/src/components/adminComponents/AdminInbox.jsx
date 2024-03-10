import { useEffect, useState } from 'react';
import { Trash2, Eye } from 'react-feather';
import AdminApi from '../../api/adminApi';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const AdminInbox = () => {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const { logout } = useAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await AdminApi.getAllMessages();
        setMessages(response);
        setLoading(false);
      } catch (error) {
        logout();
        toast.error('Login Expired, please Login');
      }
    };
    fetchMessages();
  }, [logout]);

  const handleDelete = async (messageId) => {
    try {
      await AdminApi.deleteMessageById(messageId);
      setMessages((prevMessages) => prevMessages.filter((message) => message._id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleView = (message) => {
    setSelectedMessage(message);
    setModalOpen(true);
  };

  const handleViewed = async (messageId, viewed) => {
    try {
      await AdminApi.updateMessageStatus(messageId, viewed);
      setMessages((prevMessages) => prevMessages.map((message) => (message._id === messageId ? { ...message, viewed } : message)));
    } catch (error) {
      console.error('Error updating view status:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMessage(null);
  };

  return (
    <div className="max-w-6xl mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Message Queries</h1>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No messages available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-600">
                <th className="py-2 px-3 border-b text-gray-800 dark:text-white">Name</th>
                <th className="py-2 px-3 border-b text-gray-800 dark:text-white">Contact Number</th>
                <th className="py-2 px-3 border-b text-gray-800 dark:text-white">Product Name</th>
                <th className="py-2 px-3 border-b text-gray-800 dark:text-white">Subject</th>
                <th className="py-2 px-3 border-b text-gray-800 dark:text-white">Received At</th>
                <th className="py-2 px-3 border-b text-gray-800 dark:text-white">Status</th>
                <th className="py-2 px-3 border-b text-gray-800 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr
                  key={message._id}
                  className="hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
                  <td
                    className="py-3 px-3 border-b text-gray-800 dark:text-white"
                    onClick={() => handleView(message)}>
                    {message.name}
                  </td>
                  <td
                    className="py-3 px-3 border-b text-gray-800 dark:text-white"
                    onClick={() => handleView(message)}>
                    {message.contactNumber}
                  </td>
                  <td
                    className="py-3 px-3 border-b text-gray-800 dark:text-white"
                    onClick={() => handleView(message)}>
                    {message.productName}
                  </td>
                  <td
                    className="py-3 px-3 border-b text-gray-800 dark:text-white"
                    onClick={() => handleView(message)}>
                    {message.subject}
                  </td>
                  <td
                    className="py-3 px-3 border-b text-gray-800 dark:text-white"
                    onClick={() => handleView(message)}>
                    {new Date(message.createdAt).toLocaleString()}
                  </td>
                  <td
                    className="py-3 px-3 border-b text-gray-800 dark:text-white"
                    onClick={() => handleView(message)}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewed(message._id, !message.viewed);
                      }}
                      className={`text-sm ${message.viewed ? 'text-green-500' : 'text-gray-500'} cursor-pointer flex items-center`}>
                      <Eye
                        size={16}
                        className="mr-1"
                      />
                      {message.viewed ? 'Solved' : 'Pending'}
                    </button>
                  </td>
                  <td className="py-3 px-3 border-b text-gray-800 dark:text-white">
                    <button
                      onClick={() => handleDelete(message._id)}
                      className="text-sm text-red-500 cursor-pointer flex items-center dark:hover:bg-gray-600">
                      <Trash2
                        size={16}
                        className="mr-1"
                      />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md z-10">
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 cursor-pointer">
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
                    d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">{selectedMessage.productName}</h2>
              <p className="text-gray-800 dark:text-white">
                <strong>Name:</strong> {selectedMessage.name}
              </p>
              <p className="text-gray-800 dark:text-white">
                <strong>Contact Number:</strong> {selectedMessage.contactNumber}
              </p>
              <p className="text-gray-800 dark:text-white">
                <strong>Product Name:</strong> {selectedMessage.productName}
              </p>
              <p className="text-gray-800 dark:text-white">
                <strong>Subject:</strong> {selectedMessage.subject}
              </p>
              <p className="text-gray-800 dark:text-white">
                <strong>Received At:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}
              </p>
              {/* Additional details as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInbox;
