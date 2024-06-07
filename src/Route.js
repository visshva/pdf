import React from 'react';
import UploadPDF from './components/UploadPDF';
import Iqac from './components/iqac';
import ListPDFs from './components/ListPDFs';
import AnnouncementBanner from './components/AnnouncementBar';
import Header from './components/Header';
import Atr from './components/atr';
import Nirf from './components/nirf';
import Naac from './components/naac';
import Nba from './components/nba';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

import Committee from './components/committee';
import IqacEvents from './components/iqacevents';
import FeedbackPolicy from './components/feedbackpolicy';
import Footer from './components/Footer';
import ImageVideoSlider from './components/Slider';
import Upload from './components/Upload';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



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
            <Route path="/Navbar" element={< Navbar/>} />
            <Route path="/Login" element={< Login/>} />
            <Route path="/Register" element={< Register/>} />
            <Route path="/Dashboard" element={< Dashboard/>} />
            <Route path="/Atr" element={< Atr folder="ATR"  />} />
            <Route path="/Nirf" element={< Nirf folder="NIRF"  />} />
            <Route path="/Naac" element={< Naac folder="NAAC"  />} />
            <Route path="/Nba" element={< Nba folder="NBA"  />} />
            <Route path="/Committee" element={< Committee folder="COMMITTEE"  />} />
            <Route path="/IqacEvents" element={< IqacEvents folder="IQACEVENTS"  />} />
            <Route path="/FeedbackPolicy" element={< FeedbackPolicy folder="PTU FEEBACK POLICY"  />} />
           
          </Routes>
       
     
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default Routing;