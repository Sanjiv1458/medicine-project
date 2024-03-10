import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserApi from '../../api/userApi';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const SubmitQuery = () => {
  const { queryId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queryData, setQueryData] = useState(null);

  useEffect(() => {
    const fetchQueryData = async () => {
      try {
        const response = await UserApi.getProductQueriesById(queryId);
        setQueryData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQueryData();
  }, [queryId]);

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
      <h2 className="text-3xl font-bold mb-4 text-white">Product Query Submitted Successfully!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">Query ID</label>
          <p className="text-lg text-white">{queryId}</p>
        </div>
        {queryData && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Name</label>
              <p className="text-lg text-white">{queryData.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Contact Number</label>
              <p className="text-lg text-white">{queryData.phoneNumber}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Product Name</label>
              <p className="text-lg text-white">{queryData.product}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Quantity</label>
              <p className="text-lg text-white">{queryData.quantity}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white">Created At</label>
              <p className="text-lg text-white">{queryData.createdAt}</p>
            </div>
            {/* Add more fields as needed */}
          </>
        )}
      </div>
    </div>
  );
};

export default SubmitQuery;
