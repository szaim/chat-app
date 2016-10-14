

var express = require('express');
var app = express();
var PORT = process.env.PORT || 8000;
var http = require('http').Server(app); // this is a node server that uses express as the boiler plate
var io = require('socket.io')(http); // socket! pass our server as a parameter to it


// use express static to expose a folder
app.use(express.static(__dirname + '/public'));

app.get('/room', function (req, res) {
	res.sendfile('./public/index.html');
});

var users = [],
	connections = [];




// Register events on socket connection
io.on('connection', function(socket){ 
	connections.push(socket);
	console.log("connected socket", connections);

	socket.on("disconnect", function() {
		users.splice(users.indexOf(socket.username), 1);
		updateUsernames();
		connections.splice(connections.indexOf(socket), 1);
		console.log("disconnected socket", connections.length)
	});

	socket.on("send message", function(data) {
		console.log(data);
		io.emit("new message", {msg: data, user: socket.username});
	});


	socket.on("notify user", function(data) {
		io.emit("notify user", {user: socket.username})
	});


	socket.on("new user", function(data) {
		socket.username = data;
		users.push(socket.username);
		updateUsernames();

	});

	function updateUsernames() {
		io.emit("get users", users);
	};

	socket.on("private", function(msg, recipientName, sender) {
		var recipient = connections.filter(function (recipient) {
			return recipient.username === recipientName;
		})[0];
			console.log(recipient.id);
		io.to(recipient.id).emit("received private msg", msg, sender);

	});

	// socket.on("create room", function(room) {
	// 	socket.join(room);
	// 	io.sockets.in(room).emit('event', "hey wusup am in this room");
	// 	console.log(socket);

	// })

});

http.listen(PORT, function(){
  console.log('Server started on port ' + PORT);
});
