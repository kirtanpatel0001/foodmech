import { Link } from 'react-router-dom';



const Navbar = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('top');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
  <nav className="w-full bg-white flex items-center justify-between px-8 py-2 font-[Kantumruy_Pro] text-[16px] shadow-md sticky top-0 z-50">
      <div className="flex items-center">
        <Link to="/">
          <img src="/logo1.png" alt="Food Mech Logo" className="h-12 w-auto mr-4" />
        </Link>
      </div>
      <div className="flex items-center space-x-6">
  {/* <Link to="/" className="font-bold text-sm hover:text-pink-600">Home</Link> */}
    <a href="#top" onClick={scrollToTop} className="font-bold text-sm hover:text-pink-600">Home</a>

        <a href="#" className="font-bold text-sm hover:text-pink-600">Benefits</a>
        <a href="#" className="font-bold text-sm hover:text-pink-600">Testimonial</a>
        <a href="#" className="font-bold text-sm hover:text-pink-600">Our Sponsors</a>
        <a href="#" className="font-bold text-sm hover:text-pink-600">Become Sponsor</a>
        <a href="#" className="font-bold text-sm hover:text-pink-600">Blog</a>
        <a href="#" className="font-bold text-sm hover:text-pink-600">Visitor</a>
  <Link to="/bookstall" className="ml-4 px-5 py-2 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600 transition-all border-2 border-black">Book Stall</Link>
      </div>
    </nav>
  );
};

export default Navbar;
