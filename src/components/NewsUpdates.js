import React, { useEffect, useState } from 'react';
import { storage ,db, collection, query, orderBy, getDocs , addDoc, ref, uploadBytes, getDownloadURL, deleteObject, doc, deleteDoc} from '../firebase';
import './NewsUpdates.css';
import logo from './images/ptu-logo.png'; // Import your logo image
import { motion } from 'framer-motion';

const NewsUpdates = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedNews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), showPdf: false }));
      setNews(fetchedNews);
    };
    fetchNews();
  }, []);

  const toggleViewMore = async (index) => {
    setNews(prevNews =>
      prevNews.map((item, i) =>
        i === index ? { ...item, showPdf: !item.showPdf } : item
      )
    );

    // Fetch the latest data after toggling showPdf
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const fetchedNews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), showPdf: false }));
    setNews(fetchedNews);
  };

  return (
    <motion.div
      className="news-updates"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="news-heading" style={{ backgroundColor: 'red', color: 'white', height: '50px' }}> News & Updates</h2>

      <motion.div
        className="news-updates-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ul className="news-updates-list">
          {news.map((item, index) => (
            <motion.li
              key={index}
              className="news-item"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="news-content-container">
                <div className="news-content">
                  <div className="news-text">
                    <img src={logo} alt="Logo" className="news-logo" style={{ width: '30px', height: '30px' }} />
                    <strong className="news-title">{item.title}</strong>
                    <p className="news-description">{item.description}</p>
                  </div>
                  <div className="news-actions">
                    {item.pdfURL ? (
                      <a href={item.pdfURL} target="_blank" rel="noopener noreferrer" className="view-pdf-btn">
                        View PDF
                      </a>
                    ) : (
                      <button className="view-more-btn" onClick={() => toggleViewMore(index)}>
                        View More
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {item.showPdf && (
                <motion.div
                  className="pdf-preview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <embed src={item.pdfURL} type="application/pdf" className="pdf-embed" />
                </motion.div>
              )}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default NewsUpdates;
