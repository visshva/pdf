// src/App.js
import React from 'react';
import UploadPDF from './components/UploadPDF';
import ListPDFs from './components/ListPDFs';
// Import your background image
import Images from './components/images/images.png';

const appStyle = {
  backgroundImage: `url(${Images})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  minHeight: '100vh', // Ensure the background covers the entire viewport height
};

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr', // Create two equal columns
  gap: '20px', // Space between the columns
  padding: '20px',
  width: '100%',
  boxSizing: 'border-box',
};

const componentStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background for better readability
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const App = () => {
  return (
    <div className="App" style={appStyle}>
      <h1 align="center">CMS</h1>
      <div style={containerStyle}>
        <div style={componentStyle}>
          <UploadPDF />
        </div>
        <div style={componentStyle}>
          <ListPDFs />
        </div>
      </div>
    </div>
  );
};

export default App;
