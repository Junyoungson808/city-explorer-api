'use strict';

console.log('FIRST EVER SERVER!');
// servers we use require not import.

//bring in Express
const express = require('express');
const cors = require('cors');
const data = require('./data/weather.json');

require('dotenv').config();

const PORT = process.env.PORT || 3002;

//once express is in we need to use it-per express docs
const app = express();
app.use(cors());


// ROUTES
// BASE
app.get('/', (request, response) => {
  console.log('show up in my terminal');
  response.status(200).send('Welcome to our server');
});

// Hello Route
app.get('/hello', (request, response) => {
  console.log(request.query);
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response
    .status(200)
    .send(`HELLO ${firstName} ${lastName} FROM THE HELLO ROUTE!`);
});
// Weather Route
app.get('/weather', (request, response) => {
  let cityName = request.query.city;
  let dataToGroom = data.find((city) => city.city_name === cityName);
  let dataToSend = dataToGroom.data.map(object => {
    return new Forcast(object);
  });
  response.status(200).send(dataToSend);
});


class Forecast {
  constructor(weatherObj){
    this.date = weatherObj.valid_date;
    this.description = weatherObj.weather.description;
  }
}

// class Pet {
//   constructor(petObj) {
//     this.name = petObj.name;
//     this.breed = petObj.breed;
//   }
// }

//Catch all - needs to be at the bottom
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// app.use((error, request, response, next) => {
//   response.status(404).send(error.message);
// });

app.listen(PORT, () => console.log(`We are up on PORT: ${PORT}`));
