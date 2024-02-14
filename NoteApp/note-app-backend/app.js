require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const notes = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

const db_uri = process.env.MONGODB_URI

mongoose.connect(db_uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Log a message when the MongoDB connection is established
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use routes
app.use('/', notes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
