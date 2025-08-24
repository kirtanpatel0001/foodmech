

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../App.css";
import "../index.css";

const highlights = [
  // public/ files are served from the site root in Vite — use root paths
  { src: "/f1.webp", alt: "Highlight 1" },
  { src: "/f2.webp", alt: "Highlight 2" },
  { src: "/f3.webp", alt: "Highlight 3" },
  { src: "/f4.webp", alt: "Highlight 4" },
];

export default function Exhibition() {
  const [active, setActive] = useState(1); // index of the center image
  // store natural dimensions for each image after preload
  const [naturalSizes, setNaturalSizes] = useState<Record<number, { w: number; h: number }>>({});

  // show each image for 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % highlights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // preload images and capture natural sizes
  useEffect(() => {
    let mounted = true;
    const sizes: Record<number, { w: number; h: number }> = {};

    highlights.forEach((img, idx) => {
      const I = new Image();
      I.src = img.src;
      I.onload = () => {
        if (!mounted) return;
        sizes[idx] = { w: I.naturalWidth || I.width, h: I.naturalHeight || I.height };
        // update state incrementally so UI can update as images load
        setNaturalSizes((prev) => ({ ...prev, [idx]: sizes[idx] }));
      };
      // if image fails to load, we simply skip — component will fall back to defaults
    });

    return () => {
      mounted = false;
    };
  }, []);

  // responsive: track viewport width so we can reduce spacing and heights on small screens
  const [vw, setVw] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // active index controls which image is center; images animate based on their delta from active

  return (
  <div className="flex flex-col items-center justify-start bg-white w-full" style={{ minHeight: 120, paddingTop: 12 }}>
      <h2 className="text-3xl font-bold text-center mb-2" style={{ paddingTop: 4 }}>
        In Exhibition Day
      </h2>
      {/* compute responsive sizes */}
      {/** sizeScale reduces card sizes on smaller screens but not too small */}
      <div className="relative w-full flex justify-center items-center" style={{ height: (vw < 480 ? 360 : vw < 1024 ? 420 : 520), perspective: 1200 }}>
        <div className="relative flex items-center justify-center" style={{ width: '100%', maxWidth: 1000, height: (vw < 480 ? 240 : vw < 1024 ? 320 : 380) }}>
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
            // horizontal spacing adapts to viewport so cards don't overlap on small screens
            const spacing = vw < 480 ? 200 : vw < 1024 ? 240 : 280;
            const x = delta * spacing;
            const y = abs * 10; // vertical offset for depth
            const scale = delta === 0 ? 1.02 : abs === 1 ? 0.98 : 0.92;
            const rotateY = delta * -18;
            const zIndex = 100 - abs;
            const opacity = delta === 0 ? 1 : abs === 1 ? 0.6 : 0.35;
            const blur = delta === 0 ? '0px' : abs === 1 ? '4px' : '8px';

            const spring = ({ type: 'spring', stiffness: 140, damping: 20 } as unknown) as import('framer-motion').Transition;

            const isCenter = delta === 0;
            // design constraints: maximum available sizes per visual state, scaled for smaller screens
            const sizeScale = vw < 480 ? 0.72 : vw < 1024 ? 0.86 : 1;
            const maxW = (isCenter ? 520 : abs === 1 ? 320 : 180) * sizeScale;
            const maxH = (isCenter ? 360 : abs === 1 ? 220 : 120) * sizeScale;

            // try to use natural size (preserve quality) but never upscale beyond natural size
            const nat = naturalSizes[i];
            let w = maxW;
            let h = maxH;
            if (nat && nat.w > 0 && nat.h > 0) {
              // compute scale that fits natural size into max box but never > 1
              const scale = Math.min(1, Math.min(maxW / nat.w, maxH / nat.h));
              w = Math.round(nat.w * scale);
              h = Math.round(nat.h * scale);
            }
            // increase card size by 10px as requested but keep a reasonable minimum
            const extra = 10;
            w = Math.max(120, Math.round(w + extra));
            h = Math.max(100, Math.round(h + extra));

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
                {/*
                  Use a helper class that prevents upscaling and preserves the
                  image's natural aspect ratio. object-fit: contain ensures the
                  full image is visible (no crop) and max-width/height prevents
                  the browser from scaling a small image up and blurring it.
                */}
                <img
                  src={img.src}
                  alt={img.alt}
                  decoding="async"
                  loading={isCenter ? 'eager' : 'lazy'}
                  // make the img fill the card while preserving aspect ratio and avoid upscaling
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    // ensure a small background so letterboxing looks intentional for narrower images
                    backgroundColor: 'rgba(0,0,0,0.03)'
                  }}
                  className="rounded-2xl"
                />
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



