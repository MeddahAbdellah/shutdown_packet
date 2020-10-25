var wol = require("wake_on_lan");
var dgram = require("dgram");
var net  = require('net');
var server = dgram.createSocket("udp4");
var MAC = process.argv.slice(2)[0];
var magic_packet = wol.createMagicPacket(MAC);

server.on("listening", function () {
	var address = server.address();
    console.log("UDP Server listening on " + address.address + ":" + address.port);
    socket = dgram.createSocket(net.isIPv6('255.255.255.255') ? 'udp6' : 'udp4');
    socket.once('listening', function() {
        socket.setBroadcast(true);
    });
    socket.send(MAC, 0, MAC.length, 9, '255.255.255.255');
    
});

server.on("message", function (message, remote) {
    console.log("MESSAGE", message.toString());
	if(message.toString() == MAC) {
		console.log("shutdown");
    }
});

server.bind("9", "0.0.0.0");