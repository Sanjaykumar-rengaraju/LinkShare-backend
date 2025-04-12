require("dotenv").config(); // Load environment variables from .env
const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path"); // Include path module

// Get Firebase config from environment variable and resolve it correctly
const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, process.env.FIREBASE_CONFIG_PATH), "utf-8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
