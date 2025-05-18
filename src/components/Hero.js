import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Hero = () => {
  return (
    <section id="home" className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Your Vedic Birth Chart in Your Pocket</h1>
            <p className="text-xl mb-8">Accurate Kundli calculations and personalized insights in seconds</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="#download" 
                className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 flex items-center justify-center"
              >
                <FontAwesomeIcon icon="download" className="mr-2" /> Download App
              </a>
              <a 
                href="#demo" 
                className="border-2 border-primary text-primary hover:bg-primary/10 font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center"
              >
                <FontAwesomeIcon icon="play-circle" className="mr-2" /> Try Free Demo
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://placehold.co/600x400/e2e8f0/1E88E5?text=KundliCast+App" 
              alt="KundliCast App Screenshot" 
              className="rounded-xl shadow-lg max-w-full mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
