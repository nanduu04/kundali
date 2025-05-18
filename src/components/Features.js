import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Features = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Powerful Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover why thousands of users trust KundliCast for their astrological guidance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-lg shadow-md transition transform hover:scale-105">
            <div className="text-accent text-4xl mb-4">
              <FontAwesomeIcon icon="globe" />
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Kundli Generation</h3>
            <p className="text-gray-600">Generate accurate Vedic birth charts in seconds. Our algorithms ensure precision and reliability.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-lg shadow-md transition transform hover:scale-105">
            <div className="text-accent text-4xl mb-4">
              <FontAwesomeIcon icon="moon" />
            </div>
            <h3 className="text-xl font-bold mb-2">Personalized Daily Insights</h3>
            <p className="text-gray-600">Receive custom astrological guidance every day based on your unique birth chart and planetary positions.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-lg shadow-md transition transform hover:scale-105">
            <div className="text-accent text-4xl mb-4">
              <FontAwesomeIcon icon="link" />
            </div>
            <h3 className="text-xl font-bold mb-2">Compatibility Analysis</h3>
            <p className="text-gray-600">Discover how well you match with others through our detailed compatibility reports and insights.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
