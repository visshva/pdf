import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the import path as per your project structure
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { format } from 'date-fns';

const AnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [editAnnouncementId, setEditAnnouncementId] = useState(null);
  const [editedAnnouncement, setEditedAnnouncement] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'announcements'));
        const announcementsData = [];
        querySnapshot.forEach((doc) => {
          announcementsData.push({ id: doc.id, text: doc.data().text, timestamp: doc.data().timestamp.toDate() });
        });
        setAnnouncements(announcementsData);
      } catch (error) {
        console.error('Error fetching announcements: ', error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleAddAnnouncement = async () => {
    try {
      const timestamp = new Date();
      const docRef = await addDoc(collection(db, 'announcements'), { text: newAnnouncement, timestamp });
      setAnnouncements([...announcements, { id: docRef.id, text: newAnnouncement, timestamp }]);
      setNewAnnouncement('');
    } catch (error) {
      console.error('Error adding announcement: ', error);
    }
  };

  const handleEditAnnouncement = async (announcementId, newText) => {
    try {
      await updateDoc(doc(db, 'announcements', announcementId), { text: newText });
      const updatedAnnouncements = announcements.map((ann) =>
        ann.id === announcementId ? { ...ann, text: newText } : ann
      );
      setAnnouncements(updatedAnnouncements);
      setEditAnnouncementId(null);
      setEditedAnnouncement('');
    } catch (error) {
      console.error('Error editing announcement: ', error);
    }
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    try {
      await deleteDoc(doc(db, 'announcements', announcementId));
      setAnnouncements(announcements.filter((announcement) => announcement.id !== announcementId));
    } catch (error) {
      console.error('Error deleting announcement: ', error);
    }
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', maxWidth: '800px', margin: '0 auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          textAlign: 'center',
          padding: '10px 0',
        }}
      >
        Announcements
      </Typography>
      <Box sx={{ marginBottom: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '20px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <TextField
          label="New Announcement"
          variant="outlined"
          size="small"
          fullWidth
          value={newAnnouncement}
          onChange={(e) => setNewAnnouncement(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddAnnouncement} sx={{ marginTop: '10px', display: 'block', marginLeft: 'auto' }}>
          Post
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Announcement</TableCell>
              <TableCell>Posted At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {announcements.map((ann) => (
              <TableRow key={ann.id}>
                <TableCell component="th" scope="row">
                  {editAnnouncementId === ann.id ? (
                    <TextField
                      size="small"
                      fullWidth
                      value={editedAnnouncement}
                      onChange={(e) => setEditedAnnouncement(e.target.value)}
                    />
                  ) : (
                    <Typography variant="body1">{ann.text}</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {format(ann.timestamp, 'PPP p')}
                </TableCell>
                <TableCell align="right">
                  {editAnnouncementId === ann.id ? (
                    <>
                      <IconButton onClick={() => handleEditAnnouncement(ann.id, editedAnnouncement)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={() => setEditAnnouncementId(null)}>
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => {
                        setEditAnnouncementId(ann.id);
                        setEditedAnnouncement(ann.text);
                      }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteAnnouncement(ann.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AnnouncementBanner;
