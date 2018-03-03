var arp = require('node-arp');

arp.getMAC('192.168.50.11', function(err, mac) {
    if (!err) {
        console.log(mac);
    }
});
