
import React, { useState, useEffect, useRef } from 'react';

const exhibitors = [
  // These are example images, replace with actual exhibitor logo filenames as needed
    'public/images/img_img_20250808_wa0041.png',
  'public/images/img_img_20250808_wa0039.png',
  'public/images/img_img_20250808_wa0042.png',
  'public/images/img_img_20250808_wa0044.png',
  'public/images/img_img_20250808_wa0048.png',
  'public/images/img_img_20250808_wa0050.png',
  'public/images/img_img_20250808_wa0059.png',
  'public/images/img_img_20250808_wa0061.png',
  'public/images/img_img_20250808_wa0075.png',
  'public/images/img_img_20250808_wa0076.png',
  'public/images/img_img_20250808_wa0080.png',
  'public/images/img_img_20250808_wa0086.png',
  'public/images/img_img_20250808_wa0098.png',
  'public/images/img_img_20250808_wa0101.png',
  'public/images/img_img_20250808_wa0102.png',
  'public/images/img_img_20250808_wa0103.png',
  'public/images/img_img_20250808_wa0106.png',
  'public/images/img_img_20250808_wa0107.png',
  'public/images/img_img_20250808_wa0113.png',
  'public/images/img_img_20250808_wa0116.png'
];


const PAGE_SIZE = 20; // 5 columns x 4 rows

// Animation classes copied from Sponsors.tsx to match the same look & feel
const slideUpClass = 'transition-all duration-500 ease-out opacity-100 translate-y-0';
const slideUpHiddenClass = 'transition-all duration-500 ease-out opacity-0 translate-y-16';
const getLogoAnimClass = (show: boolean) =>
  `${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'} transition-opacity transition-transform duration-500 ease-out`;

const OurExhibitors: React.FC = () => {
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(exhibitors.length / PAGE_SIZE);
  // animating: prevents rapid repeated navigation; showAnim/logoAnim drive the visual effect
  const [animating, setAnimating] = useState(false);
  const [showAnim, setShowAnim] = useState(false);
  const [logoAnim, setLogoAnim] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Play animation when the section enters viewport (matches Partners.tsx behavior)
    setShowAnim(false);
    setLogoAnim(false);
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      // fallback: play immediately
      const t = window.setTimeout(() => {
        setShowAnim(true);
        window.setTimeout(() => setLogoAnim(true), 120);
      }, 100);
      return () => clearTimeout(t);
    }

    let timeout: number | undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // restart animation: briefly set false then true so CSS/transitions restart
            setShowAnim(false);
            setLogoAnim(false);
            if (timeout) window.clearTimeout(timeout);
            timeout = window.setTimeout(() => {
              setShowAnim(true);
              window.setTimeout(() => setLogoAnim(true), 120);
            }, 50);
          }
        });
      },
      { threshold: 0.3 }
    );

    obs.observe(el);
    return () => {
      if (timeout) window.clearTimeout(timeout);
      obs.disconnect();
    };
  }, []);

  const handleDotClick = (idx: number) => {
    if (idx === page || animating) return;
    setAnimating(true);
    // hide -> change page -> show with stagger
    setShowAnim(false);
    setLogoAnim(false);
    setTimeout(() => {
      setPage(idx);
      // small delay to let DOM update then show with stagger
      setTimeout(() => {
        setShowAnim(true);
        setTimeout(() => setLogoAnim(true), 120);
        setAnimating(false);
      }, 60);
    }, 220);
  };

  const handleArrow = (dir: number) => {
    if (animating) return;
    let next = page + dir;
    if (next < 0) next = 0;
    if (next >= pageCount) next = pageCount - 1;
    if (next === page) return;
    setAnimating(true);
    setShowAnim(false);
    setLogoAnim(false);
    setTimeout(() => {
      setPage(next);
      setTimeout(() => {
        setShowAnim(true);
        setTimeout(() => setLogoAnim(true), 120);
        setAnimating(false);
      }, 60);
    }, 220);
  };

  // Calculate visible exhibitors
  const startIdx = page * PAGE_SIZE;
  const visible = exhibitors.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center bg-white py-0 overflow-x-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/background icons.png')" }}
    >
      {/* Removed decorative shapes */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mt-8 mb-6 z-10">Our Exhibitors</h2>

      <div className="relative z-2 w-full max-w-6xl mx-auto">
        {/* Arrows */}
        {page > 0 && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full w-10 h-10 flex items-center justify-center z-20 hover:bg-gray-100 transition"
            onClick={() => handleArrow(-1)}
            aria-label="Previous"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
        )}
        {page < pageCount - 1 && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full w-10 h-10 flex items-center justify-center z-20 hover:bg-gray-100 transition"
            onClick={() => handleArrow(1)}
            aria-label="Next"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        )}

        {/* Sliding grid */}
        <div className="overflow-hidden">
          <div
            className={`grid grid-cols-5 grid-rows-4 gap-x-2 gap-y-4 place-items-center px-2 md:px-0 ${animating ? 'pointer-events-none' : ''} ` +
            (showAnim ? slideUpClass : slideUpHiddenClass)}
            style={{ position: 'relative', width: '100%' }}
          >
            {visible.map((src, idx) => (
              <div
                key={idx}
                // match Sponsors: rounded container, hover scale + shadow, keep animation
                className={"flex items-center justify-center rounded-lg p-2 md:p-4 aspect-[4/3] " + getLogoAnimClass(logoAnim) + " hover:scale-105 hover:shadow-2xl transform-gpu"}
                style={{ transitionDelay: logoAnim ? `${idx * 90}ms` : '0ms' }}
              >
                <img
                  src={src}
                  alt={`Exhibitor ${startIdx + idx + 1}`}
                  // match Sponsors sizing
                  className="object-contain w-full h-full max-h-30 md:max-h-32"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel dots */}
      <div className="flex items-center justify-center gap-2 mt-8 mb-4 z-10">
        {Array.from({ length: pageCount }).map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${page === idx ? 'bg-purple-500' : 'bg-gray-400'}`}
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to page ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default OurExhibitors;
