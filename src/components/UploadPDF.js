import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { getAuth, signOut } from 'firebase/auth';
import { storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Box,
  Typography,
  TextField,
  Grid,
  Container,
  LinearProgress,
  Alert,
  AlertTitle,
  Autocomplete,
  Card,
  CardContent,
  Divider,
  Avatar,
  IconButton,
  Paper,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import { CloudUpload, Refresh, CreateNewFolder, Delete, Folder } from '@mui/icons-material';
import UploadIcon from '@mui/icons-material/UploadFile';
import LogoutIcon from '@mui/icons-material/Logout';

const UploadPDF = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [folderToDelete, setFolderToDelete] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const storageRef = ref(storage);
      const allFolders = await listAll(storageRef);
      const folderNames = allFolders.prefixes.map(folderRef => folderRef.name);
      setFolders(folderNames);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const handleDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setFileName(uploadedFile.name);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop, accept: '.pdf' });

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleUpload = () => {
    if (!file || !selectedFolder) return;
    setError("");
    setUploadMessage("");
    const storageRef = ref(storage, `${selectedFolder}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        setError("Upload failed. Please try again.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUploadMessage("File uploaded successfully!");
          setProgress(0);
          setFile(null);
          setFileName("");
          fetchFolders();
        });
      }
    );
  };

  const handleRefresh = () => {
    setFile(null);
    setFileName("");
    setUploadMessage("");
    setError("");
    setProgress(0);
    fetchFolders();
  };

  const handleFolderChange = (event, value) => {
    setSelectedFolder(value);
  };

  const handleNewFolderChange = (event) => {
    setNewFolderName(event.target.value);
  };

  const handleFolderToDeleteChange = (event, value) => {
    setFolderToDelete(value);
  };

  const handleCreateNewFolder = async () => {
    try {
      if (newFolderName.trim() === '') {
        setError("Folder name cannot be empty");
        return;
      }
  
      const newFolderPath = `${newFolderName}/placeholder.txt`; // Create a placeholder file
      const newFolderRef = ref(storage, newFolderPath);
      await uploadBytesResumable(newFolderRef, new Blob([''])); // Upload an empty blob as the placeholder file
      setNewFolderName('');
      fetchFolders();
      setUploadMessage(`Folder "${newFolderName}" created successfully!`);
    } catch (error) {
      console.error('Error creating folder:', error);
      setError("Error creating folder. Please try again.");
    }
  };

  const handleDeleteFolder = async () => {
    if (!folderToDelete.trim()) {
      setError("Please select a folder to delete.");
      return;
    }
    try {
      setError("");
      setUploadMessage("");
      const folderRef = ref(storage, folderToDelete);
      await deleteFolderContents(folderRef);
      fetchFolders();
      setUploadMessage(`Folder "${folderToDelete}" deleted successfully!`);
      setFolderToDelete('');
    } catch (error) {
      console.error('Error deleting folder:', error);
      setError("Error deleting folder. Please try again.");
    }
  };

  const deleteFolderContents = async (folderRef) => {
    const folderContents = await listAll(folderRef);
    const deletePromises = [];

    for (const itemRef of folderContents.items) {
      deletePromises.push(deleteObject(itemRef));
    }

    for (const subFolderRef of folderContents.prefixes) {
      deletePromises.push(deleteFolderContents(subFolderRef));
    }

    await Promise.all(deletePromises);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Error logging out. Please try again.");
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <Card sx={{ marginTop: 2, borderRadius: 1, boxShadow: 0 }}>
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{ marginBottom: 2 }}
            >
              <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
                <UploadIcon />
              </Avatar>
              <Typography variant="h5" gutterBottom>
                UPLOAD DOCUMENTS
              </Typography>
              <Divider sx={{ width: '100%', mb: 2 }} />
              <Box display="flex" justifyContent="space-between" width="100%">
                <TextField
                  sx={{ width: '50%' }}
                  label="New Folder Name"
                  variant="outlined"
                  fullWidth
                  value={newFolderName}
                  onChange={handleNewFolderChange}
                />
                <IconButton
                  color="primary"
                  onClick={handleCreateNewFolder}
                  sx={{ ml: 1 }}
                >
                  <CreateNewFolder />
                </IconButton>
                <Autocomplete
                  sx={{ width: '50%' }}
                  options={folders}
                  value={folderToDelete}
                  onChange={(event, value) => handleFolderToDeleteChange(event, value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Folder to Delete"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                  renderOption={(props, option) => (
                    <ListItem {...props}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'error.main' }}>
                          <Folder />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={option} />
                    </ListItem>
                  )}
                  PaperComponent={({ children }) => (
                    <Paper style={{ background: '#f5f5f5', width: '100%' }}>{children}</Paper>
                  )}
                  PopperProps={{
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 5], // Adjust the offset as needed
                        },
                      },
                    ],
                  }}
                />
                <IconButton
                  color="error"
                  onClick={handleDeleteFolder}
                  sx={{ ml: 1 }}
                >
                  <Delete />
                </IconButton>
              </Box>
              <Box mb={2}  ></Box>
              <Autocomplete 
                options={folders}
                value={selectedFolder}
                onChange={handleFolderChange}
                renderInput={(params) => (
                  <TextField 
                    {...params}
                    label="Select Folder"
                    variant="outlined"
                    fullWidth
                  />
                )}
                renderOption={(props, option) => (
                  <ListItem {...props}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <Folder />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={option} />
                  </ListItem>
                )}
                PaperComponent={({ children }) => (
                  <Paper style={{ background: '#f5f5f5' }}>{children}</Paper>
                )}
                PopperProps={{
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 5], // Adjust the offset as needed
                      },
                    },
                  ],
                }}
                sx={{ width: '100%', mb: 2 }}
              />
              <div {...getRootProps()} style={{ width: '100%', padding: '10px', border: '2px dashed #ccc', textAlign: 'center', marginTop: '10px', cursor: 'pointer' }}>
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <Typography variant="body1">Drop the files here ...</Typography> :
                    <Typography variant="body1">Drag & drop a file here, or click to select a file</Typography>
                }
              </div>
              <TextField
                label="File Name"
                variant="outlined"
                fullWidth
                value={fileName}
                onChange={handleFileNameChange}
                sx={{ mt: 2 }}
              />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    onClick={handleUpload}
                    disabled={!file || !fileName || !selectedFolder}
                    fullWidth
                    sx={{
                      bgcolor: 'blue',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'green',
                      },
                    }}
                  >
                    Upload
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: 'error.main', '&:hover': { bgcolor: 'error.dark' } }}
                    onClick={handleRefresh}
                    startIcon={<Refresh />}
                    fullWidth
                  >
                    Refresh
                  </Button>
                </Grid>
              </Grid>
              {progress > 0 && (
                <Box width="100%" mt={2}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
              )}
              {uploadMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  <AlertTitle>Success</AlertTitle>
                  {uploadMessage}
                </Alert>
              )}
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  <AlertTitle>Error</AlertTitle>
                  {error}
                </Alert>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default UploadPDF;
