import React from 'react';
import UploadPDF from './components/UploadPDF';
import ListPDFs from './components/ListPDFs';
import AnnouncementBanner from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import backgroundImage from './components/images/ptu.jpg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const appStyle = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '20px',
  width: '100%',
  boxSizing: 'border-box',
  margin: '0 auto',
  maxWidth: '800px',
  flex: '1 0 auto',
};

const App = () => {
  return (
    <Router>
      <div className="App" style={appStyle}>
        <Header />
        <div style={containerStyle}>
          <Routes>
            <Route path="/" element={<UploadPDF />} />
          
            <Route path="/about" element={<div>About Us</div>} />
            <Route path="/contact" element={<div>Contact Us</div>} />
          </Routes>
        <ListPDFs />
        <AnnouncementBanner />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
