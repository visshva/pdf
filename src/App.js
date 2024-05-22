// src/App.js
import React from 'react';
import UploadPDF from './components/UploadPDF';
import ListPDFs from './components/ListPDFs';
// Import your background image
import Imagess from './components/images/imagess.png';

const appStyle = {
  backgroundImage: `url(${Imagess})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  minHeight: '100vh', // Ensure the background covers the entire viewport height
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column', // Stack components vertically
  gap: '20px', // Space between the components
  padding: '20px',
  width: '100%',
  boxSizing: 'border-box',
};


const App = () => {
  return (
    <div className="App" style={appStyle}>
      <h1 align="center">CMS</h1>
      <div style={containerStyle}>
        <div >
          <UploadPDF />
        </div>
        <div >
          <ListPDFs />
        </div>
      </div>
    </div>
  );
};

export default App;
