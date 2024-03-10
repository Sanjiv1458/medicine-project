import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserApi from '../../api/userApi';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const SubmitMessage = () => {
  const { messageId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageData, setMessageData] = useState(null);

  useEffect(() => {
    const fetchMessageData = async () => {
      try {
        const response = await UserApi.getMessageById(messageId);
        setMessageData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessageData();
  }, [messageId]);

  if (loading) {
    return <p className="text-gray-800 dark:text-white">Loading...</p>;
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-8 p-8 bg-red-500 dark:bg-red-800 shadow-md rounded-md mb-8">
        <FaTimesCircle className="text-5xl text-white mb-4 mx-auto" />
        <p className="text-lg text-white">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-green-500 dark:bg-green-800 shadow-md rounded-md mb-8">
      <FaCheckCircle className="text-5xl text-white mb-4 mx-auto" />
      <h2 className="text-3xl font-bold mb-4 text-white">Message Submitted Successfully!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Message ID</label>
          <p className="text-lg text-white">{messageId}</p>
        </div>
        {messageData && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Name</label>
              <p className="text-lg text-white">{messageData.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Contact Number</label>
              <p className="text-lg text-white">{messageData.contactNumber}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Product Name</label>
              <p className="text-lg text-white">{messageData.productName}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Subject</label>
              <p className="text-lg text-white">{messageData.subject}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubmitMessage;
