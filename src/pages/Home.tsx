const Home = () => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/background 1.png')" }}
    >
      <div className="w-full max-w-6xl flex flex-col items-center text-center px-8 py-16 pt-0 relative z-10">

        <h1
          className="font-extrabold leading-tight text-black mb-4"
          style={{ fontFamily: 'Kantumruy Pro, sans-serif', fontSize: 54 }}
        >
          Experience Asia’s Premier
        </h1>

        <h2
          className="font-extrabold leading-tight text-black mb-4"
          style={{ fontFamily: 'Kantumruy Pro, sans-serif', fontSize: 54 }}
        >
          Food Industry Exhibition
        </h2>

        <div className="flex items-center justify-center mb-4 relative">
          <span
            className="text-[#E41146] font-extrabold mr-4 relative inline-block"
            style={{ fontFamily: 'Kantumruy Pro, sans-serif', fontSize: 54 }}
          >
            15th Edition
            {/* Underline SVG image */}
            <img
              src="/images/img_line_1.svg"
              alt="underline"
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: -10,
                width: '270px',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
          </span>
          <span className="text-black text-2xl md:text-3xl lg:text-4xl font-bold">
            - bringing Innovation,
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-8">
          Opportunities & Networking
        </h3>

        {/* Event Info + Buttons: centered block */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-6 w-full">
          {/* Date + Location */}
          <div className="flex flex-col gap-6 items-center">
            <div className="flex items-center gap-4">
              <div className="p-3  rounded-md " style={{marginLeft: '5px'}}>
                <img src="/11.png" alt="calendar" width={36} height={36} />
              </div>
              <div className="text-left" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}>
                <div className="font-bold text-black">6–9 February , 2026</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3  rounded-md " style={{marginLeft: '35px'}}>
                <img src="/location.png" alt="location" width={32} height={32} />
              </div>
              <div className="text-left" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16 }}>
                <div className="font-bold text-black">Vanita Vishram Ground</div>
                <div className="text-black">Surat, Gujarat</div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 items-center">
            <button className="px-8 py-3 rounded-lg bg-lime-400 text-white font-bold border-2 border-lime-600 shadow-md hover:bg-lime-500 transition-all w-44" style={{boxShadow:'0 6px 12px 0 #b6d43a'}}>
              Book Now
            </button>
            <button className="px-8 py-3 rounded-lg bg-yellow-400 text-white font-bold border-2 border-yellow-600 shadow-md hover:bg-yellow-500 transition-all w-44" style={{boxShadow:'0 6px 12px 0 #f7d13b'}}>
              Visitor Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
