import React, { useEffect, useState } from 'react';
import { listAll, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link, IconButton, Tooltip, TextField, TablePagination, Button, Avatar, CircularProgress, Snackbar, Alert, Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import DocumentIcon from '@mui/icons-material/Description';
import pdficon from './images/pdficon.svg';
import { ReactTyped as Typed } from 'react-typed';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; 
import { Event, Home, PhotoLibrary, EmojiEvents } from '@mui/icons-material';
import { useFontSize } from './FontSizeContext';
const fontSize = 16;
const TypedCarousel = ({ textArray }) => {
    return (
        <Typed
            strings={textArray}
            typeSpeed={80} // Speed of typing in milliseconds
            backSpeed={50} // Speed of deleting in milliseconds
            loop // Whether to loop through the strings
        />
    );
};

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
        const folder = 'NBA'; // Specify the folder name
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
    
        // Sort the PDFs array alphabetically based on the name
        pdfData.sort((a, b) => a.name.localeCompare(b.name));
    
        setPdfs(pdfData);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
      setLoading(false);
    };
    
  
    useEffect(() => {
      if (folder) {
        fetchPdfs(folder);
      }
    }, [folder]);
  
    const handleDelete = async (id, name) => {
      try {
        const fileRef = ref(storage, `${folder}/${name}`);
        await deleteObject(fileRef);
        const updatedPdfs = pdfs.filter(pdf => pdf.id !== id);
        setPdfs(updatedPdfs);
      } catch (error) {
        console.error('Error deleting file:', error);
        setError('Failed to delete the file.');
      }
    };
  
    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const handleRefresh = () => {
      if (folder) {
        fetchPdfs(folder);
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
  
  const text = [
    "WELCOME TO INTERNAL QUALITY ASSURANCE CELL - PTU"
];
  return (<box><Box
    mb={1} // Reduce margin bottom
    display="flex"
    justifyContent="center"
    alignItems="center"
    bgcolor="#d32f2f"
    color="white"
    p={1} // Reduce padding
    borderRadius={2}
  >
    <TypedCarousel textArray={text} />
    <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto', alignItems: 'center' }}>
      <Button component={RouterLink} to="/Register" color="inherit" startIcon={<Home />} sx={{ fontSize: `${fontSize}px` }}>
        REGISTER
      </Button>
      <Button component={RouterLink} to="/" color="inherit" startIcon={<Home />} sx={{ fontSize: `${fontSize}px` }}>
        HOME
      </Button>
      <Button component={RouterLink} to="/login" color="inherit" startIcon={<Home />} sx={{ fontSize: `${fontSize}px` }}>
        LOGIN
      </Button>
    </Box>
  </Box>
  <Box position="relative" display="flex" justifyContent="center" alignItems="center"  marginTop={-1} >
  <img src="./ptu.jpg" alt="Image" style={{ width: '100%', height: '600px', objectFit: 'cover' }} />
  <Typography
    variant="h4"
    component="div"
    style={{
      position: 'absolute',
      top: '40%', // Adjust the top position here
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Transparent white color
      backdropFilter: 'blur(10px)', // Adding a blur effect
      padding: '20px',
      whiteSpace: 'nowrap', // This ensures the text stays in a single row
    }}
  >
    NATIONAL BOARD OF ACCREDITATION 
  </Typography>
</Box>

<Box sx={{ maxWidth: '1000px', margin: '0 auto', p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(0px)' }}>
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        
       
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
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
                    <TableCell style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>
                      <Link href={pdf.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue' }}>
                        <Tooltip title="View PDF" arrow>
                          <img src={pdficon} alt="PDF Icon" style={{ width: '36px', height: '36px' }} />
                        </Tooltip>
                      </Link>
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
      </Box></box>
  
  );
};

export default ListPDFs;
