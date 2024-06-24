import React, { useState, useEffect } from 'react';
import { db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL, deleteDoc, doc, deleteObject, query, getDocs } from '../firebase';
import { Button, TextField, TextareaAutosize, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import './UploadNews.css'; // Create this CSS file for styling

const UploadNews = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [scrolling, setScrolling] = useState(true); // State to control scrolling

  useEffect(() => {
    const fetchNews = async () => {
      const q = query(collection(db, 'news'));
      const querySnapshot = await getDocs(q);
      const fetchedNews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNewsList(fetchedNews);
    };
    fetchNews();
  }, []);

  // Function to handle play/pause functionality
  const handleScrolling = () => {
    setScrolling(prevState => !prevState);
  };

  // Continuous scrolling effect using setInterval
  useEffect(() => {
    let intervalId;
    if (scrolling) {
      intervalId = setInterval(() => {
        // Your scrolling logic here
        window.scrollBy(0, 1); // Example: Scroll 1 pixel down
      }, 50); // Adjust the interval as needed (milliseconds)
    }
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [scrolling]); // Dependency on 'scrolling' state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {
      let pdfURL = '';
      if (pdfFile) {
        const storageRef = ref(storage, `news_pdfs/${pdfFile.name}`);
        await uploadBytes(storageRef, pdfFile);
        pdfURL = await getDownloadURL(storageRef);
      }

      const newsData = {
        title,
        description,
        pdfURL,
        createdAt: new Date().toLocaleString(), // Current date and time
      };

      const docRef = await addDoc(collection(db, 'news'), newsData);
      setNewsList([...newsList, { id: docRef.id, ...newsData }]);
      setTitle('');
      setDescription('');
      setPdfFile(null);
      alert('News item added successfully!');
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleDelete = async (id, pdfURL) => {
    await deleteDoc(doc(db, 'news', id));
    if (pdfURL) {
      const storageRef = ref(storage, pdfURL);
      await deleteObject(storageRef);
    }
    setNewsList(newsList.filter(item => item.id !== id));
    alert('News item deleted successfully!');
  };

  return (
    <div className="upload-news">
      <h2>Upload News & Updates</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextareaAutosize
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rowsMin={3}
          required
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
        />
        <Button type="submit" variant="contained" color="primary">
          Upload
        </Button>
        <Button onClick={handleScrolling}>
          {scrolling ? 'Pause Scrolling' : 'Continue Scrolling'}
        </Button>
      </form>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newsList.map(news => (
            <TableRow key={news.id}>
              <TableCell>{news.title}</TableCell>
              <TableCell>{news.description}</TableCell>
              <TableCell>{news.createdAt}</TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(news.id, news.pdfURL)} variant="contained" color="secondary">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UploadNews;
