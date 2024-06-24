const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/project/iqacdoc/database/iqacdoc-default-rtdb/data/~2F'
});

// Set the sender email
admin.auth().settings.setEmailVerificationSenderEmail('visshva.mca@ptuniv.edu.in')
  .then(() => {
    console.log('Sender email set successfully');
  })
  .catch(error => {
    console.error('Error setting sender email:', error);
  });
