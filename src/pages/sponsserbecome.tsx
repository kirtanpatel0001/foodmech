import React, { useState } from 'react';

const SponsorBecome: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    city: '',
    contactNumber: '',
    email: '',
    message: ''
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('https://foodmech.onrender.com/api/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({
          fullName: '', businessName: '', city: '', contactNumber: '', email: '', message: ''
        });
      } else {
        const data = await res.json();
        setError(data.error || 'Submission failed');
      }
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      {/* Large diagonal background stripes and colored SVGs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/img_background_square.svg"
          alt="background pattern"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-[1280px] mx-auto py-12 gap-8">
        {/* Left: Form and headings */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-xl mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold">Connect with us</h2>
              <h3 className="text-xl sm:text-2xl font-semibold">Become Our Sponsor</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
              <a href="tel:+919898123103" className="flex items-center gap-2 text-sm sm:text-lg">
                <span>📞</span>+91 98981 23103
              </a>
              <a href="tel:+919898036959" className="flex items-center gap-2 text-sm sm:text-lg">
                <span>📞</span>+91 98980 36959
              </a>
              <a href="tel:+919898072103" className="flex items-center gap-2 text-sm sm:text-lg">
                <span>📞</span>+91 98980 72103
              </a>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {success && <div className="text-green-600 text-center font-semibold">Thank you! Your submission has been received.</div>}
              {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
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
                className="w-full bg-green-300 text-black py-3 px-6 rounded-md hover:bg-green-400 transition-colors font-semibold disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
        {/* Right: Poster image */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <img src="/images/img_food_mech.png" alt="Food Mech Poster" className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default SponsorBecome;
