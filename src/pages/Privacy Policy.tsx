
const PrivacyPolicy = () => {
  return (
    <main className="w-full bg-gray-100">
      {/* Hero */}
      <section
        className="w-full h-56 md:h-72 lg:h-80 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/DJI_0251\.png')" }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl md:text-4xl lg:text-5xl font-bold">
          Privacy Policy
        </h1>
      </section>

      {/* Content card with yellow curve image on left */}
      <section className="py-0">
        <div className="max-w-8xl mx-auto bg-white relative shadow-md overflow-hidden">
          {/* Yellow curved background image positioned left */}
          <img
            src="/images/Rectangle\ 35\.png"
            alt="decorative curve"
            className="absolute left-0 top-0 h-full w-[50%] max-w-[60%] object-cover z-0"
          />

          {/* Text content placed above the yellow shape */}
          <div className="relative z-10 px-6 py-10 md:py-14 md:px-12 lg:px-16">
            <h2 className="text-center text-xl font-semibold mb-6">Privacy Policy</h2>

            <p className="max-w-3xl mx-auto text-sm text-gray-700 mb-6">
              At FoodMech, we value your privacy and are committed to protecting your personal information.
            </p>

            <div className="max-w-3xl mx-auto text-sm text-gray-800 space-y-6">
              <div>
                <h3 className="font-semibold">Information We Collect</h3>
                <ul className="list-disc pl-5 mt-2 text-gray-700">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Company name</li>
                  <li>Job title</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">How We Use Your Information</h3>
                <p className="mt-2 text-gray-700">We use your information to process registrations, send updates, and improve our services.</p>
              </div>

              <div>
                <h3 className="font-semibold">Data Protection</h3>
                <p className="mt-2 text-gray-700">We implement reasonable security measures to protect your information from unauthorized access.</p>
              </div>

              <div>
                <h3 className="font-semibold">Your Rights</h3>
                <p className="mt-2 text-gray-700">You may request access, correction, or deletion of your personal data.</p>
              </div>

              <div>
                <h3 className="font-semibold">Contact Us</h3>
                <p className="mt-2 text-gray-700">For questions, please contact us at marketing.foodmechasia@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy





