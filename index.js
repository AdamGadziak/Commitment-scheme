var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
 console.log('a user ' + socket.id + ' connected');
  socket.on('commitment', function(R1, y){
    console.log(socket.id + ' message: ' + R1 + " " + y);
    socket.broadcast.emit('commitment', R1, y);
  });
  socket.on('discover', function(b, R1, R2){
  	socket.broadcast.emit('discover', b, R1, R2);
  })
 socket.on('disconnect', function(){
   console.log('user' + socket.id + ' disconnected');
 });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
