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

const App = () => {
  return (
    <div className="App" style={appStyle}>
      <h1 align ="center">Upload and Retrieve PDF Files</h1>
      <UploadPDF />
 <ListPDFs /> 
    </div>
  );
};

export default App;
