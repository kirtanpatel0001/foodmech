import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


function TestimonialLink() {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/#feedback-section');
  };
  return (
    <a
      href="/#feedback-section"
      className="font-bold text-sm hover:text-pink-600"
      onClick={handleClick}
    >
      Testimonial
    </a>
  );
}

function HomeLink() {
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/#top');
  };
  return (
    <a
      href="/#top"
      className="font-bold text-sm hover:text-pink-600"
      onClick={handleClick}
    >
      Home
    </a>
  );
}

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(v => !v);

  return (
    <>
      <nav className="w-full bg-white flex items-center justify-between px-6 md:px-8 py-2 font-[Kantumruy_Pro] text-[16px] shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center">
        <Link to="/">
          <img src="public\images\logo3.png" alt="Food Mech Logo" className="h-16 w-30 mr-4" />
        </Link>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center space-x-6">
        <HomeLink />

        <a
          href="/#exhibition-benefits-section"
          className="font-bold text-sm hover:text-pink-600"
          onClick={e => { e.preventDefault(); navigate('/#exhibition-benefits-section'); }}
        >
          Benefits
        </a>
        <TestimonialLink />
        <a
          href="/#sponsors-section"
          className="font-bold text-sm hover:text-pink-600"
          onClick={e => { e.preventDefault(); navigate('/#sponsors-section'); }}
        >
          Our Sponsors
        </a>
        <a
          href="/#become-sponsor-section"
          className="font-bold text-sm hover:text-pink-600"
          onClick={e => { e.preventDefault(); navigate('/#become-sponsor-section'); }}
        >
          Become Sponsor
        </a>
        {/* <Link to="/blog" className="font-bold text-sm hover:text-pink-600">Blog</Link> */}
        <Link to="/visitor"  className="ml-4 px-5 py-2 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600 transition-all border-2 border-black">Visitor Pass</Link>
        <Link to="/bookstall" className="ml-4 px-5 py-2 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600 transition-all border-2 border-black">Book Stall</Link>
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          {/* simple hamburger / close icon using spans */}
          <div className="w-6 h-6 relative">
            <span className={`block absolute left-0 top-1/4 w-full h-0.5 bg-black transform transition duration-200 ${isOpen ? 'rotate-45 top-1/2' : ''}`}></span>
            <span className={`block absolute left-0 top-1/2 w-full h-0.5 bg-black transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block absolute left-0 top-3/4 w-full h-0.5 bg-black transform transition duration-200 ${isOpen ? '-rotate-45 top-1/2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-md transform origin-top transition-all duration-200 ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col px-6 py-4 space-y-3">
          <HomeLink />
          <a
            href="/#exhibition-benefits-section"
            className="font-bold text-sm hover:text-pink-600"
            onClick={e => { e.preventDefault(); setIsOpen(false); navigate('/#exhibition-benefits-section'); }}
          >
            Benefits
          </a>
          <a
            href="/#feedback-section"
            className="font-bold text-sm hover:text-pink-600"
            onClick={e => { e.preventDefault(); setIsOpen(false); navigate('/#feedback-section'); }}
          >
            Testimonial
          </a>
          <a
            href="/#sponsors-section"
            className="font-bold text-sm hover:text-pink-600"
            onClick={e => { e.preventDefault(); setIsOpen(false); navigate('/#sponsors-section'); }}
          >
            Our Sponsors
          </a>
          <a
            href="/#become-sponsor-section"
            className="font-bold text-sm hover:text-pink-600"
            onClick={e => { e.preventDefault(); setIsOpen(false); navigate('/#become-sponsor-section'); }}
          >
            Become Sponsor
          </a>
          <Link to="/blog" onClick={() => setIsOpen(false)} className="font-bold text-sm hover:text-pink-600">Blog</Link>
          <div className="flex flex-col sm:flex-row sm:space-x-3">
            <Link to="/visitor" onClick={() => setIsOpen(false)} className="w-full text-center sm:w-auto mt-2 px-4 py-2 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600 transition-all border-2 border-black">Visitor</Link>
            <Link to="/bookstall" onClick={() => setIsOpen(false)} className="w-full text-center sm:w-auto mt-2 px-4 py-2 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600 transition-all border-2 border-black">Book Stall</Link>
          </div>
        </div>
      </div>
      </nav>
      {/* spacer to prevent content being hidden under the fixed navbar */}
      <div aria-hidden="true" className="h-14 md:h-16" />
    </>
  );
};

export default Navbar;

