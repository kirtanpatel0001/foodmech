import React, { useState } from 'react';

const BookStall: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    city: '',
    contactNumber: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Large diagonal background stripes and colored SVGs */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/img_background_square.svg"
          alt="background pattern"
          className="w-[1300px] h-[900px] object-cover opacity-90  left-[-200px] top-[-100px] absolute"
          style={{ left: '105px', top: '0px' }}
        />
        {/* Decorative SVGs for design */}
        
      </div>

      <div className="relative z-10 flex w-full max-w-[1280px] mx-auto py-12 px-4 gap-8">
        {/* Left: Form and headings */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-xl mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold">Connect with us</h2>
              <h3 className="text-2xl font-semibold item">Become Our Sponsor</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <a href="tel:+919898123103" className="flex items-center gap-2 text-lg">
                <span>📞</span>+91 98981 23103
              </a>
              <a href="tel:+919898036959" className="flex items-center gap-2 text-lg">
                <span>📞</span>+91 98980 36959
              </a>
              <a href="tel:+919898072103" className="flex items-center gap-2 text-lg">
                <span>📞</span>+91 98980 72103
              </a>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-gray-300 rounded-md"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-md"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-md"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border border-gray-300 rounded-md"
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
              <button
                type="submit"
                className="w-full bg-green-300 text-black py-3 px-6 rounded-md hover:bg-green-400 transition-colors font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        {/* Right: Poster image */}
        <div className="flex-1 flex items-center justify-center">
          
          <img src="/images/img_food_mech.png" alt="Food Mech Poster" className="w-full max-w-md rounded-lg shadow-lg" />
          <img
          src="/images/img_1_lime_a700.svg"
          alt="lime stripe"
    className="absolute left-[840px] top-[-425px] w-[360px] h-[1400px]"
        />
        <img
          src="/images/img_2_amber_a400.svg"
          alt="amber stripe"
    className="absolute left-[850px] top-[-437px] w-[365px] h-[1400px]"
        />
        <img
          src="/images/img_3_red_a400.svg"  
          alt="red stripe"
    className="absolute left-[856px] top-[-427px] w-[370px] h-[1400px]"
        />
        </div>
      </div>
    </div>
  );
};

export default BookStall;
