var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var request = require('request');

io.on('connection', function (socket) {
  socket.broadcast.emit('USER_CONNECTED');

  socket.on('CHAT_MESSAGE', function (msg) {
    io.emit('CHAT_MESSAGE', msg);
  });

  socket.on('disconnect', function () {
    socket.broadcast.emit('USER_DISCONNECTED');
  });
});

http.listen(3001, function () {
  console.log('listening on *:3001');
});