const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
// const apiByCoordinates = api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=47c5d4e87a90ccf97d46e12cae3a0415;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const apiByCity = "https://api.openweathermap.org/data/2.5/weather?q=Lucknow&units=metric&appid=47c5d4e87a90ccf97d46e12cae3a0415";
var unit = "C";
app.get("/", function(req, res){
  https.get(apiByCity, function(response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description.toUpperCase();
      const location = weatherData.name;
      const icon = weatherData.weather[0].icon;
      const country = weatherData.sys.country;

      res.render("weather", {
        tempdeg: temp,
        tempdes: description,
        zone: location,
        con: country,
        tempicon: icon,
        tempUnit: unit
      });
    });
  });
});



app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiByCity = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=47c5d4e87a90ccf97d46e12cae3a0415";
  https.get(apiByCity, function(response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description.toUpperCase();
      const location = weatherData.name;
      const icon = weatherData.weather[0].icon;
      const country = weatherData.sys.country;

      res.render("weather", {
        tempdeg: temp,
        tempdes: description,
        zone: location,
        con: country,
        tempicon: icon,
        tempUnit: unit
      });
    });
  });
});



app.listen(3000, function(){
  console.log("Server running on port 3000");
});
