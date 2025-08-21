
import React, { useState } from 'react';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact Us form submitted', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative bg-gray-100">
      {/* Hero using privacy policy image */}
      <div className="w-full">
        <div
          className="w-full h-48 md:h-64 lg:h-72 bg-center bg-cover flex items-center justify-center"
          style={{ backgroundImage: `url('/privacy policy1.png')` }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">Contact Us</h1>
        </div>
      </div>

      <div className="relative z-10 flex w-full justify-center pt-12 pb-8">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <img
            src="/images/img_background_square.svg"
            alt="background pattern"
            className="w-[1200px] h-[519px] object-cover opacity-90 left-[-200px] top-[-100px] absolute"
            style={{ left: '105px', top: '0px' }}
          />
        </div>

        <div className="relative z-20 w-full max-w-xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold">Get in touch with our team</h2>
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

            <textarea
              name="message"
              placeholder="Write Message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 bg-white border border-gray-300 rounded-md"
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
      </div>
    </div>
  );
};

export default ContactUs;

