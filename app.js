const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
const { request } = require('http');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");   

})

app.post("/", function(req, res) {

    const query = req.body.cityName;
    const apiKey = "d57b2965d8c39c58b2c11e393f149fbd";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        var result = '';
        
        response.on("data", function(data){
            result += data;
        });

        response.on("end", function() {
            const weatherData = JSON.parse(result);
            const temp1 = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon 
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp1 + "degrees Celcius.</h1>");
            res.write("<img src="+ imageURL + ">")
            res.send()
        });
    });
})



app.listen(3000, function() {
    console.log("Server is running on port 3000...");
})