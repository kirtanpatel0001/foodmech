// Replace with your actual background image path
const backgroundImg = "public/Expo 2026.png";

const Expo1 = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Blurred Background */}
      <img
        src={backgroundImg}
        alt="Expo Background"
        className="absolute inset-0 w-full h-full object-cover blur-md scale-105 z-0"
        style={{ filter: "blur(6px)" }}
      />
      {/* Card with accent borders */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Pink accent borders */}
        <img
    src="/Rectangle 28.png"
    alt="Decorative"
    className="w-80 h-auto absolute -top-6 -right-6"
    />
    <img src="/Rectangle 27.png" alt="Decorative" className="w-80 h-auto absolute -bottom-6 -left-6" />
        {/* <div className="absolute -bottom-6 -left-6 w-2/3 h-4 rounded-tl-2xl rounded-br-2xl bg-pink-600" style={{ borderTopRightRadius: '20px', borderBottomLeftRadius: '20px' }}></div> */}
        {/* Main Card */}
        <div className="relative bg-white rounded-xl shadow-lg px-8 py-10 max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-6">Expo 2026</h1>
          <p className="text-lg font-medium text-gray-800">
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
    
