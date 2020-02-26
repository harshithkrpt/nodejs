const jwt = require("jsonwebtoken");
const privateKey = require("./privatekey");

// Sign Asynchronously
jwt.sign(
  { foo: "bar", iat: Math.floor(Date.now()) - 30 },
  privateKey,
  (err, token) => {
    if (!err) console.log(token);

    jwt.verify(token, privateKey, (err, decoded) => {
      console.log(
        "Payload : ",
        decoded.foo,
        " Expiry :",
        new Date(decoded.iat)
      );
    });
  }
);
