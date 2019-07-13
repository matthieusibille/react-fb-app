const config = require('./config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const PORT = 4000;
const api = require('./routes/api') 
const app = express();
   
var http = require('http');
var server = http.createServer(app)

//DATABASE
const mongoose = require('mongoose');
const db = config.dbUri

var corsOptions = {
  origin: config.appUrl,
  optionsSuccessStatus: 200,
  credentials: true 
}

// WEB SOCKET
const io = require('socket.io').listen(server);
const socket = require('./modules/socket')(io);

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api', api);

mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false }, err => {
  if (err) {
      console.log(err)
  } else {
      console.log('MongoDB connected')
  }
} )

/* 
app.get('/uploads/:name', function (req, res, next) {

  var options = {
    root: __dirname + '/uploads/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      //console.log('Sent:', fileName);
    }
  });

});
 */
server.listen(process.env.PORT || PORT, function () {
  console.log('Server ON')
})

