var connect = require('connect');
var http = require('http');
var app = connect();
var arp = require('node-arp');

// require request-ip and register it as middleware
var requestIp = require('request-ip');
app.use(requestIp.mw())

app.use(function(req, res) {
    // by default, the ip address will be set on the `clientIp` attribute
    var ip = req.clientIp;

    ip = ip.split(":");

    ip = ip[ip.length - 1];

    arp.getMAC(ip, function(err, mac) {
        if (!err) {
            res.end(mac + " - " + ip + "\n");
        }
    });
});

//create node.js http server and listen on port
http.createServer(app).listen(3000);

// test it locally from the command line
// > curl -X GET localhost:3000 # Hello, your ip address is ::1 and is of type IPv6
