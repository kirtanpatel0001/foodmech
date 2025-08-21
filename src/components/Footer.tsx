
const Footer: React.FC = () => {
  return (
    <footer 
      className="relative w-full bg-white pt-16 pb-0 overflow-hidden"
      style={{
        '--bg-width': '100%',
        '--bg-right': '0',
        '--bg-top': '0',
        '--bg-rotate': '0deg',
        '--content-padding': '4rem'
      } as React.CSSProperties}
    >
      {/* Decorative background shapes */}
      <img 
        src="/images/img_rectangle_29.svg" 
        alt="decorative" 
        className="absolute z-0" 
        style={{
          width: 'var(--bg-width)',
          height: '100%',
          right: 'var(--bg-right)',
          top: 'var(--bg-top)',
          transform: 'rotate(var(--bg-rotate))',
          objectFit: 'cover'
        }}
      />
      <img src="/images/img_ellipse_3.png" alt="ellipse" className="absolute left-0 top-0 w-32 h-32 object-cover z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start px-16 pb-28">
        {/* Left: Logo and description */}
        <div className="flex-1 min-w-[300px] mb-8 md:mb-0 pr-12">
          <img src="public\logo2.png" alt="Food Mech Logo" className="w-48 mb-6" />
          <p className="text-black text-base mb-8 max-w-xs leading-relaxed">
            These festivals have always been a means of uniting communities through celebrations of harvests and giving thanks for a plentiful growing season.
          </p>
          <div className="flex gap-6">
            <a href="https://www.facebook.com/FoodmechAsia1/" target="_blank" rel="noopener noreferrer">
              <img src="/images/img_facebook_1.png" alt="Facebook" className="w-10 h-10" />
            </a>
            <a href="https://www.instagram.com/food_mech.in?igsh=aHF5NmEzY2ZkbXN5" target="_blank" rel="noopener noreferrer">
              <img src="/instagram.jpeg" alt="Instagram" className="w-10 h-10 rounded-full" />
            </a>
            <a href="https://www.youtube.com/@FOODMECHASIA" target="_blank" rel="noopener noreferrer">
              <img src="/images/img_youtube_1.png" alt="YouTube" className="w-10 h-10" />
            </a>
             
          </div>
        </div>

        {/* Center: Explore links */}
        <div className="flex-1 min-w-[200px] mb-8 md:mb-0 px-12">
          <h3 className="text-black text-2xl font-semibold mb-6">Explore</h3>
          <ul className="space-y-4 text-black text-base">
            <li><a href="#" className="hover:underline">Our Sponsors</a></li>
            <li><a href="#" className="hover:underline">Become Sponsor</a></li>
            <li><a href="/bookstall" className="hover:underline">Book Stall</a></li>
            <li><a href="/privacypolicy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/contactus" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Right: Contact info */}
        <div className="flex-1 min-w-[300px] pl-12">
          <h3 className="text-black text-2xl font-semibold mb-6">Contact</h3>
          <div className="flex items-start gap-3 mb-4">
            <img src="public\location.png" alt="Location" className="w-6 h-6 mt-1" />
            <span className="text-black text-base leading-relaxed">
               1-2 shikhar complex , beside Adajan Police Station, behind Gangeshwar Mahadev Mandir , Adajan ,  Surat, Gujarat , India</span>.
          </div>
          <div className="flex items-center gap-2 mb-2">
            <img src="public\email.jpeg" alt="Email" className="w-5 h-5" />
            <a href="mailto:marketing.foodmechasia@gmail.com" >marketing.foodmechasia@gmail.com</a>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <img src="/images/img_phone.svg" alt="Phone" className="w-5 h-5" />
            <a href="tel:+919898123103">+91 98981 23103</a>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <img src="/images/img_phone.svg" alt="Phone" className="w-5 h-5" />
            <a href="tel:+919898036959" >+91 98980 36959</a>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <img src="/images/img_phone.svg" alt="Phone" className="w-5 h-5" />
            <a href="tel:+919898072103" >+91 98980 72103</a>
          </div>
        </div>

        {/* Decorative dots top right */}
        <img src="/images/img_dot.svg" alt="dots" className="absolute right-16 top-8 w-24 h-8" />
      </div>

      {/* Bottom copyright bar */}
      <div className="relative z-20 bg-black text-white text-center py-3 w-full text-lg font-medium mt-auto">
        Copyright © 2025 Food Mech Asia. Developed by weprovision infotech
      </div>
    </footer>
  );
};

export default Footer;
