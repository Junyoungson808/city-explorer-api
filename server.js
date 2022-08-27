'use strict';

console.log('FIRST EVER SERVER!');
// servers we use require not import.

//bring in Express
const express = require('express');
const cors = require('cors');
const getWeather = require('./modules/weather.js');
const getMovie = require('./modules/movie.js');

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

// Weather Route
app.get('/weather', getWeather);

// Movie Route
app.get('/movie', getMovie);


//Catch all - needs to be at the bottom
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

app.use((error, request, response,) => {
  response.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`We are up on PORT: ${PORT}`));
