import React from 'react';

function MissionSection() {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
      <section className="container mx-auto p-8 rounded-md shadow-md dark:from-teal-400 dark:to-blue-400 dark:text-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-6">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-100">
            We are committed to providing cutting-edge anti-cancer solutions that not only meet the highest standards of quality but also contribute to the well-being and hope of patients. Our mission is to make a positive impact on the lives of individuals affected by cancer, ensuring a path
            towards a healthier and brighter future.
          </p>
        </div>
      </section>
    </div>
  );
}

export default MissionSection;
