import React, { useEffect, useState, useRef } from "react";

const partners = [
  {
    img: "public/images/WhatsApp_Image_2025-08-08_at_18.04.03_debdd0e2-removebg-preview 1.png",
    title: "FOOD NI VAAT",
    desc: "FOOD NI VAAT is a Food Business Magazine, Food Industry Magazine or Food News and Samachar.",
    highlight: "A Talk About Food Industry..."
  },
  {
    img: "public/images/WhatsApp Image 2025-08-08 at 18.04.04_e4a757af 1.png",
    title: "KUBER PUBLICITY",
    desc: "Kuber Publicity in Yogi Chowk, Surat is known to satisfactorily cater to the demands of its customer base.",
    highlight: "ADVERTISING & BRANDING SOLUTION"
  },
  {
    img: "public/images/WhatsApp Image 2025-08-08 at 18.04.04_2689b1d0 1.png",
    title: "D3 DESIGNNS",
    desc: "Our passion for what we do and how we do it empowers us to build brands people believe in.",
    highlight: "BRANDING | MARKETING | CONSULTING"
  }
];

const Partners: React.FC = () => {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShow(false);
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      // fallback: play immediately
      const t = setTimeout(() => setShow(true), 100);
      return () => clearTimeout(t);
    }

    let timeout: number | undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // restart animation: briefly set false then true so CSS animations restart
            setShow(false);
            if (timeout) window.clearTimeout(timeout);
            timeout = window.setTimeout(() => setShow(true), 50);
          }
        });
      },
      { threshold: 0.4 }
    );

    obs.observe(el);
    return () => {
      clearTimeout(timeout);
      obs.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-16 w-full mx-auto overflow-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold mb-10">Associate Partners</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {partners.map((p, i) => (
          <div
            key={p.title}
            className={
              `flex flex-col items-center bg-gray-300 rounded-2xl shadow-lg p-6 relative` +
              (show ? ' animate-fade-in-left' : '')
            }
            style={show ? {
              animationDelay: `${i * 0.3}s`,
              animationDuration: "0.7s",
              animationFillMode: "both"
            } : {}}
          >
            <div className="w-full flex flex-col items-center mb-3">
              <img src={p.img} alt={p.title} className="w-full h-32 object-contain rounded-lg mb-2" />
              <div className="text-sm font-semibold text-orange-500 text-center mb-1">{p.highlight}</div>
              <div className="text-lg sm:text-xl font-bold text-center mb-2">{p.title}</div>
            </div>
            <div className="text-gray-700 text-center text-sm sm:text-base">{p.desc}</div>
          </div>
        ))}
      </div>

      {/* Animation keyframes for fade-in-left */}
      <style>{`
        @keyframes fade-in-left {
          0% { opacity: 0; transform: translateX(-60px); }
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

export default Partners;
