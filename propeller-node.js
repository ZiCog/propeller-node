"use strict";

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var propellerPort = "/dev/ttyS0";

var SERVER_PORT = 8080;

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


// Load the http and express modules for our http server.
var http = require('http');
var express = require('express');
var app = express()

// Start the HTTP server on port 8080 and use app to serve pages.
var server = http.createServer(app);
server.listen(SERVER_PORT);

// Note all requests on the console and pass them back to experess
app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url);
    next();
});

// Tell express to serve up static pages from /public
app.use(express.static(__dirname + '/html'));

app.get('/serial-buffer', function (req, res) {
	res.send(propRxBuffer);
});


// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:" + SERVER_PORT + "/");


