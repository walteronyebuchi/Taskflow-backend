const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Replace with your Firebase service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

// Test API endpoint
app.get('/', (req, res) => {
  res.send('TaskFlow Backend is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});