import { useEffect, useState } from 'react';
import { Trash2, Eye } from 'react-feather';
import AdminApi from '../../api/adminApi';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const ProductQuery = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  const { logout } = useAuth();

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await AdminApi.getAllProductQuery();
        setEnquiries(response);
        setLoading(false);
      } catch (error) {
        logout();
        toast.error('Login Expired, please Login');
      }
    };
    fetchEnquiries();
  }, [logout]);

  const handleDelete = async (enquiryId) => {
    try {
      await AdminApi.deleteEnquiryById(enquiryId);
      setEnquiries((prevEnquiries) => prevEnquiries.filter((enquiry) => enquiry._id !== enquiryId));
    } catch (error) {
      console.error('Error deleting enquiry:', error);
    }
  };

  const handleView = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setModalOpen(true);
  };

  const handleViewed = async (enquiryId, viewed) => {
    try {
      await AdminApi.updateQueryStatus(enquiryId, viewed);
      setEnquiries((prevEnquiries) => prevEnquiries.map((enquiry) => (enquiry._id === enquiryId ? { ...enquiry, viewed } : enquiry)));
    } catch (error) {
      console.error('Error updating view status:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEnquiry(null);
  };

  return (
    <div className="max-w-6xl mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Product Enquiries</h1>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      ) : enquiries.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No enquiries available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-600">
                <th className="py-2 px-3 border-b text-gray-800 dark:text-white">Product Name</th>
                <th className="py-2 px-3 border-b text-gray-800 dark:text-white">Name</th>
                <th className="py-2 px-3 border-b text-gray-800 dark:text-white">Email</th>
                <th className="py-2 px-3 border-b text-gray-800 dark:text-white">Phone Number</th>
                <th className="py-2 px-3 border-b text-gray-800 dark:text-white">Quantity</th>
                <th className="py-2 px-3 border-b text-gray-800 dark:text-white">Received At</th>
                <th className="py-2 px-3 border-b text-gray-800 dark:text-white">Status</th>
                <th className="py-2 px-3 border-b text-gray-800 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr
                  key={enquiry._id}
                  className="hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
                  <td
                    className="py-3 px-3 border-b text-gray-800 dark:text-white"
                    onClick={() => handleView(enquiry)}>
                    {enquiry.product}
                  </td>
                  <td
                    className="py-3 px-3 border-b text-gray-800 dark:text-white"
                    onClick={() => handleView(enquiry)}>
                    {enquiry.name}
                  </td>
                  <td
                    className="py-3 px-3 border-b text-gray-800 dark:text-white"
                    onClick={() => handleView(enquiry)}>
                    {enquiry.email}
                  </td>
                  <td
                    className="py-3 px-3 border-b text-gray-800 dark:text-white"
                    onClick={() => handleView(enquiry)}>
                    {enquiry.phoneNumber}
                  </td>
                  <td
                    className="py-3 px-3 border-b text-gray-800 dark:text-white"
                    onClick={() => handleView(enquiry)}>
                    {enquiry.quantity}
                  </td>
                  <td
                    className="py-3 px-3 border-b text-gray-800 dark:text-white"
                    onClick={() => handleView(enquiry)}>
                    {new Date(enquiry.createdAt).toLocaleString()}
                  </td>
                  <td
                    className="py-3 px-3 border-b text-gray-800 dark:text-white"
                    onClick={() => handleView(enquiry)}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the row click event
                        handleViewed(enquiry._id, !enquiry.viewed);
                      }}
                      className={`text-sm ${enquiry.viewed ? 'text-green-500' : 'text-gray-500'} cursor-pointer flex items-center dark:hover:bg-gray-600`}>
                      <Eye
                        size={16}
                        className="mr-1"
                      />
                      {enquiry.viewed ? 'Solved' : 'Pending'}
                    </button>
                  </td>
                  <td className="py-3 px-3 border-b text-gray-800 dark:text-white">
                    <button
                      onClick={() => handleDelete(enquiry._id)}
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
      {isModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md z-10">
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 cursor-pointer">
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
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">{selectedEnquiry.productName}</h2>
              <p className="text-gray-800 dark:text-white">
                <strong>Name:</strong> {selectedEnquiry.name}
              </p>
              <p className="text-gray-800 dark:text-white">
                <strong>Email:</strong> {selectedEnquiry.email}
              </p>
              <p className="text-gray-800 dark:text-white">
                <strong>Phone Number:</strong> {selectedEnquiry.phoneNumber}
              </p>
              <p className="text-gray-800 dark:text-white">
                <strong>Quantity:</strong> {selectedEnquiry.quantity}
              </p>
              <p className="text-gray-800 dark:text-white">
                <strong>Received At:</strong> {new Date(selectedEnquiry.createdAt).toLocaleString()}
              </p>
              {/* Additional details as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductQuery;
