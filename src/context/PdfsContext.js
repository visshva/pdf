// src/context/PdfsContext.js
import React, { createContext, useState, useContext } from 'react';

const PdfsContext = createContext();

export const usePdfs = () => {
  return useContext(PdfsContext);
};

export const PdfsProvider = ({ children }) => {
  const [pdfs, setPdfs] = useState([]);

  const addPdf = (pdf) => {
    setPdfs((prevPdfs) => [...prevPdfs, pdf].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const removePdf = (id) => {
    setPdfs((prevPdfs) => prevPdfs.filter((pdf) => pdf.id !== id));
  };

  const updatePdf = (id, updatedPdf) => {
    setPdfs((prevPdfs) => 
      prevPdfs.map((pdf) => (pdf.id === id ? updatedPdf : pdf)).sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  return (
    <PdfsContext.Provider value={{ pdfs, addPdf, removePdf, updatePdf }}>
      {children}
    </PdfsContext.Provider>
  );
};
