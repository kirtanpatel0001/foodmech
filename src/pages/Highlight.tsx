
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../App.css";
import "../index.css";

const highlights = [
  { src: "public/4.jpeg.jpg", alt: "Highlight 1" },
  { src: "public/5.jpeg.jpg", alt: "Highlight 2" },
  { src: "public/6.jpeg.jpg", alt: "Highlight 3" },
  { src: "public/7.jpeg.jpg", alt: "Highlight 4" },
  { src: "public/DJI_0251.png", alt: "Highlight 5" },
  { src: "public/DJI_0278 (1).png", alt: "Highlight 6" },
  { src: "public/DSC_0095.JPG", alt: "Highlight 7" },
  { src: "public/DSC_0115.JPG", alt: "Highlight 8" },
  { src: "public/DSC_0136.JPG", alt: "Highlight 9" },
  { src: "public/DSC_0136.JPG", alt: "Highlight 10" },
  { src: "public/DSC_8292.JPG", alt: "Highlight 11" },
  { src: "public/DSC01624.JPG", alt: "Highlight 12" },
  { src: "public/DSC01952.JPG", alt: "Highlight 13" },
  


];

export default function Highlight() {
  const [active, setActive] = useState(1); // index of the center image

  // detect small viewport at render time (safe check for SSR)
  const isSmallViewport = typeof window !== 'undefined' && window.innerWidth < 768;

  // show each image for 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % highlights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // active index controls which image is center; images animate based on their delta from active

  return (
    <div
      className="flex flex-col items-center justify-start bg-white w-full"
      style={{ minHeight: isSmallViewport ? 480 : 640, paddingTop: isSmallViewport ? 12 : 20 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10" style={{ paddingTop: 50 }}>
        Showcasing the Highlights of Our Exhibitions
      </h2>

      <div
        className="relative w-full flex justify-center items-center"
        style={{ height: isSmallViewport ? 300 : 420, perspective: isSmallViewport ? 600 : 800 }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{ width: '100%', maxWidth: isSmallViewport ? 420 : 680, height: isSmallViewport ? 300 : 420 }}
        >
          {highlights.map((img, i) => {
            const n = highlights.length;
            let delta = i - active;
            // wrap delta to range -floor(n/2) .. floor(n/2)
            if (delta > Math.floor(n / 2)) delta -= n;
            if (delta < -Math.floor(n / 2)) delta += n;

            const abs = Math.abs(delta);
            // only render center and immediate neighbors
            if (abs > 1) return null;
            // compute visual properties
            // responsive measurements: smaller spacing/rotation on mobile, preserved on md+
            const isSmall = typeof window !== 'undefined' && window.innerWidth < 768;
            const x = delta * (isSmall ? 140 : 320);
            const y = abs * (isSmall ? 6 : 10);
            const scale = delta === 0 ? (isSmall ? 1.04 : 1.02) : abs === 1 ? 0.96 : 0.92;
            const rotateY = delta * (isSmall ? -10 : -18);
            const zIndex = 100 - abs;
            const opacity = delta === 0 ? 1 : abs === 1 ? 0.7 : 0.35;
            const blur = delta === 0 ? '0px' : abs === 1 ? '3px' : '6px';

            const spring = ({ type: 'spring', stiffness: 140, damping: 20 } as unknown) as import('framer-motion').Transition;

            const isCenter = delta === 0;
            // mobile sizes (use smaller widths/heights) and restore on md+
            const w = isCenter ? (isSmall ? 320 : 520) : abs === 1 ? (isSmall ? 220 : 320) : 140;
            const h = isCenter ? (isSmall ? 220 : 360) : abs === 1 ? (isSmall ? 150 : 220) : 100;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ x, y, scale, rotateY, opacity, filter: `blur(${blur})` }}
                transition={spring}
                whileHover={isCenter ? { scale: 1.22, rotateY: -6 } : {}}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  translate: '-50% -50%',
                  width: w,
                  height: h,
                  zIndex,
                  borderRadius: 28,
                  transformStyle: 'preserve-3d',
                  overflow: 'hidden',
                }}
                className="rounded-2xl shadow-2xl bg-black/5"
              >
                <img src={img.src} alt={img.alt} className="object-cover w-full h-full rounded-2xl" />
                {/* subtle shine */}
                {isCenter && (
                  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', left: '-40%', top: '-40%', width: '120%', height: '120%', background: 'linear-gradient(120deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', transform: 'rotate(25deg)', mixBlendMode: 'screen', opacity: 0.8 }} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

