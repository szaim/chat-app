var socket = io(); 

var name = getUrlParameter('name');;

console.log("name", name);

$("form").submit(function() {
  socket.emit("chatMessage", $("#m").val());
  $("#m").val('');
  return false;
});

socket.on("chatMessage", function(msg) {
  $("#messages").append("<li>" + msg + "</li>") 
})