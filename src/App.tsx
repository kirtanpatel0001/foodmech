


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
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Sponsors from './pages/Sponsors';
import VideoSchedule from './pages/VideoSchedule';
import Exhibition from './pages/Exhibition';
import Feedback from './pages/Feedback';
import Partners from './pages/Partners';
import OurExhibitors from './pages/Our Exhibitors';
import ExhibitionBenefits from './pages/ExhibitionBenefits';
import Exhibitionunder from './pages/Exhibitionunder';

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
  return (
    <>
      <BrowserRouter>
        <ScrollToHash />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                <Expo1 />
                <Highlight />
                <VideoSchedule />
                <Exhibition />
                <Exhibitionunder />
                <Sponsors />
                <ExhibitionBenefits />
                <BookStall />
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
      </BrowserRouter>
      <Footer />
    </>
  );
}