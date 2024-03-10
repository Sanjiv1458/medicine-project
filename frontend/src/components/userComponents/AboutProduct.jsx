import { CheckCircleIcon } from '@heroicons/react/24/solid';

function AboutProduct() {
  return (
    <div>
      <section className="p-8 bg-gray-100 dark:bg-gray-800 shadow-md">
        <div className="container mx-auto p-4">
          <h2 className="text-3xl font-bold mb-4 text-teal-600 dark:text-teal-400">Explore Our Innovative Pharmaceutical Solution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <img
                src="https://via.placeholder.com/400x300"
                alt="Product Image"
                className="w-full h-auto rounded-lg transition transform hover:scale-105 duration-300 ease-in-out"
              />
            </div>
            <div>
              <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
                Embark on a journey with our groundbreaking pharmaceutical solution that combines cutting-edge technology with a commitment to improving lives. Our product is meticulously designed to address the unique needs of patients, ensuring optimal results and patient well-being.
              </p>
              <ul className="list-disc list-inside mt-4 text-gray-700 dark:text-gray-400">
                <li className="flex items-center mb-2 transition transform hover:translate-x-2 duration-300 ease-in-out">
                  <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
                  Incorporates high-quality, clinically-tested materials
                </li>
                <li className="flex items-center mb-2 transition transform hover:translate-x-2 duration-300 ease-in-out">
                  <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
                  Utilizes advanced and innovative medical technology
                </li>
                <li className="flex items-center mb-2 transition transform hover:translate-x-2 duration-300 ease-in-out">
                  <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
                  Demonstrates exceptional performance in diverse healthcare scenarios
                </li>
                <li className="flex items-center mb-2 transition transform hover:translate-x-2 duration-300 ease-in-out">
                  <CheckCircleIcon className="w-5 h-5 mr-2 text-green-500" />
                  Boasts a unique and patient-centric design for maximum impact
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutProduct;
