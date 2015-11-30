//figure out how to ping a computer.
var ping = require('net-ping');
var fs = require('fs');
var os = require('os');

var options = {
    networkProtocol: ping.NetworkProtocol.IPv4,
    packetSize: 16,
    retries: 1,
    sessionId: (process.pid % 65535),
    timeout: 2000,
    ttl: 128
};

var session = ping.createSession(options);

//figure out how to make an array with 255 addresses
var ipStart = 0;
var ipEnd = 255;

var target = [];

while(ipStart < ipEnd+1){
  target.push('10.0.0.' + ipStart++);
}

target.forEach(function(item, index, array){
   session.pingHost (item, function (error, item, sent, rcvd) {
        var ms = rcvd - sent;
        if (error) {
            console.log (item + ": " + error.toString ());
        } else {
            var output = item + ": Alive (ms=" + ms + ")";
            console.log (output);
            fs.appendFile('activeIP.txt', output + "\n", function(err){
               if (err) return console.log(err); 
            });
        }
    });
});