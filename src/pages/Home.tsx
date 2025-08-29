import ResponsiveImage from '../components/ResponsiveImage';
import { useState, useEffect, useMemo } from 'react';

// Module-level slides constant (stable reference) — all slides use white text by default
const SLIDES = [
  { src: '/images/background 102.png.jpg', textColor: 'white', priority: true },
  { src: '/images/background 103.png.jpg', textColor: 'white', priority: true },
  { src: '/images/background 104.png.jpg', textColor: 'white', priority: true },
  { src: '/images/background 105.png.jpg', textColor: 'white', priority: true },
  { src: '/images/background 106.png.jpg', textColor: 'white', priority: true },
  { src: '/images/background 107.png.jpg', textColor: 'white', priority: true },
  { src: '/images/sawamiji.JPG', textColor: 'white', priority: false },
];

const Home = () => {
  // Ensure priority slides appear before the others (useMemo to avoid recompute)
  const orderedSlides = useMemo(() => {
    const priority = SLIDES.filter((s) => s.priority === true);
    const rest = SLIDES.filter((s) => !s.priority);
    return [...priority, ...rest];
  }, []);

  // Default text color — will be overridden per-slide when available
  const defaultTextColor = 'white';

  // Slideshow state
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-advance slideshow every 4 seconds
  useEffect(() => {
    if (orderedSlides.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % orderedSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [orderedSlides.length]);

  // Keep activeIndex in-range when slides change
  useEffect(() => {
    if (orderedSlides.length === 0) return;
    setActiveIndex((prev) => prev % orderedSlides.length);
  }, [orderedSlides.length]);

  // Current text color
  // derive current slide and its text color safely
  const currentIndex = orderedSlides.length > 0 ? activeIndex % orderedSlides.length : 0;
  const currentSlide = orderedSlides[currentIndex] || null;
  const textColor = (currentSlide && currentSlide.textColor) || defaultTextColor;

  return (
    <>
      <div
        id="top"
        className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      >
        {/* Background slideshow (absolute, behind content) */}
        <div className="bg-slideshow" aria-hidden="true">
          {orderedSlides.map((slide, i) => (
            <div
              key={i}
              className="bg-slide-item"
              style={{
                backgroundImage: `url('${slide.src}')`,
                opacity: i === activeIndex ? 1 : 0,
                transition: 'opacity 0.8s',
                position: 'absolute',
                inset: 0,
                zIndex: 0,
              }}
            />
          ))}
        </div>
        {/* Overlay to guarantee text contrast. If a slide requests black text we keep the overlay transparent. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            pointerEvents: 'none',
            background: orderedSlides[activeIndex] && orderedSlides[activeIndex].textColor === 'black'
              ? 'transparent'
              : 'linear-gradient(rgba(0,0,0,0.42), rgba(0,0,0,0.42))',
            transition: 'background 300ms ease',
          }}
        />

        <div className="w-full max-w-6xl flex flex-col items-center text-center px-8 py-16 pt-0 relative z-10">
          <h1
            className="font-extrabold leading-tight mb-4 text-3xl sm:text-4xl md:text-[54px]"
            style={{ fontFamily: 'Kantumruy Pro, sans-serif', color: textColor }}
          >
            Experience Asia’s Premier
          </h1>

          <h2
            className="font-extrabold leading-tight mb-4 text-3xl sm:text-4xl md:text-[54px]"
            style={{ fontFamily: 'Kantumruy Pro, sans-serif', color: textColor }}
          >
            Food Industry Exhibition
          </h2>

          {/* Mobile: stack number and tagline; sm+ keep inline row to preserve desktop design */}
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 relative">
            <span
              className="text-[#E41146] font-extrabold mr-0 sm:mr-4 relative inline-block text-xl sm:text-3xl md:text-[54px] whitespace-nowrap sm:whitespace-normal mb-2 sm:mb-0"
              style={{ fontFamily: 'Kantumruy Pro, sans-serif' }}
            >
              15th Edition
              {/* Underline SVG image - hidden on mobile */}
              <img
                src="/images/img_line_1.svg"
                alt="underline"
                className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-[160px] sm:w-[220px] md:w-[270px]"
                style={{
                  bottom: -30,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              />
            </span>

            <span className="text-2xl md:text-3xl lg:text-4xl font-bold" style={{ color: textColor }}>
              - bringing Innovation,
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8" style={{ color: textColor }}>
            Opportunities & Networking
          </h3>

          {/* Event Info + Buttons: centered block */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-6 w-full">
            {/* Date + Location */}
            <div className="flex flex-col gap-6 items-center text-center md:text-left">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-md" style={{ marginLeft: '5px' }}>
                  {/* responsive icon - any image will be sized to 36x36 by the component */}
                  <ResponsiveImage src="/images/calander.png" alt="calendar" size={36} />
                </div>
                <div className="text-left" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}>
                  <div className="font-bold" style={{ color: textColor }}>6–9 February , 2026</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-md" style={{ marginLeft: '20px' }}>
                  <ResponsiveImage src="/images/loc.png" alt="location" size={32} />
                </div>
                <div className="text-left" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}>
                  <div className="font-bold" style={{ color: textColor }}>Vanita Vishram Ground</div>
                  <div style={{ color: textColor }}>Surat, Gujarat</div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 items-center w-full sm:w-auto">
              <button
                className="px-8 py-3 rounded-lg bg-lime-400 text-white font-bold border-2 border-lime-600 shadow-md hover:bg-lime-500 transition-all w-full sm:w-44"
                style={{ boxShadow: '0 6px 12px 0 #b6d43a' }}
                onClick={() => (window.location.href = '/bookstall')}
              >
                Book Now
              </button>

              <button
                className="px-8 py-3 rounded-lg bg-yellow-400 text-white font-bold border-2 border-yellow-600 shadow-md hover:bg-yellow-500 transition-all w-full sm:w-44"
                style={{ boxShadow: '0 6px 12px 0 #f7d13b' }}
                onClick={() => (window.location.href = '/visitor')}
              >
                Visitor Pass
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
