const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];

geocode(address, (err, data) => {
  if (err) {
    return console.log(err);
  }

  forecast(data, (err, forecastData) => {
    if (err) {
      return console.log(err);
    }
    console.log(data.location);
    console.log(forecastData);
  });
});
