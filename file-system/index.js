const fs = require("fs");

// Asynchronous Deletion Of a File
// fs.unlink("app.js", err => {
//   if (err) throw err;
//   console.log("Successfully Deleted app.js");
// });

try {
  fs.unlinkSync("app.js");
  for (let i = 0; i < 10; i++) console.log(i);
  console.log("Successfully Deleted app.js");
} catch (err) {
  // Handle The Error
}
