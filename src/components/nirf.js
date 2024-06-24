import React, { useEffect, useState } from 'react';
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link, Tooltip, TextField, TablePagination, CircularProgress, Snackbar, Alert, Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import DocumentIcon from '@mui/icons-material/Description';
import pdficon from './images/pdficon.svg';

const ListPDFs = ({ folder }) => {
  const [pdfs, setPdfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPdfs = async () => {
    setLoading(true);
    try {
      const folderRef = ref(storage, folder);
      const listResponse = await listAll(folderRef);

      const urls = await Promise.all(
        listResponse.items.map(itemRef => getDownloadURL(itemRef))
      );

      const pdfData = listResponse.items.map((itemRef, index) => ({
        id: index,
        name: itemRef.name,
        url: urls[index],
      }));

      pdfData.sort((a, b) => a.name.localeCompare(b.name));

      setPdfs(pdfData);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (folder) {
      fetchPdfs();
    }
  }, [folder]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRefresh = () => {
    if (folder) {
      fetchPdfs();
    }
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

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Box mt={4} textAlign="center">
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        fontFamily='Poppins, sans-serif'
        sx={{ marginBottom: 2 }}
      >
        <Typography variant="h5" gutterBottom>
          {`NATIONAL INSTITUTIONAL RANKING FRAMEWORKS`}
        </Typography>
      </Box>

      <Box sx={{ maxWidth: '1000px', margin: '0 auto', p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(0px)' }}>
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
          <TextField
            label="Search PDFs"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              endAdornment: (
                <SearchIcon />
              ),
            }}
          />
        
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} elevation={3}>
            <Table size="medium">
              <TableHead>
                <TableRow style={{ backgroundColor: '#d32f2f' }}>
                  <TableCell style={{ fontWeight: 'bold', fontSize: 18, color: 'white', fontFamily: 'Roboto' }}>File Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: 18, color: 'white', textAlign: 'center' }}>View PDF</TableCell>
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
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
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
