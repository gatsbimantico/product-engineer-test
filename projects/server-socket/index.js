var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var cypher = require('@pet/cypher/cypher.js');

app.use(bodyParser.json());

app.post('/api/decode', function (req, res) {
  var message = req.body.message;

  res.send(cypher.decoder(message));
});

app.post('/api/encode', function (req, res) {
  var message = req.body.message;

  res.send(cypher.encoder(message));
});

io.on('connection', function (socket) {
  socket.broadcast.emit('USER_CONNECTED');

  socket.on('CHAT_MESSAGE', function (data) {
    io.emit('CHAT_MESSAGE', data);
  });

  socket.on('SHARE_MESSAGE_HISTORY', function (data) {
    io.emit('MESSAGE_HISTORY', data);
  });

  socket.on('disconnect', function () {
    socket.broadcast.emit('USER_DISCONNECTED');
  });
});

http.listen(3001, function () {
  console.log('listening on *:3001');
});