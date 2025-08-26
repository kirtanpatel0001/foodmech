import { Link, useNavigate } from 'react-router-dom';




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
  return (
  <nav className="w-full bg-white flex items-center justify-between px-8 py-2 font-[Kantumruy_Pro] text-[16px] shadow-md sticky top-0 z-50">
      <div className="flex items-center">
        <Link to="/">
          <img src="/logo1.png" alt="Food Mech Logo" className="h-12 w-auto mr-4" />
        </Link>
      </div>
      <div className="flex items-center space-x-6">
  {/* <Link to="/" className="font-bold text-sm hover:text-pink-600">Home</Link> */}
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
  <Link to="/blog" className="font-bold text-sm hover:text-pink-600">Blog</Link>
  <Link to="/visitor" className="font-bold text-sm hover:text-pink-600">Visitor</Link>
  <Link to="/bookstall" className="ml-4 px-5 py-2 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600 transition-all border-2 border-black">Book Stall</Link>
      </div>
    </nav>
  );
};

export default Navbar;
