
import React, { useState } from 'react';

const Visitor: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    visitorType: 'B2B',
    mobile: '',
    email: '',
    businessCategory: '',
    numberOfPerson: ''
  });
  const [showPersons, setShowPersons] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Visitor Pass form submitted', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle visitorType change for fade effect
  const handleVisitorTypeChange = (type: string) => {
    setFormData(prev => ({ ...prev, visitorType: type }));
    if (type === 'B2C') {
      setShowPersons(true);
    } else {
      setShowPersons(false);
    }
  };

  return (
    <div className="relative bg-gray-100">
      {/* Top hero with image */}
      <div className="w-full">
        <div
          className="w-full h-48 md:h-64 lg:h-72 bg-center bg-cover flex items-center justify-center"
          style={{ backgroundImage: `url('/images/visitor\ pass\.png')` }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">Visitor Pass</h1>
        </div>
      </div>

  {/* main content area - centered and smaller */}
  <div className="relative z-10 flex w-full justify-center pt-12 pb-8">
        {/* background pattern behind the form */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <img
            src="/images/img_background_square.svg"
            alt="background pattern"
            className="w-[1200px] h-[478px] object-cover opacity-90 left-[-200px] top-[-100px] absolute"
            style={{ left: '105px', top: '0px' }}
          />
        </div>
  <div className="relative z-20 w-full max-w-xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold">Generate Visitor Pass</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full h-10 md:h-12 px-3 bg-white border border-gray-300 rounded-md placeholder-gray-500 text-center"
            />

            <div className="flex items-center justify-center gap-8">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visitorType"
                  value="B2B"
                  checked={formData.visitorType === 'B2B'}
                  onChange={() => handleVisitorTypeChange('B2B')}
                  className="accent-green-500"
                />
                B2B
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visitorType"
                  value="B2C"
                  checked={formData.visitorType === 'B2C'}
                  onChange={() => handleVisitorTypeChange('B2C')}
                  className="accent-green-500"
                />
                B2C
              </label>
            </div>

            {/* Fade in/out number of person input for B2C */}
            <div
              className={`transition-opacity duration-500 ${showPersons ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
              style={{ marginBottom: showPersons ? '1rem' : '0', pointerEvents: showPersons ? 'auto' : 'none' }}
            >
              <input
                type="number"
                name="numberOfPerson"
                min="1"
                placeholder="Number of Person"
                value={formData.numberOfPerson}
                onChange={handleChange}
                className="w-full h-10 md:h-12 px-3 bg-white border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full h-10 md:h-12 px-3 bg-white border border-gray-300 rounded-md"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-10 md:h-12 px-3 bg-white border border-gray-300 rounded-md"
              />
            </div>

            <input
              type="text"
              name="businessCategory"
              placeholder="Business Category"
              value={formData.businessCategory}
              onChange={handleChange}
              className="w-full h-10 md:h-12 px-3 bg-white border border-gray-300 rounded-md"
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-3/4 md:w-1/2 bg-green-300 text-black py-2 md:py-3 rounded-md hover:bg-green-400 transition-colors font-semibold"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* decorative stripes positioned behind the form */}
        <div className="pointer-events-none hidden md:block">
          
        </div>
      </div>
    </div>
  );
};

export default Visitor;

