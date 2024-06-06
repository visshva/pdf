import React, { useState } from 'react';
import { storage, db } from '../firebase'; // Adjust the import statement
import { firebase } from '@firebase/app';
import '@firebase/firestore'; // Import Firestore module
const Mou = () => {
  const [logo, setLogo] = useState(null);
  const [description, setDescription] = useState('');
  const [pdf, setPdf] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handlePdfChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!logo || !description || !pdf) {
      alert('Please select a logo, enter a description, and select a PDF file.');
      return;
    }

    setUploading(true);

    // Upload logo
    const logoRef = storage.ref(`logos/${logo.name}`);
    await logoRef.put(logo);
    const logoUrl = await logoRef.getDownloadURL();

    // Upload PDF
    const pdfRef = storage.ref(`pdfs/${pdf.name}`);
    await pdfRef.put(pdf);
    const pdfUrl = await pdfRef.getDownloadURL();

    // Save to Firestore
    await db.collection('mou').add({
      logoUrl,
      description,
      pdfUrl,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Reset state
    setLogo(null);
    setDescription('');
    setPdf(null);
    setUploading(false);
  };

  return (
    <div>
      <h2>Upload MOU</h2>
      <div>
        <input type="file" accept="image/*" onChange={handleLogoChange} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="file" accept=".pdf" onChange={handlePdfChange} />
        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
};

export default Mou;
