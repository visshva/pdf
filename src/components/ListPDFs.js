import React, { useEffect, useState } from 'react';
import { listAll, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link, IconButton, Tooltip, TextField, TablePagination, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import pdficon from './images/pdficon.svg';

const ListPDFs = () => {
  const [pdfs, setPdfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
  }, []);

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRefresh = () => {
    fetchPdfs();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredPdfs = pdfs.filter(pdf =>
    pdf.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box mt={4} textAlign="center">
      <Typography variant="h4" gutterBottom>
        View Uploaded Documents
      </Typography>
      <Box sx={{ maxWidth: '1000px', margin: '0 auto', p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
          <TextField
            variant="outlined"
            placeholder="Search PDFs"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon />
            }}
            sx={{ width: '70%' }}
          />
          <Button variant="contained" color="primary" onClick={handleRefresh} startIcon={<RefreshIcon />}>
            Refresh
          </Button>
        </Box>
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
          <Table size="medium">
            <TableHead>
              <TableRow style={{ backgroundColor: '#d32f2f' }}>
                <TableCell style={{ fontWeight: 'bold', fontSize: 18, color: 'white', fontFamily: 'Roboto' }}>File Name</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: 18, color: 'white', textAlign: 'center' }}>View PDF</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: 18, color: 'white', textAlign: 'center' }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPdfs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pdf, index) => (
                <TableRow key={pdf.id} style={{ height: '50px', backgroundColor: index % 2 === 0 ? '#f7f7f7' : '#ffffff' }}>
                  <TableCell style={{ padding: '10px' }}>
                    <Typography style={{ fontWeight: 'bold', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {pdf.name}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>
                    <Link href={pdf.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue' }}>
                      <Tooltip title="View PDF" arrow>
                        <img src={pdficon} alt="PDF Icon" style={{ width: '36px', height: '36px' }} />
                      </Tooltip>
                    </Link>
                  </TableCell>
                  <TableCell style={{ padding: '10px', textAlign: 'center' }}>
                    <Tooltip title="Delete PDF" arrow>
                      <IconButton onClick={() => handleDelete(pdf.id, pdf.name)} aria-label="delete">
                        <DeleteIcon style={{ color: '#d32f2f', fontSize: 24 }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredPdfs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default ListPDFs;
