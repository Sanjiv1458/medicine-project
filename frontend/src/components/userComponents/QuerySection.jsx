import { useState } from 'react';
import UserApi from '../../api/userApi';
import useAuth from '../../hooks/useAuth';
import ToastUtility from '../../utils/ToastUtility';
import toast from 'react-hot-toast';

function QuerySection() {
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    productName: '',
    subject: '',
  });

  const { state } = useAuth();
  const userId = state.user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UserApi.submitUserMessage(userId, formData);

      if (response.success) {
        const messageId = response.data._id;
        const path = `/user/message/${messageId}`;
        ToastUtility('Query submitted successfully', path);
        setFormData({
          name: '',
          contactNumber: '',
          productName: '',
          subject: '',
        });
      } else {
        toast.error('Error submitting enquiry');
      }
    } catch (error) {
      console.error('Error submitting query:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="dark:bg-gray-900 bg-gray-100 p-8">
      <section className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8 rounded-md shadow-md dark:border-gray-600">
        {/* Query Form */}
        <div className="p-6 dark:bg-gray-800 dark:text-white bg-white rounded-md dark:border-gray-600">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Get In Touch</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-3 w-full border rounded-md text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium">
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="mt-1 p-3 w-full border rounded-md text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Your Contact Number"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="productName"
                className="block text-sm font-medium">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                value={formData.productName}
                onChange={handleChange}
                className="mt-1 p-3 w-full border rounded-md text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="Product Name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium">
                Subject
              </label>
              <textarea
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 p-3 w-full border rounded-md text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                rows="3"
                placeholder="Your Message"></textarea>
            </div>
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300">
              Submit Query
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div className="min-h-[300px]">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Location</h2>
          <div className="aspect-w-1 aspect-h-1 dark:bg-gray-700">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3437.174971800024!2d76.65720287552563!3d30.516091096070614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc32344a6e2d7%3A0x81b346dee91799ca!2sChitkara%20University!5e0!3m2!1sen!2sin!4v1700728504781!5m2!1sen!2sin"
              width="600"
              height="600"
              style={{ border: 0 }}
              allowFullScreen></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

export default QuerySection;
