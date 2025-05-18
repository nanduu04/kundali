import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Trusted by thousands for accurate astrological guidance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex text-accent mb-4">
              <FontAwesomeIcon icon="star" />
              <FontAwesomeIcon icon="star" />
              <FontAwesomeIcon icon="star" />
              <FontAwesomeIcon icon="star" />
              <FontAwesomeIcon icon="star" />
            </div>
            <p className="text-gray-600 mb-4">"KundliCast has transformed how I understand my life's path. The predictions are incredibly accurate, and the daily insights help me navigate each day with confidence."</p>
            <div className="font-bold">Priya S.</div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex text-accent mb-4">
              <FontAwesomeIcon icon="star" />
              <FontAwesomeIcon icon="star" />
              <FontAwesomeIcon icon="star" />
              <FontAwesomeIcon icon="star" />
              <FontAwesomeIcon icon="star-half-alt" />
            </div>
            <p className="text-gray-600 mb-4">"I was skeptical at first, but the compatibility analysis was eye-opening. It helped me understand my relationship dynamics in a whole new light."</p>
            <div className="font-bold">Rahul M.</div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex text-accent mb-4">
              <FontAwesomeIcon icon="star" />
              <FontAwesomeIcon icon="star" />
              <FontAwesomeIcon icon="star" />
              <FontAwesomeIcon icon="star" />
              <FontAwesomeIcon icon="star" />
            </div>
            <p className="text-gray-600 mb-4">"The level of detail in my birth chart analysis was impressive. The app is intuitive and provides insights that other astrology apps simply don't offer."</p>
            <div className="font-bold">Amit K.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
