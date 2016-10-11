

var express = require('express');
var app = express();
var PORT = process.env.PORT || 8000;
var http = require('http').Server(app); // this is a node server that uses express as the boiler plate
var io = require('socket.io')(http); // socket! pass our server as a parameter to it


// use express static to expose a folder
app.use(express.static(__dirname + '/public'));

// Register events on socket connection
io.on('connection', function(socket){ 
  socket.on("chatMessage", function(msg) {
   io.emit("chatMessage", msg);
  })
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

http.listen(PORT, function(){
  console.log('Server started on port ' + PORT);
});
