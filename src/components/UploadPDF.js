import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import {
  Button,
  Box,
  Typography,
  Link,
  TextField,
  Grid,
  Container,
  Paper,
  ThemeProvider,
  createTheme,
  LinearProgress,
  Alert,
  AlertTitle
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const UploadPDF = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(""); // State to store file name
  const [url, setUrl] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name); // Set the file name
    }
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value); // Update the file name
  };

  const handleUpload = () => {
    if (!file) return;
    setError("");
    setUploadMessage("");
    const storageRef = ref(storage, `pdfs/${fileName}`);
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
          setUrl(url);
          setUploadMessage("File uploaded successfully!");
          setProgress(0);
        });
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Paper elevation={20} sx={{ padding: 4, marginTop: 4 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h4" gutterBottom>
              Upload Documents
            </Typography>
            <input
              accept="application/pdf"
              style={{ display: 'none' }}
              id="upload-file"
              type="file"
              onChange={handleChange}
            />
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={4}>
                <label htmlFor="upload-file">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUpload />}
                    fullWidth
                  >
                    Choose File
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  label="File Name"
                  variant="outlined"
                  fullWidth
                  value={fileName}
                  onChange={handleFileNameChange} // Allow editing of file name
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  disabled={!file || !fileName} // Disable upload button if file or file name is not selected
                  fullWidth
                >
                  Upload
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
            {url && (
              <Box mt={2}>
                <Link href={url} target="_blank" rel="noopener noreferrer">
              
                </Link>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default UploadPDF;
