import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './ScrollAnimation.css';

const ScrollAnimation = ({ children }) => {
  const [isAosInitialized, setIsAosInitialized] = useState(false);

  useEffect(() => {
    if (!isAosInitialized) {
      AOS.init({ duration: 2000 });
      setIsAosInitialized(true);
    }
  }, [isAosInitialized]);

  return (
    <div className="scroll-animation">
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="animation"
          data-aos="fade-up">
          {child}
        </div>
      ))}
    </div>
  );
};

export default ScrollAnimation;
