


import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Expo1 from './pages/Expo1';
import Highlight from './pages/Highlight';
import BookStall from './pages/BookStall';
import PrivacyPolicy from './pages/Privacy Policy';
import ContactUs from './pages/Contact Us';
import Blog from './pages/Blog';
import Visitor from './pages/Visitor';
import { BrowserRouter, Routes, Route, useLocation,  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Sponsors from './pages/Sponsors';
import VideoSchedule from './pages/VideoSchedule';
import Exhibition from './pages/Exhibition';
import Feedback from './pages/Feedback';
import Partners from './pages/Partners';
import OurExhibitors from './pages/Our Exhibitors';
import ExhibitionBenefits from './pages/ExhibitionBenefits';
import Exhibitionunder from './pages/Exhibitionunder';
import Information from './pages/Information';
import SponsorBecome from './pages/sponsserbecome';

function ScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [hash]);
  return null;
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('foodmech_admin') === 'true');

  const handleLogin = () => setIsAdmin(true);
  const handleSignOut = () => setIsAdmin(false);

  return (
    <>
      <BrowserRouter>
        <ScrollToHash />
        {/* Hide Navbar/Footer on admin routes */}
        <Routes>
          <Route path="/admin" element={
            isAdmin ? (
              <AdminPanel onSignOut={handleSignOut} />
            ) : (
              <AdminLogin onLogin={handleLogin} />
            )
          } />
          <Route path="/*" element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={
                    <>
                      <Home />
                      <Expo1 />
                      <Highlight />
                      <VideoSchedule />
                      <Information />
                      <Exhibition />
                      <Exhibitionunder />
                      <div id="sponsors-section">
                        <Sponsors />
                      </div>
                      <div id="exhibition-benefits-section">
                        <ExhibitionBenefits />
                      </div>
                      <div id="become-sponsor-section">
                        <SponsorBecome />
                      </div>
                      <Partners />
                      <OurExhibitors />
                      <div id="feedback-section">
                        <Feedback />
                      </div>
                    </>
                  } />
                  <Route path="/bookstall" element={<BookStall />} />
                  <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                  <Route path="/contactus" element={<ContactUs />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/visitor" element={<Visitor />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}