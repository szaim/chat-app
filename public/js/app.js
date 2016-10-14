var socket = io(); 

var messageForm = $("#chatForm");
var message = $("#messages");
var name = getUrlParameter('name');
var room = getUrlParameter('room');

$("#title").append(name);

messageForm.submit(function() {
	  socket.emit("send message", $("#m").val());
	  $("#m").val('');
	  return false;
});

socket.on("new message", function(data) {
if(data.user == name) {
$(".messages").append("<div class='right-message'><div style='text-align: right; margin-right: 10px;' class='chat-box-name-right'>"+ data.user + "</div>" + "<div class='chat-box-right'>"+ data.msg + "</div></div>");

} else{
$(".messages").append("<div class='left-message'><div style='text-align: left; margin-left: 10px;' class='chat-box-name-right'>"+ data.user + "</div>" + "<div class='chat-box-right'>"+ data.msg + "</div></div>");
}
$(".chat-box-main").scrollTop($('.chat-box-left').height());

});

// $(".private_message" ).click(function () {
// 	console.log("asdas");
// });
       

// socket.emit("create room", room);


// socket.on("event", function(data) {
//   console.log("message: ", data);

// });



socket.emit("new user", name);

socket.on("get users", function(data) {
	var html = "";
	for(var i = 0; i < data.length; i++) {
		html += "<li class='private_message' value='" + data[i] + "'><a data-toggle='modal' data-target='#myModal' href=\"#\">"  + data[i] + "</a></li>"
	}

	$("#users").html(html);
	$("#userCount").html(data.length);
});

$("#m").on('keypress', function() {
	socket.emit('notify user', name);
});



$("#users").on("click", ".private_message", function(e) {
	e.preventDefault();
	console.log($(this).text());
	$("#userName").html("Private Message to " + $(this).text());
})


socket.on("notify user", function(data) {

	if(data.user != name) {
		$("#notifyUser").html(data.user + " is typing ..." + "<img class=\"img-circle\" src=\"/images/typing.png\"/>");
	}
	setTimeout(function() {
		$("#notifyUser").text('')
	}, 1000)
});



