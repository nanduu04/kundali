import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center text-primary font-bold text-2xl">
              <FontAwesomeIcon icon="star" className="text-accent mr-2" />
              KundliCast
            </a>
          </div>
          <div className="text-primary text-sm md:text-base font-medium">
            <p>Your Vedic Birth Chart Calculator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
