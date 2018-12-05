'use strict';
const fs = require('fs')
const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pathConfig = './config.json';
let dbUri = fs.existsSync(pathConfig) ? require('./config').MONGO_URI : 'mongodb://localhost';

mongoose.connect(`${dbUri}/shortener`);
console.log(dbUri);
const cors = require('cors');

const app = express();
const apiRouter = require('./routers/apiRouter');
// Basic Configuration
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: false}));

/** this project needs a db !! **/
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/api', apiRouter);

app.listen(port, function() {
  console.log('Node.js listening ...');
});