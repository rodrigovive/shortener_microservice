'use strict';

const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');

const cors = require('cors');

const app = express();
const apiRouter = require('./routers/apiRouter')
// Basic Configuration
const port = process.env.PORT || 3000;

/** this project needs a db !! **/
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/api',apiRouter)



app.listen(port, function () {
  console.log('Node.js listening ...');
});