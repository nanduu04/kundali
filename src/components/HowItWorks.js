import React from 'react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-secondary/10 to-primary/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Three simple steps to unlock your astrological insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-primary text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Enter Birth Details</h3>
            <p className="text-gray-600">Provide your date, time, and place of birth for accurate calculations.</p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-primary text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Our Algorithm Calculates Your Kundli</h3>
            <p className="text-gray-600">Advanced celestial algorithms map your unique astrological profile.</p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-primary text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Get Personalized Insights</h3>
            <p className="text-gray-600">Receive detailed readings and guidance tailored specifically to you.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
