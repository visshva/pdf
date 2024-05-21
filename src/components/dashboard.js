import React from 'react';
import ListPDFs from './components/ListPDFs';
import UploadPDF from './components/UploadPDF';
const Dashboard = () => {
  return (
    <div>
      <ListPDFs />
      <UploadPDF />
    </div>
  );
};

export default Dashboard;