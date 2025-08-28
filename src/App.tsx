


import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Suspense, lazy, useEffect, useState } from 'react';
import Home from './pages/Home'; // keep home eagerly for now (critical above-the-fold)
const Expo1 = lazy(() => import('./pages/Expo1'))
const Highlight = lazy(() => import('./pages/Highlight'))
const BookStall = lazy(() => import('./pages/BookStall'))
const PrivacyPolicy = lazy(() => import('./pages/Privacy Policy'))
const ContactUs = lazy(() => import('./pages/Contact Us'))
const Blog = lazy(() => import('./pages/Blog'))
const Visitor = lazy(() => import('./pages/Visitor'))
import { BrowserRouter, Routes, Route, useLocation,  } from 'react-router-dom';
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
                <Suspense fallback={<div aria-busy="true">Loading...</div>}>
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
                </Suspense>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}