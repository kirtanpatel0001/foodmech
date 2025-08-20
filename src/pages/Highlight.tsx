
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../App.css";
import "../index.css";

const highlights = [
  { src: "/images/img_dsc01670_fgj1nc9kdz_2.png", alt: "Highlight 1" },
  { src: "/images/img_dsc01670_fgj1nc9kdz_1.png", alt: "Highlight 2" },
  { src: "/images/img_dsc01670_fgj1nc9kdz_3.png", alt: "Highlight 3" },
  { src: "/images/img_dsc01670_fgj1nc9kdz_4.png", alt: "Highlight 4" },
  { src: "/images/img_dsc01670_fgj1nc9kdz_290x520.png", alt: "Highlight 5" },
];

export default function Highlight() {
  const [active, setActive] = useState(1); // index of the center image

  // show each image for 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % highlights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // active index controls which image is center; images animate based on their delta from active

  return (
  <div className="flex flex-col items-center justify-start bg-white w-full" style={{ minHeight: 640, paddingTop: 60 }}>
      <h2 className="text-3xl font-bold text-center mb-10" style={{ paddingTop: 20 }}>
        Showcasing the Highlights of Our Exhibitions
      </h2>

      <div className="relative w-full flex justify-center items-center" style={{ height: 480, perspective: 1200 }}>
        <div className="relative flex items-center justify-center" style={{ width: '100%', maxWidth: 1000, height: 480 }}>
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
            const x = delta * 320; // horizontal spacing (reduced)
            const y = abs * 10; // vertical offset for depth
            const scale = delta === 0 ? 1.02 : abs === 1 ? 0.98 : 0.92;
            const rotateY = delta * -18;
            const zIndex = 100 - abs;
            const opacity = delta === 0 ? 1 : abs === 1 ? 0.6 : 0.35;
            const blur = delta === 0 ? '0px' : abs === 1 ? '4px' : '8px';

            const spring = ({ type: 'spring', stiffness: 140, damping: 20 } as unknown) as import('framer-motion').Transition;

            const isCenter = delta === 0;
            const w = isCenter ? 520 : abs === 1 ? 320 : 180;
            const h = isCenter ? 360 : abs === 1 ? 220 : 120;

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

