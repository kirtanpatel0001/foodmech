import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer
      className="relative w-full bg-white pt-12 pb-6 overflow-hidden"
      style={{
        '--bg-width': '100%',
        '--bg-right': '0',
        '--bg-top': '0',
        '--bg-rotate': '0deg',
        '--content-padding': '4rem'
      } as React.CSSProperties}
    >
      {/* Decorative background shapes - hidden on small screens to avoid overflow */}
      <img
        src="/images/img_rectangle_29.svg"
        alt="decorative"
        className="absolute z-0 hidden md:block"
        style={{
          width: 'var(--bg-width)',
          height: '100%',
          right: 'var(--bg-right)',
          top: 'var(--bg-top)',
          transform: 'rotate(var(--bg-rotate))',
          objectFit: 'cover'
        }}
      />
      <img src="/images/img_ellipse_3.png" alt="ellipse" className="absolute left-0 top-0 w-24 h-24 object-cover z-0 hidden sm:block" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start px-6 md:px-16 pb-8 md:pb-28 gap-y-8">
        {/* Left: Logo and description */}
        <div className="flex-1 w-full md:min-w-[300px] mb-0 md:mb-0 pr-0 md:pr-12">
          <img src="public\images\logo3.png" alt="Food Mech Logo" className="w-40 md:w-48 mb-4 md:mb-6" />
          <p className="text-black text-sm md:text-base mb-6 md:mb-8 w-full md:max-w-xs leading-relaxed">
            These festivals have always been a means of uniting communities through celebrations of harvests and giving thanks for a plentiful growing season.
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/FoodmechAsia1/" target="_blank" rel="noopener noreferrer">
              <img src="/images/img_facebook_1.png" alt="Facebook" className="w-8 h-8" />
            </a>
            <a href="https://www.instagram.com/food_mech.in?igsh=aHF5NmEzY2ZkbXN5" target="_blank" rel="noopener noreferrer">
              <img src="public\images\instagram.jpeg" alt="Instagram" className="w-8 h-8 rounded-full object-cover" />
            </a>
            <a href="https://www.youtube.com/@FOODMECHASIA" target="_blank" rel="noopener noreferrer">
              <img src="/images/img_youtube_1.png" alt="YouTube" className="w-8 h-8" />
            </a>
          </div>
        </div>

        {/* Center: Explore links */}
        <div className="flex-1 w-full md:min-w-[200px] mb-0 md:mb-0 px-0 md:px-12">
          <h3 className="text-black text-xl md:text-2xl font-semibold mb-4 md:mb-6">Explore</h3>
          <ul className="space-y-3 text-black text-sm md:text-base">
            <li>
              <a
                href="/#sponsors-section"
                className="hover:underline"
                onClick={(e) => { e.preventDefault(); navigate('/#sponsors-section'); }}
              >
                Our Sponsors
              </a>
            </li>
            <li>
              <a
                href="/#become-sponsor-section"
                className="hover:underline"
                onClick={(e) => { e.preventDefault(); navigate('/#become-sponsor-section'); }}
              >
                Become Sponsor
              </a>
            </li>
            <li><a href="/bookstall" className="hover:underline">Book Stall</a></li>
            <li><a href="/privacypolicy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/contactus" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Right: Contact info */}
        <div className="flex-1 w-full md:min-w-[300px] pl-0 md:pl-12">
          <h3 className="text-black text-xl md:text-2xl font-semibold mb-4 md:mb-6">Contact</h3>
          <div className="flex items-start gap-3 mb-4">
            <img src="public\images\location.png" alt="Location" className="w-5 h-5 mt-1" />
            <span className="text-black text-sm md:text-base leading-relaxed block">
              1-2 shikhar complex, beside Adajan Police Station, behind Gangeshwar Mahadev Mandir, Adajan, Surat, Gujarat, India
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2 text-sm md:text-base">
            <img src="public\images\email.jpeg" alt="Email" className="w-4 h-4" />
            <a href="mailto:marketing.foodmechasia@gmail.com" className="break-words">marketing.foodmechasia@gmail.com</a>
          </div>
          {/* <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1 text-sm md:text-base"> */}
           
          <div className="flex items-center gap-2 mb-1">
            <img src="/images/img_phone.svg" alt="Phone" className="w-5 h-5" />
            <span className="text-green-700 font-semibold">+91 98981 23103</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <img src="/images/img_phone.svg" alt="Phone" className="w-5 h-5" />
            <span className="text-green-700 font-semibold">+91 98980 36959</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <img src="/images/img_phone.svg" alt="Phone" className="w-5 h-5" />
            <span className="text-green-700 font-semibold">+91 98980 72103</span>
          </div>
          </div>
          {/* <div className="mt-3">
            <button onClick={() => window.open('/admin', '_blank')} className="text-sm px-3 py-1 border rounded">Admin Panel</button>
          </div> */}
        {/* </div> */}

      </div>

      {/* Bottom copyright bar */}
      <div className="relative z-20 bg-black text-white text-center py-3 w-full text-sm md:text-lg font-medium mt-8 md:mt-auto">
        Copyright © 2025 Food Mech Asia. Developed by weprovision infotech
      </div>
    </footer>
  );
};

export default Footer;

