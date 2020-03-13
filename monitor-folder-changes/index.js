const watch = require("node-watch");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

watch("/home/sadvika/Downloads", { recursive: true }, function(evt, filename) {
  if (evt == "update") {
    // Move File to ~/Desktop/javascript/foldername
    const sourcePath = path.join(filename);
    console.log(sourcePath);
    filename = filename.split("/").pop();
    filename = filename.replace(/\.[^.]*$/, "");
    const destPath = path.join(
      "/home/sadvika/Desktop/javascript/front-end-libraries-freecodecamp",
      uuid.v1() + filename + ".js"
    );

    fs.rename(sourcePath, destPath, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log(filename + ".js" + "Successfully Moved ");
      }
    });
  }
});
