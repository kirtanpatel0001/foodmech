
const Information = () => {
  const ribbons = [
    {
      img: '/images/img_rectangle_37.svg',
      title: 'First Day',
      date: '6 February 2025',
      textColor: 'text-white'
    },
    {
      img: '/images/img_rectangle_37_amber_a400.svg',
      title: 'Second Day',
      date: '7 February 2025',
      textColor: 'text-white'
    },
    {
      img: '/images/img_rectangle_37_red_a400.svg',
      title: 'Third Day',
      date: '8 February 2025',
      textColor: 'text-white'
    },
    {
      img: '/images/img_rectangle_37.svg',
      title: 'Fourth Day',
      date: '9 February 2025',
      textColor: 'text-white'
    }
  ];
  

  return (
    <div className="flex flex-col items-center justify-start bg-white py-4 px-2 min-h-0">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-4">Information of Event Schedules</h1>
      <div className="flex flex-row w-full max-w-4xl overflow-x-auto pb-8" style={{gap: 0}}>
        {ribbons.map((ribbon, idx) => (
          <div
            key={idx}
            className="relative flex-shrink-0"
            style={{ width: '220px', height: '92px' }}
          >
            <img
              src={ribbon.img}
              alt={ribbon.title}
              className="w-full h-full object-cover select-none"
              draggable="false"
              style={{ display: 'block' }}
            />
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center ${ribbon.textColor}`}
              style={{ pointerEvents: 'none', fontFamily: 'inherit' }}
            >
              <span className="font-bold text-lg leading-6" style={{textShadow: '0 1px 2px rgba(0,0,0,0.10)'}}>{ribbon.title}</span>
              <span className="text-sm mt-1" style={{textShadow: '0 1px 2px rgba(0,0,0,0.10)'}}>{ribbon.date}</span>
            </div>
          </div>
        ))}
        <div>
            
        </div>
      </div>
      
      {/* Event Info Box */}
      <div className="relative w-full max-w-4xl mt-8" style={{ minHeight: '50px' }}>
        {/* SVG border background */}
        <img
          src="/images/img_rectangle_38.svg"
          alt="event border"
          className="absolute left-5 bottom-0 w-full h-[90px] object-cover pointer-events-none select-none drop-shadow-md"
          draggable="false"
        />
          {/* Content overlay - left-aligned, compact, vertically centered */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-6 flex flex-col z-10" style={{minHeight: '56px',minWidth: '300px'}}>
            
            <div className="flex flex-row items-center text-sm text-gray-800 mt-1 gap-4">
              <span className="flex items-center gap-1">
                  <img src="/location.png" alt="location" className="w-5 h-5 inline-block" style={{marginLeft: '20px', marginRight: '10px', marginTop: '-5px'}} />
                Vanita Vishram Ground Surat, Gujrat
              </span>
              <span className="flex items-center gap-1">
                  <img src="/clock.png" alt="clock" className="w-5 h-5 inline-block" style={{marginRight: '10px', marginTop: '-5px'}} />
                10:00 - 6:00
              </span>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Information;
