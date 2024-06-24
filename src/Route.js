import React from 'react';
import UploadPDF from './components/UploadPDF';
import Iqac from './components/iqac';
import ListPDFs from './components/ListPDFs';
import AnnouncementBanner from './components/AnnouncementBar';
import Header from './components/Header';
import Atr from './components/atr';
import Nirf from './components/nirf';
import NewsTicker from './components/NewsTicker';
import Naac from './components/naac';
import Nba from './components/nba';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import  {FontSizeProvider}  from './components/FontSizeContext';
import Committee from './components/committee';
import IqacEvents from './components/iqacevents';
import FeedbackPolicy from './components/feedbackpolicy';
import Footer from './components/Footer';
import ImageSlider from './components/ImageSlider';
import Upload from './components/Upload';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { UserProvider } from './components/UserContext'; 
import NewsUpdates from './components/NewsUpdates';
import UploadNews from './components/UploadNews';
import CardSlider from './components/CardSlider';

const Routing = () => {
  return (
    <Router>
      <div className="App">
        
        <div>
          <Routes>
            <Route path="/" element={<Iqac />} />
            <Route path="/UploadPDF" element={<UploadPDF />} />
            <Route path="/CardSlider" element={<CardSlider />} />
            <Route path="/ListPDFs" element={<ListPDFs />} />
            <Route path="/ImageSlider" element={<ImageSlider/>} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/NewsTicker" element={<NewsTicker />} />
            <Route path="/Navbar" element={< Navbar/>} />
            <Route path="/Login" element={< Login/>} />
            <Route path="/Register" element={< Register/>} />
            <Route path="/Dashboard" element={< Dashboard/>} />
            <Route path="/NewsUpdates" element={< NewsUpdates/>} />
            <Route path="/UploadNews" element={< UploadNews/>} />
            <Route path="/FontSizeProvider" element={< FontSizeProvider/>} />
            <Route path="/Atr" element={< Atr folder="ATR"  />} />
            <Route path="/Nirf" element={< Nirf folder="NIRF"  />} />
            <Route path="/Naac" element={< Naac folder="NAAC"  />} />
            <Route path="/Nba" element={< Nba folder="NBA"  />} />
            <Route path="/Committee" element={< Committee folder="COMMITTEE"  />} />
            <Route path="/IqacEvents" element={< IqacEvents folder="IQACEVENTS"  />} />
            <Route path="/FeedbackPolicy" element={< FeedbackPolicy folder="PTU FEEBACK POLICY"  />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:oobCode" element={<ResetPassword />} />
            <Route path="UserProvider" element={<UserProvider />} />
          </Routes>
          
     
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default Routing;