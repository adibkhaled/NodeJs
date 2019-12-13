//import 
const express = require('express');
const request = require('request');
const app = express()
const bodyParser = require('body-parser');
const apiKey = 'my_api_key';

app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/listUsers', function (req, res) {
	   fs.readFile(__dirname + "/" + listUserPath, 'utf8', function (err, data) {
	      console.log( data );
	      res.end( data );
	   });
	})
	
app.get('/website', function (req, res) {
	res.render('index', {weather: null, error: null});
})

app.post('/website', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

var server = app.listen(1336, '127.0.0.1', function () {
	   var host = server.address().address
	   var port = server.address().port
	   
	   console.log( __dirname );
	   console.log("Example app listening at http://%s:%s", host, port)
	})