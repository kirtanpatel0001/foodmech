
import React, { useEffect, useState, useRef } from 'react';

const exhibitors = [
  '/images/img_img_20250808_wa0041.png',
  '/images/img_img_20250808_wa0039.png',
  '/images/img_img_20250808_wa0042.png',
  '/images/img_img_20250808_wa0044.png',
  '/images/img_img_20250808_wa0048.png',
  '/images/img_img_20250808_wa0050.png',
  '/images/img_img_20250808_wa0059.png',
  '/images/img_img_20250808_wa0061.png',
  '/images/img_img_20250808_wa0075.png',
  '/images/img_img_20250808_wa0076.png',
  '/images/img_img_20250808_wa0080.png',
  '/images/img_img_20250808_wa0086.png',
  '/images/img_img_20250808_wa0098.png',
  '/images/img_img_20250808_wa0101.png',
  '/images/img_img_20250808_wa0102.png',
  '/images/img_img_20250808_wa0103.png',
  '/images/img_img_20250808_wa0106.png',
  '/images/img_img_20250808_wa0107.png',
  '/images/img_img_20250808_wa0113.png',
  '/images/img_img_20250808_wa0116.png'
];

const OurExhibitors: React.FC = () => {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShow(false);
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      const t = window.setTimeout(() => setShow(true), 120);
      return () => clearTimeout(t);
    }

    let timeout: number | undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShow(false);
            if (timeout) window.clearTimeout(timeout);
            timeout = window.setTimeout(() => setShow(true), 50);
          }
        });
      },
      { threshold: 0.35 }
    );

    obs.observe(el);
    return () => {
      if (timeout) window.clearTimeout(timeout);
      obs.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center py-16 w-full mx-auto overflow-hidden bg-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-10">Our Exhibitors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4">
        {exhibitors.map((src, i) => (
          <div
            key={i}
            className={
              `flex flex-col items-center rounded-2xl p-6 relative` +
              (show ? ' animate-fade-in-left' : '')
            }
            style={show ? {
              animationDelay: `${i * 0.08}s`,
              animationDuration: '0.55s',
              animationFillMode: 'both'
            } : {}}
          >
            <div className="w-full flex flex-col items-center mb-2">
              <div className="w-full h-28 flex items-center justify-center">
                <img src={src} alt={`Exhibitor ${i + 1}`} className="w-full h-full object-contain" loading="lazy" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fade-in-left {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-left {
          animation-name: fade-in-left;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          animation-fill-mode: both;
          animation-duration: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default OurExhibitors;
