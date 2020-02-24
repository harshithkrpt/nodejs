const request = require("request");

const forecast = (data, callback) => {
  const url = `https://api.darksky.net/forecast/f1ff58360ab7c3968000720a295e1541/${data.latitude},${data.longitude}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Location not found", undefined);
    } else {
      callback(undefined, body);
    }
  });
};

module.exports = forecast;
