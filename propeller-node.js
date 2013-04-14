"use strict";
/*
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var propellerPort = "/dev/ttyS0";

var propRxBuffer = "Propeller Port not open yet.";

var serialOptions = {
    baudrate: 115200,
    databits: 8,
    stopbits: 1,
    parity: "none",
    buffersize: 256,
    parser: serialport.parsers.readline("\n")
};

var sp = new SerialPort(propellerPort, serialOptions);

sp.on("open", function () {
    console.log('Serial open.');
    propRxBuffer = "Propeller Port open. Nothing recieved yet...";

    sp.on('data', function (data) {
        console.log('Serial rx:', data);
        propRxBuffer = data;
    });

    sp.write("Some propeller command.\n");
});

sp.on("error", function (err) {
   console.log(err);
   propRxBuffer = "Error: " + err.message;
});

*/

// Fake serial port data source
var seqNo = 0;
setInterval(function () {
    propRxBuffer = "Prop message: #" + seqNo;
    seqNo += 1;
}, 1000);



var propRxBuffer = "Propeller Port not open yet.";

var SERVER_PORT = process.env.PORT;


// Load the http and express modules for our http server.
var http = require('http');
var express = require('express');
var app = express();

// Start the HTTP server on port 8080 and use app to serve pages.
var server = http.createServer(app);
server.listen(SERVER_PORT);

// Note all requests on the console and pass them back to express
app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url);
    next();
});

// Tell express to serve up static pages from directory "html"
app.use(express.static(__dirname + '/html'));

// But... /serial-buffer is generated here from the seral buffer.
app.get('/serial-buffer', function (req, res) {
	res.send(propRxBuffer);
});

// Web sockets
var io = require('socket.io').listen(server);
io.set('log level', 3);

var chat = io
    .of('/chat')
    .on('connection', function (socket) {
        console.log('chat socket open.');
        // Messages on a chat socket only go to that one chat connection
        setInterval(function () {
            socket.emit('chat message', 'Chat, chat..')
            ,1000
        });
    // Messages on chat will go to every chat connection.
    chat.emit('chat message', 'Hi every body!');
});

var news = io
    .of('/news')
    .on('connection', function (socket) {
        console.log('news socket open.');
        socket.emit('item', 'Propeller II release iminent');
});

// Put a friendly message on the terminal
console.log("Server running at "  + process.env.IP + ":" + SERVER_PORT + "/");


