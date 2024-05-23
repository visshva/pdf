import React, { useEffect, useState } from 'react';
import { listAll, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link, IconButton, Tooltip, TextField, TablePagination, Button, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import pdficon from './images/pdficon.svg';

const ListPDFs = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [pdfs, setPdfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchFolders = async () => {
    try {
      const storageRef = ref(storage);
      const result = await listAll(storageRef);
      const folderNames = result.prefixes.map(prefix => prefix.name);
      setFolders(folderNames);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const fetchPdfs = async (folder) => {
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

      // Sort the PDFs array alphabetically based on the name
      pdfData.sort((a, b) => a.name.localeCompare(b.name));

      setPdfs(pdfData);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    if (selectedFolder) {
      fetchPdfs(selectedFolder);
    }
  }, [selectedFolder]);

  const handleDelete = async (id, name) => {
    try {
      const fileRef = ref(storage, `${selectedFolder}/${name}`);
      await deleteObject(fileRef);
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
    if (selectedFolder) {
      fetchPdfs(selectedFolder);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFolderChange = (event) => {
    setSelectedFolder(event.target.value);
    setPage(0); // Reset pagination when folder changes
  };

  const filteredPdfs = pdfs.filter(pdf =>
    pdf.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box mt={4} textAlign="center">
      <Typography variant="h4" gutterBottom>
        VIEW DOCUMENTS
      </Typography>
      <Box sx={{ maxWidth: '1000px', margin: '0 auto', p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
          <FormControl variant="outlined" sx={{ width: '30%' }}>
            <InputLabel>Select Folder</InputLabel>
            <Select
              value={selectedFolder}
              onChange={handleFolderChange}
              input={<OutlinedInput label="Select Folder" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                    <FolderOpenIcon />
                  </Avatar>
                  <Chip label={selected} />
                </Box>
              )}
            >
              {folders.map((folder, index) => (
                <MenuItem key={index} value={folder}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                    <FolderOpenIcon />
                  </Avatar>
                  {folder}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            placeholder="Search PDFs"
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon />
            }}
            sx={{ width: '50%' }}
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

