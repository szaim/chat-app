var socket = io(); 

var messageForm = $("#chatForm");
var message = $("#messages");
var name = getUrlParameter('name');
// var $user = $("#user");

// var room = getUrlParameter('room');
$(".title").append(name)

messageForm.submit(function() {
	  socket.emit("send message", $("#m").val());
	  $("#m").val('');
	  return false;
});

socket.on("new message", function(data) {
  $("#messages").append("<li><span>"+ data.user + "</span>: " + data.msg + "</li>") 
});

socket.emit("new user", name);

socket.on("get users", function(data) {
	var html = "";
	for(var i = 0; i < data.length; i++) {
		html += '<li>' + data[i] + '</li>'
	}

	$(".users").html(html);
})

//notify user


socket.emit('notify user', name);


socket.on("notify user", function(data) {
	console.log(data.user)
	if(data.user != name) {
		$("#notifyUser").text(data.user + " is typing ...")
	}
	setTimeout(function() {
		$("#notifyUser").text('')
	}, 10000)
})