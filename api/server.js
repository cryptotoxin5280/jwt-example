'use strict';
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize DB Connection
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const dbName = process.env.DBNAME || 'smr-iot';
mongoose.connect(
  `mongodb://localhost:27017/${dbName}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=>console.log('DB server connected!'))
  .catch((e) => console.log('DB error!', e));

// Set server options
app.use(express.json());
app.use(cors());

// Initialize routes
const routes = require('./routes');
app.use(routes);

// TODO: Create default 'admin' user if one doesn't already exist.

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`SMR Config Manager API started on Port ${PORT}`);
});
