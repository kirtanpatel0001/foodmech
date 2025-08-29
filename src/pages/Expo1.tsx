// Replace with your actual background image path
const backgroundImg = "public/images/Expo 2026.png";

const Expo1 = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Blurred Background - smaller scale/blur on mobile, original on md+ */}
      <img
        src={backgroundImg}
        alt="Expo Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-100 md:blur-md md:scale-105 z-0"
      />
      {/* Card with accent borders */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Decorative accents: hide on small screens to avoid overlap, show on md+ to preserve desktop look */}
        {/* Decorative rectangles: visible on mobile but smaller and shifted to avoid overlap; md+ keeps original size/position */}
        <img
          src="public\images\Rectangle 2.png"
          alt="Decorative"
          className="block w-28 md:w-80 h-auto absolute -top-2 -right-2 md:-top-6 md:-right-6"
        />
        <img
          src="public\images\Rectangle 1.png"
          alt="Decorative"
          className="block w-28 md:w-80 h-auto absolute -bottom-2 -left-2 md:-bottom-6 md:-left-6"
        />

        {/* Main Card - mobile-first smaller paddings and widths, md+ restores original sizes */}
        <div className="relative bg-white rounded-xl shadow-lg px-6 py-6 max-w-xs text-center md:px-8 md:py-10 md:max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Expo 2026</h1>
          <p className="text-base md:text-lg font-medium text-gray-800">
            Welcome to the Food Mech Asia, a celebration<br />
            of culinary excellence and gastronomic diversity! Our exhibition brings<br />
            together the best in food and beverage from around the world,<br />
            offering a unique platform for food enthusiasts,<br />
            chefs, and producers to showcase their passion and creativity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Expo1;
    

