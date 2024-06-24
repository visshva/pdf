import React from 'react';
import UploadPDF from './components/UploadPDF';
import Iqac from './components/iqac';
import ListPDFs from './components/ListPDFs';

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
import ImageVideoSlider from './components/Slider';
import Upload from './components/Upload';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';



const Routings = () => {
  return (
    <Router>
      <div className="App1">
       
      
          <Routes>
         
            <Route path="/UploadPDF" element={<UploadPDF />} />
            <Route path="/ListPDFs" element={<ListPDFs />} />
            <Route path="/Slider" element={<ImageVideoSlider/>} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/NewsTicker" element={<NewsTicker />} />
            <Route path="/Navbar" element={< Navbar/>} />
            <Route path="/Login" element={< Login/>} />
            <Route path="/Register" element={< Register/>} />
            <Route path="/Dashboard" element={< Dashboard/>} />
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
            
          </Routes>
       
     
        </div>
     
    </Router>
  );
};

export default Routings;