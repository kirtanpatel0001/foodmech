
import React from "react";

const Feedback: React.FC = () => (
  <div
    className="min-h-screen flex flex-col items-center justify-center py-12"
    style={{
      backgroundImage: "url('/images/img_worldmapwithragdollsremovebgpreview_1.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: "#FCC900",
    }}
  >
    <div className="flex flex-col items-center justify-center w-full 0 rounded-xl p-8 ">
      {/* Main Center Image (replace with your main image if needed) */}
      
      {/* First row: 4 images */}
      <h1 className="text-4xl font-bold mb-8 text-center text-black">
       <span> Our Feedback</span>
       <span className="block">Testimonials of Last Exhibition</span>
      </h1>
      <div className="flex justify-center gap-6 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <img
            key={i}
            src="/1.png"
            alt={`Row1-${i}`}
            className="w-64 h-64 object-contain rounded-lg  "
          />
        ))}
      </div>
      {/* Second row: 3 images */}
      <div className="flex justify-center gap-6">
        {[1, 2, 3].map((i) => (
          <img
            key={i}
            src="/1.png"
            alt={`Row2-${i}`}
            className="w-64 h-64 object-contain rounded-lg  "
          />
        ))}
      </div>
    </div>
  </div>
);

export default Feedback;
