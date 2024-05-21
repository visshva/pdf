import React, { useEffect, useState } from 'react';
import { listAll, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import pdficon from './images/pdficon.svg';

const ListPDFs = () => {
  const [pdfs, setPdfs] = useState([]);

  const fetchPdfs = async () => {
    const storageRef = ref(storage, 'pdfs');
    const listResponse = await listAll(storageRef);

    const urls = await Promise.all(
      listResponse.items.map(itemRef => getDownloadURL(itemRef))
    );

    const pdfData = listResponse.items.map((itemRef, index) => ({
      id: index,
      name: itemRef.name,
      url: urls[index],
    }));

    // Sort the PDFs array alphabetically based on the name
    pdfData.sort((a, b) => a.name.localeCompare(b.name));

    setPdfs(pdfData);
  };

  useEffect(() => {
    fetchPdfs();
  }, []); // Fetch PDFs initially

  const handleDelete = async (id, name) => {
    try {
      const storageRef = ref(storage, `pdfs/${name}`);
      await deleteObject(storageRef);
      const updatedPdfs = pdfs.filter(pdf => pdf.id !== id);
      setPdfs(updatedPdfs);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <Box mt={2} textAlign="center">
      <Typography variant="h4" gutterBottom>
      View Uploaded Documents
      </Typography>
      <Box sx={{ maxWidth: '1000px', margin: '0 auto' }}>
        <TableContainer component={Paper}>
          <Table size="medium">
            <TableHead>
              <TableRow style={{ backgroundColor: 'darkred' }}>
                <TableCell style={{ fontWeight: 'bold', fontSize: 18, color: 'white',fontFamily:''}}>File Name</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: 18, color: 'white', textAlign: 'center' }}>View PDF</TableCell>

                <TableCell style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {pdfs.map((pdf, index) => (
    <TableRow key={pdf.id} style={{ height: '36px', backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff' }}>
      <TableCell style={{ padding: '10px' }}><Typography style={{ fontWeight: 'bold', fontSize: 14 }}>{pdf.name}</Typography></TableCell>
      
      <TableCell style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>
  <Link href={pdf.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue' }}>
    <img src={pdficon} alt="PDF Icon" style={{ width: '36px', height: '36px', marginRight: '8px' }} />
  </Link>
</TableCell>

      <TableCell style={{ padding: '10px' }}>
        <IconButton onClick={() => handleDelete(pdf.id, pdf.name)} aria-label="delete">
          <DeleteIcon style={{ color: 'red', fontSize: 20 }} />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ListPDFs;
