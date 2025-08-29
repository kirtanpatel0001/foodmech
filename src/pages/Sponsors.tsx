import React from "react";


const sponsorData = {
  all: [
    "/images/img_img_20250808_wa0041.png",
    "/images/img_img_20250808_wa0039.png",
    "/images/img_img_20250808_wa0042.png",
    "/images/img_img_20250808_wa0044.png",
    "/images/img_img_20250808_wa0048.png",
    "/images/img_img_20250808_wa0050.png",
    "/images/img_img_20250808_wa0059.png",
    "/images/img_img_20250808_wa0061.png",
    "/images/img_img_20250808_wa0075.png",
    "/images/img_img_20250808_wa0076.png",
    "/images/img_img_20250808_wa0080.png",
    "/images/img_img_20250808_wa0086.png",
    "/images/img_img_20250808_wa0098.png",
    "/images/img_img_20250808_wa0101.png",
    "/images/img_img_20250808_wa0102.png",
    "/images/img_img_20250808_wa0103.png",
    "/images/img_img_20250808_wa0106.png",
    "/images/img_img_20250808_wa0107.png",
    "/images/img_img_20250808_wa0113.png",
    "/images/img_img_20250808_wa0116.png"
  ],
  title: [
    "/images/img_img_20250808_wa0041.png",
    "/images/img_img_20250808_wa0039.png"
  ],
  main: [
    "/images/img_img_20250808_wa0042.png",
    "/images/img_img_20250808_wa0044.png"
  ]
};


import { useState, useEffect } from "react";


// Add a slide-down animation class

// Animation for the grid
const slideUpClass =
  'transition-all duration-500 ease-out opacity-100 translate-y-0';
const slideUpHiddenClass =
  'transition-all duration-500 ease-out opacity-0 translate-y-32';

// Animation for each logo (staggered). We use inline transitionDelay for the stagger.
const getLogoAnimClass = (show: boolean) =>
  `${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'} transition-opacity transition-transform duration-500 ease-out`;

const Sponsors: React.FC = () => {

  const [category, setCategory] = useState<'all' | 'title' | 'main'>('all');
  const [showAnim, setShowAnim] = useState(false);
  const [logoAnim, setLogoAnim] = useState(false);

  const handleCategory = (cat: 'all' | 'title' | 'main') => {
    if (cat === category) return;
    setShowAnim(false);
    setLogoAnim(false);
    setTimeout(() => {
      setCategory(cat);
      setShowAnim(true);
      setTimeout(() => setLogoAnim(true), 100);
    }, 50);
  };

  useEffect(() => {
    if (category === 'title' || category === 'main' || category === 'all') {
      setShowAnim(true);
      setTimeout(() => setLogoAnim(true), 100);
    } else {
      setShowAnim(false);
      setLogoAnim(false);
    }
  }, [category]);

  const logos = sponsorData[category];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center bg-cover bg-center px-4 sm:px-6 md:px-8 py-6"
      style={{ backgroundImage: "url('/images/background\ icons\.png')" }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-center mt-2 mb-4">Our Sponsors</h1>
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        <button
          className={`px-4 sm:px-6 py-2 rounded-xl font-semibold focus:outline-none ${category === 'all' ? 'bg-[#E04B4D] text-white shadow border-2 border-black' : 'bg-transparent text-black transition-all'}`}
          onClick={() => handleCategory('all')}
        >
          All Sponsor
        </button>
        <button
          className={`px-4 sm:px-6 py-2 rounded-xl font-semibold focus:outline-none ${category === 'title' ? 'bg-[#E04B4D] text-white shadow border-2 border-black' : 'bg-transparent text-black transition-all'}`}
          onClick={() => handleCategory('title')}
        >
          Title Sponsor
        </button>
        <button
          className={`px-4 sm:px-6 py-2 rounded-xl font-semibold focus:outline-none ${category === 'main' ? 'bg-[#E04B4D] text-white shadow border-2 border-black' : 'bg-transparent text-black transition-all'}`}
          onClick={() => handleCategory('main')}
        >
          Main Sponsor
        </button>
      </div>
      <div
        className={
          `w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-center justify-center ` +
          ((category === 'title' || category === 'main' || category === 'all')
            ? (showAnim ? slideUpClass : slideUpHiddenClass)
            : '')
        }
      >
        {logos.map((src, idx) => (
          <div
            key={idx}
            className={
              `flex items-center justify-center rounded-lg p-2 sm:p-3 md:p-4 aspect-[4/3] ` +
              getLogoAnimClass(logoAnim) +
              ` hover:scale-105 hover:shadow-2xl transform-gpu`
            }
            style={{ transitionDelay: logoAnim ? `${idx * 90}ms` : '0ms' }}
          >
            <img
              src={src}
              alt={`Sponsor ${idx + 1}`}
              className="object-contain w-full h-full max-h-24 sm:max-h-28 md:max-h-32"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;

