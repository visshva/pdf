// AnnouncementBar.js
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the import path as per your project structure

const AnnouncementBar = () => {
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'announcements'));
        const announcements = [];
        querySnapshot.forEach((doc) => {
          announcements.push(doc.data().text);
        });
        if (announcements.length > 0) {
          setAnnouncement(announcements[0]); // Assuming you only have one announcement for simplicity
        }
      } catch (error) {
        console.error('Error fetching announcements: ', error);
      }
    };

    fetchAnnouncement();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
      {announcement}
    </Box>
  );
};

export default AnnouncementBar;
