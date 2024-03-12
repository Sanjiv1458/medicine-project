// Header.jsx
import { useState, useEffect, useRef } from 'react';
import './App.css'; // Import the CSS file for styling

const Header = () => {
  const [notification, setNotification] = useState('Welcome to PharmaCare');
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const scrollingRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      if (offset > 50) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const generateRandomNotification = () => {
    const notifications = [
      '🎉 New Product Arrivals!',
      '🌿 Health Tips of the Day',
      '💰 Special Discounts Today',
      "🔔 Don't forget to check our promotions!",
      '🚀 Stay healthy and vibrant!',
      '🍏 An apple a day keeps the doctor away!',
      '💊 Explore our latest wellness products.',
      '👨‍⚕️ Your health is our top priority!',
      'Check out our latest features!',
      '🌈 Embrace a colorful and healthy life!',
      '👩‍⚕️ Expert advice for your well-being!',
      '🌟 Discover the secret to vitality!',
    ];
    const randomIndex = Math.floor(Math.random() * notifications.length);
    return notifications[randomIndex];
  };

  const handleAnimationIteration = () => {
    // Update the notification after each iteration of the scrolling animation
    setNotification(generateRandomNotification());
  };

  return (
    <header className={`bg-gradient-to-r from-teal-500 to-indigo-500 text-white p-4 ${showStickyHeader ? 'sticky-nav' : ''}`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            alt="PharmaCare Logo"
            className="h-12 mr-4"
          />
          <div>
            <h1 className="text-4xl font-bold">PharmaCare</h1>
            <p className="text-sm">Your Health, Our Priority</p>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className="mt-2 text-sm notification-container"
            onAnimationIteration={handleAnimationIteration}>
            <div
              className="scrolling-notification"
              ref={scrollingRef}>
              <span>{notification}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
