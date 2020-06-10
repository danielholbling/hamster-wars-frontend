// IMPORTS
const admin = require("firebase-admin");




// INITS

// Firebase-admin
admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": "hamster-wars-daniel",
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL
    }),
    databaseURL: process.env.DB_URL,
    storageBucket: process.env.BUCKET
});

// Firestore and storage
const db = admin.firestore();
const storage = admin.storage();




// EXPORTS
module.exports = { db, storage };