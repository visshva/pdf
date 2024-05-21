// src/components/PDFManager.js
import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebase';

const PDFManager = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const fetchPdfs = async () => {
      const storageRef = ref(storage, 'pdfs');
      const listResponse = await listAll(storageRef);

      const urls = await Promise.all(
        listResponse.items.map(itemRef => getDownloadURL(itemRef))
      );

      setPdfs(listResponse.items.map((itemRef, index) => ({
        name: itemRef.name,
        url: urls[index],
      })));
    };

    fetchPdfs();
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    const storageRef = ref(storage, `pdfs/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function ...
        console.log(snapshot);
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // Complete function ...
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
          setPdfs(prevPdfs => [...prevPdfs, { name: file.name, url }]);
        });
      }
    );
  };

  return (
    <div>
      <h1>Upload and Retrieve PDF Files</h1>
      <div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        <br />
        {url && <a href={url} target="_blank" rel="noopener noreferrer">View PDF</a>}
      </div>
      <h2>PDF Files</h2>
      <ul>
        {pdfs.map((pdf) => (
          <li key={pdf.name}>
            <a href={pdf.url} target="_blank" rel="noopener noreferrer">
              {pdf.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PDFManager;
