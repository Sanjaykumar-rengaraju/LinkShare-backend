require("dotenv").config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimiter = require('./middlewares/rateLimiter');
const folderRoutes = require('./routes/folderRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use('/api', folderRoutes);

module.exports = app;