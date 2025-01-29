const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Replace with your Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = { admin, db };