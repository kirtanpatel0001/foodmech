

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Expo1 from './pages/Expo1';
import Highlight from './pages/Highlight';
import BookStall from './pages/BookStall';
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
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </>
  );
}