/*
// [START app]
'use strict';

var cookieParser = require('socket.io-cookie');

var http = require('http');
var express = require('express');
var request = require('request');


var app = express();

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  getExternalIp(function (externalIp) {
    res.render('index.jade', {externalIp: externalIp});
  });
});

// [START external_ip]
// In order to use websockets on App Engine, you need to connect directly to
// application instance using the instance's public external IP. This IP can
// be obtained from the metadata server.
var METADATA_NETWORK_INTERFACE_URL = 'http://metadata/computeMetadata/v1/' +
    '/instance/network-interfaces/0/access-configs/0/external-ip';

function getExternalIp (cb) {
  var options = {
    url: METADATA_NETWORK_INTERFACE_URL,
    headers: {
      'Metadata-Flavor': 'Google'
    }
  };

  request(options, function (err, resp, body) {
    if (err || resp.statusCode !== 200) {
      console.log('Error while talking to metadata server, assuming localhost');
      return cb('localhost');
    }
    return cb(body);
  });
}
// [END external_ip]

// Additionally listen for non-websocket connections on the default App Engine
// port 8080. Using http.createServer will skip express-ws's logic to upgrade
// websocket connections.
var server = http.createServer(app).listen(process.env.PORT || '8080', function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
// [END app]


// setup new webserver for socket.io listening on 65080
var app_chat = require('express')();
var server1 = require('http').Server(app_chat);
var io = require('socket.io')(server1);
server1.listen(65080);

io.on('connection', function (socket) {
  console.log('user connected');
  socket.on('chat_message', function (data) {
    console.log('client sent:',data);
    socket.emit('chat_message', 'Server is echoing your message: ' + data);
  });
});

io.use(cookieParser);
io.use(function (socket,next){
	console.log('cookie = ', socket.request.headers.cookie.some.Cookie);
})
*/


const linebot = require('linebot');
const express = require('express');
const app = express();

const http = require('http');
const WebSocket = require('ws');

var bot = linebot({
	channelId: 1545478043,
	channelSecret: "6044e597d61c6c0c6717bb1e429fa7f5",
	channelAccessToken: "j+dbTcZLPR1xEECtAOrjgmuSqpRxEwfLKQMsU6YGAQIqJuEM37tv3xXfWz/0JGk6jkYFNQZHwSi1naI8JGmKRUgQvboyn0pflZx964QuMQtIAiVIivtGk6JDWfjAme7ukFNIvKGnChCkmDm45+cm+wdB04t89/1O/w1cDnyilFU="
});

//http for linebot
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var lineserver = app.listen(process.env.PORT || 8080, function() {
  console.log("App now running on port", lineserver.address().port);
});

var wss = new WebSocket.Server({server: lineserver})
console.log('websocket server created')

var LabVIEWclient = null; 
var LINEmsg = ''
/*
wss.on('connection', function(ws) {
	
	console.log('websocket connection open')
	LabVIEWclient = ws;
		
	LabVIEWclient.on('message',function (LabVIEWmsg) {
		console.log('Received from LabVIEW: ', LabVIEWmsg);
		
		var LINE=LabVIEWmsg.split(',');
		bot.push(LINE[0],LINE[1])
//		if (LINE[0] == '0' && LINE[1] == 'status') { 
		
// 			if (LINEmsg != ''){
//			console.log('LINEmsg: ', LINEmsg);
//			LabVIEWclient.send(LINEmsg);
//			LINEmsg = '';
//			}/*else{
/* 			console.log('alive');
			LabVIEWclient.send('alive');			
			}  
//		} else if (LINE[1] == 'open OK') {
//			bot.push(LINE[0],LINE[1])
		});

	

	LabVIEWclient.on("close", function() {
	console.log('websocket connection close')
	});

})

*/

bot.on("message", function(event) {
	console.log ('LineEVENT: ', event.message.text)
	
	event.reply({
		type: 'sticker',
		packageId: '1',
		stickerId: '1'
	});
	
	
	
});
	





