const jwt = require("jsonwebtoken");

const privateKey = require("./privatekey");

// SIGN API -> (Payload , Private Key,[options,callback])

// Synchronous Sign With RS256
var token = jwt.sign({ foo: "bar" }, privateKey);

console.log("Token  : ", token);

const decoded = jwt.verify(token, privateKey);

console.log("Payload : ", decoded.foo, " Expiry :", new Date(decoded.iat));
