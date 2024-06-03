import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { Button, LinearProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { storage } from '../firebase';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [mediaList, setMediaList] = useState([]);
  const [mediaType, setMediaType] = useState('all');

  useEffect(() => {
    const fetchMediaList = async () => {
      const imagesRef = ref(storage, 'images');
      const videosRef = ref(storage, 'videos');

      const [imageFiles, videoFiles] = await Promise.all([listAll(imagesRef), listAll(videosRef)]);
      
      const imageUrls = await Promise.all(imageFiles.items.map(async item => {
        const url = await getDownloadURL(item);
        return { url, type: 'image' };
      }));

      const videoUrls = await Promise.all(videoFiles.items.map(async item => {
        const url = await getDownloadURL(item);
        return { url, type: 'video' };
      }));

      setMediaList([...imageUrls, ...videoUrls]);
    };

    fetchMediaList();
  }, []);

  const handleUpload = () => {
    if (!file) return;

    const fileType = file.type.includes('video') ? 'video' : 'image';

    if (fileType !== mediaType) {
      // Display an error message to the user
      console.error(`Selected file type (${fileType}) does not match the chosen media type (${mediaType})`);
      return;
    }

    const storageRef = ref(storage, fileType === 'video' ? `videos/${file.name}` : `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploading(true);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      error => {
        console.error('Upload error:', error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log('File available at', downloadURL);
          setUploading(false);
          setProgress(0);
          setFile(null);
          setMediaList(prevMediaList => [...prevMediaList, { url: downloadURL, type: fileType }]);
        });
      }
    );
  };

  const handleDelete = (url) => {
    const storageRef = ref(storage, url);
    deleteObject(storageRef)
      .then(() => {
        console.log('File deleted successfully');
        setMediaList(prevMediaList => prevMediaList.filter(media => media.url !== url));
      })
      .catch(error => {
        console.error('Error deleting file:', error);
      });
  };

  const handleMediaTypeChange = (event) => {
    setMediaType(event.target.value);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Image and Video Post
      </Typography>
      <FormControl fullWidth style={{ marginBottom: 16 }}>
        <InputLabel id="media-type-label">Select Media Type</InputLabel>
        <Select
          labelId="media-type-label"
          id="media-type-select"
          value={mediaType}
          onChange={handleMediaTypeChange}
        >
   
          <MenuItem value="image">Image</MenuItem>
          <MenuItem value="video">Video</MenuItem>
        </Select>
      </FormControl>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ display: 'none' }}
        id="file-input"
      />
      <label htmlFor="file-input">
        <Button variant="contained" component="span" fullWidth>
          Choose File
        </Button>
      </label>
      {file && (
        <div style={{ marginTop: 16 }}>
          <Typography variant="body1">File selected: {file.name}</Typography>
          <LinearProgress variant="determinate" value={progress} />
          <Button variant="contained" color="secondary" fullWidth onClick={handleDelete} style={{ marginTop: 16 }}>
            Delete
          </Button>
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleUpload}
        disabled={!file || uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
      <Typography variant="h6" style={{ marginTop: 32 }}>Uploaded Media</Typography>
      <TableContainer component={Paper} style={{ marginTop: 16 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mediaList.filter(media => mediaType === 'all' || media.type === mediaType).map((media, index) => (
              <TableRow key={index}>
                <TableCell>{media.type}</TableCell>
                <TableCell>{media.url}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(media.url)} color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Upload;
