var socket = io(); 

var messageForm = $("#chatForm");
var message = $("#messages");
var name = getUrlParameter('name');;

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