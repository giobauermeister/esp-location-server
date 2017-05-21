var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '/public')));

var locationData;

//server.listen(3000, '192.168.0.24', function() {
//	var host = server.address().address
//	var port = server.address().port
//	console.log("Server listening on %s:%s...", host, port);
//});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/location', function(req, res) {
	locationData = req.body
	io.emit('locationEvent', locationData);	
});
