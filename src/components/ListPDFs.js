import React, { useEffect, useState } from 'react';
import { listAll, ref, getDownloadURL, deleteObject, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Link, IconButton, Tooltip, TextField, TablePagination, Button, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip, Divider, Avatar, CircularProgress, Grow, Slide, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Switch, FormControlLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DocumentIcon from '@mui/icons-material/Description';
import FileUploadIcon from '@mui/icons-material/CloudUpload';
import PreviewIcon from '@mui/icons-material/Preview';
import CloudDownload from '@mui/icons-material/CloudDownload';
import { debounce } from 'lodash';
import { useDropzone } from 'react-dropzone';

const ListPDFs = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [pdfs, setPdfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [darkMode, setDarkMode] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const downloadPdf = (url, fileName) => {
    console.log('Downloading PDF from URL:', url); // Log the URL
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const downloadUrl = window.URL.createObjectURL(blob);
        console.log('Download URL:', downloadUrl); // Log the blob URL
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl); // Clean up the blob URL
      })
      .catch(error => {
        console.error('Error downloading PDF:', error);
        showSnackbar('Error downloading PDF', 'error');
      });
  };

  const fetchFolders = async () => {
    try {
      const storageRef = ref(storage);
      const result = await listAll(storageRef);
      const folderNames = result.prefixes.map(prefix => prefix.name);
      setFolders(folderNames);
    } catch (error) {
      console.error('Error fetching folders:', error);
      showSnackbar('Error fetching folders', 'error');
    }
  };

  const fetchPdfs = async (folder) => {
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
      showSnackbar('Error fetching PDFs', 'error');
    }
    setLoading(false);
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
      showSnackbar('File deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting file:', error);
      showSnackbar('Error deleting file', 'error');
    }
  };

  const handleSearch = debounce((e) => {
    setSearchQuery(e.target.value);
  }, 300);

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
    setPage(0);
  };

  const filteredPdfs = pdfs.filter(pdf =>
    pdf.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handlePreviewOpen = (url) => {
    setPreviewUrl(url);
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
    setPreviewUrl('');
  };

  const onDrop = async (acceptedFiles) => {
    const folder = selectedFolder;
    if (!folder) {
      showSnackbar('Please select a folder first', 'warning');
      return;
    }
    setLoading(true);
    try {
      await Promise.all(
        acceptedFiles.map(async (file) => {
          const fileRef = ref(storage, `${folder}/${file.name}`);
          await uploadBytesResumable(fileRef, file);
        })
      );
      fetchPdfs(folder);
      showSnackbar('Files uploaded successfully', 'success');
    } catch (error) {
      console.error('Error uploading files:', error);
      showSnackbar('Error uploading files', 'error');
    }
    setLoading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'application/pdf' });

  return (
    <Box mt={4} textAlign="center" sx={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000', minHeight: '100vh', transition: 'background-color 0.3s, color 0.3s' }}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ marginBottom: 2 }}>
        <Avatar sx={{ bgcolor: darkMode ? '#ff7961' : 'error.main', mb: 2 }}>
          <DocumentIcon />
        </Avatar>
        <Typography variant="h5" gutterBottom>
          VIEW DOCUMENTS
        </Typography>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} color="primary" />}
          label="Dark Mode"
        />
      </Box>
      <Divider sx={{ width: '100%', mb: 2, bgcolor: darkMode ? '#555' : '#ddd' }} />
      <Box sx={{ maxWidth: '1000px', margin: '0 auto', p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: darkMode ? 'rgba(50, 50, 50, 0.8)' : 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', transition: 'background-color 0.3s' }}>
        <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
          <FormControl variant="outlined" sx={{ width: '30%' }}>
            <InputLabel>Select Folder</InputLabel>
            <Select
              value={selectedFolder}
              onChange={handleFolderChange}
              input={<OutlinedInput label="Select Folder" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'error.main', mr: 1 }}>
                    <FolderOpenIcon />
                  </Avatar>
                  <Chip label={selected} />
                </Box>
              )}
            >
              {folders.map((folder, index) => (
                <MenuItem
                  key={index}
                  value={folder}
                  sx={{
                    color: darkMode ? '#fff' : '#000',
                    backgroundColor: selectedFolder === folder ? 'rgba(255, 0, 0, 0.1)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    },
                  }}
                >
                  <Avatar sx={{ bgcolor: 'error.main', mr: 1 }}>
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
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
            sx={{ width: '50%' }}
          />
          <Button variant="contained" color="primary" onClick={handleRefresh} startIcon={<RefreshIcon />}>
            Refresh
          </Button>
        </Box>
        <Box {...getRootProps()} sx={{ border: '2px dashed #ccc', padding: 2, textAlign: 'center', marginBottom: 2 }}>
          <input {...getInputProps()} />
          <Typography variant="body1">
            Drag & drop some files here, or click to select files
          </Typography>
          <FileUploadIcon fontSize="large" />
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, backgroundColor: darkMode ? '#424242' : '#fff' }}>
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
                    <TableRow key={pdf.id} style={{ height: '50px', backgroundColor: index % 2 === 0 ? (darkMode ? '#616161' : '#f7f7f7') : (darkMode ? '#757575' : '#ffffff') }}>
                      <Grow in={true} timeout={500}>
                        <TableCell style={{ padding: '10px' }}>
                          <Tooltip title={`File: ${pdf.name}`} arrow>
                            <Typography style={{ fontWeight: 'bold', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {pdf.name}
                            </Typography>
                          </Tooltip>
                        </TableCell>
                      </Grow>
                      <Grow in={true} timeout={700}>
                        <TableCell style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>
                          <Link href={pdf.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue' }}>
                            <Tooltip title="View PDF" arrow>
                              <IconButton onClick={() => handlePreviewOpen(pdf.url)} aria-label="preview">
                                <PreviewIcon style={{ color: '#d32f2f', fontSize: 24 }} />
                              </IconButton>
                            </Tooltip>
                          </Link>
                          <Tooltip title="Download PDF" arrow>
                            <IconButton onClick={() => downloadPdf(pdf.url, pdf.name)} aria-label="download">
                              <CloudDownload style={{ color: '#d32f2f', fontSize: 24 }} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </Grow>
                      <Grow in={true} timeout={900}>
                        <TableCell style={{ padding: '10px', textAlign: 'center' }}>
                          <Tooltip title="Delete PDF" arrow>
                            <IconButton onClick={() => handleDelete(pdf.id, pdf.name)} aria-label="delete">
                              <DeleteIcon style={{ color: '#d32f2f', fontSize: 24 }} />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </Grow>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Slide>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog open={previewOpen} onClose={handlePreviewClose} maxWidth="lg" fullWidth>
        <DialogTitle>PDF Preview</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Use the controls below to navigate through the PDF.
          </DialogContentText>
          <iframe src={previewUrl} width="100%" height="600px" title="PDF Preview" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePreviewClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListPDFs;
