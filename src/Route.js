import React from 'react';
import UploadPDF from './components/UploadPDF';
import Iqac from './components/iqac';
import ListPDFs from './components/ListPDFs';
import AnnouncementBanner from './components/AnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageVideoSlider from './components/Slider';
import Upload from './components/Upload';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Slider } from '@mui/material';


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

const Routing = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div style={containerStyle}>
          <Routes>
            <Route path="/" element={<Iqac />} />
            <Route path="/UploadPDF" element={<UploadPDF />} />
            <Route path="/ListPDFs" element={<ListPDFs />} />
            <Route path="/Slider" element={<ImageVideoSlider/>} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
       
     
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default Routing;