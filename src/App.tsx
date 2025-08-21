


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
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                <Expo1 />
                <Highlight />
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