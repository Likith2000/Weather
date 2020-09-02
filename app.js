const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const unit = req.body.units;
    var units = "Celsius";
    if (unit === "imperial") {
        units = "°Farhenheit";
    }
    const apiKey = "7d66b418e41615c4cb16686018485fc8";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const img = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + desc + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees " + units + ".</h1>");
            res.write("<img src=" + img + ">");
            res.send();
        })
    })
})


app.listen(3000, function () {
    console.log("Server started at port 3000")
})