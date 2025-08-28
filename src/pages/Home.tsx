import ResponsiveImage from '../components/ResponsiveImage';

const Home = () => {
  return (
    <>
      <div
        id="top"
        className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      >
        {/* Background slideshow (absolute, behind content) */}
        {(() => {
          const bgImages = [
              '/background 102.png.jpg',
              '/background 103.png.jpg',
              '/background 104.png.jpg',
              '/background 105.png.jpg',
              '/background 106.png.jpg',
              '/background 107.png.jpg',
              
          ];

          return (
            <div className="bg-slideshow" aria-hidden="true">
              {bgImages.map((src, i) => (
                <div
                  key={i}
                  className="bg-slide-item"
                  style={{ backgroundImage: `url('${src}')` }}
                />
              ))}
            </div>
          );
        })()}

        <div className="w-full max-w-6xl flex flex-col items-center text-center px-8 py-16 pt-0 relative z-10">
          <h1
            className="font-extrabold leading-tight text-black mb-4 text-3xl sm:text-4xl md:text-[54px]"
            style={{ fontFamily: 'Kantumruy Pro, sans-serif' }}
          >
            Experience Asia’s Premier
          </h1>

          <h2
            className="font-extrabold leading-tight text-black mb-4 text-3xl sm:text-4xl md:text-[54px]"
            style={{ fontFamily: 'Kantumruy Pro, sans-serif' }}
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

            <span className="text-black text-2xl md:text-3xl lg:text-4xl font-bold">
              - bringing Innovation,
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-8">
            Opportunities & Networking
          </h3>

          {/* Event Info + Buttons: centered block */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-6 w-full">
            {/* Date + Location */}
            <div className="flex flex-col gap-6 items-center text-center md:text-left">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-md" style={{ marginLeft: '5px' }}>
                  {/* responsive icon - any image will be sized to 36x36 by the component */}
                  <ResponsiveImage src="/11.png" alt="calendar" size={36} />
                </div>
                <div className="text-left" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}>
                  <div className="font-bold text-black">6–9 February , 2026</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-md" style={{ marginLeft: '20px' }}>
                  <ResponsiveImage src="/location.png" alt="location" size={32} />
                </div>
                <div className="text-left" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}>
                  <div className="font-bold text-black">Vanita Vishram Ground</div>
                  <div className="text-black">Surat, Gujarat</div>
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
