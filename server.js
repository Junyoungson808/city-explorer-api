'use strict';

console.log('FIRST EVER SERVER!');
// servers we use require not import.

//bring in Express
const express = require('express');
require('dotenv').config();
// let data = require.apply('./data/weather.json');

//once express is in we need to use it-per express docs
const app = express();

const PORT = process.env.PORT || 3002;

// ROUTES

// BASE
app.get('/', (request, response) => {
  console.log('show up in my terminal');
  response.status(200).send('Welcome to our server');
});

//ROUTE
app.get('/hello', (request, response) => {
  console.log(request.query);
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response
    .status(200)
    .send(`HELLO ${firstName} ${lastName} FROM THE HELLO ROUTE!`);
});

app.get('/pet', (request, response) => {
  let species = request.query.species;
  let dataToGroom = data.find((pet) => pet.species === species);
  let dataToSend = new Pet (dataToSend);
  response.status(200).send(dataToSend);
});

class Pet {
  constructor(petObj) {
    this.name = petObj.name;
    this.breed = petObj.breed;
  }
}

//Catch all - needs to be at the bottom
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

app.listen(PORT, () => console.log(`We are up on PORT: ${PORT}`));
