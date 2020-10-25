var wol = require("wake_on_lan");
var dgram = require("dgram");
var server = dgram.createSocket("udp4");
var MAC = process.argv.slice(2)[0];
const { exec } = require("child_process");

server.on("listening", function () {
	var address = server.address();
    console.log("UDP Server listening on " + address.address + ":" + address.port);
});

server.on("message", function (message, remote) {
    console.log("MESSAGE", message.toString());
	if(message.toString() == MAC) {
        console.log("shutdown");
        exec(`shutdown -s -t 0`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }
});

server.bind("9", "0.0.0.0");