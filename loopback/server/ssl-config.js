var path = require('path'),
    fs = require("fs");
exports.privateKey = fs.readFileSync(path.join(__dirname, './ssl/privatekey.pem')).toString();
exports.certificate = fs.readFileSync(path.join(__dirname, './ssl/certificate.pem')).toString();

