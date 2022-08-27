'use strict';

const axios = require('axios');

async function getWeather(request, response, next) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHERBIT_ACCESS_KEY}`;
    console.log('Check this OUT', getWeather);
    const weatherResponse = await axios.get(url);

    let dataToGroom = weatherResponse.data;
    let dataToSend = dataToGroom.data.map((weatherObj) => {
      return new Forecast(weatherObj);
    });
    response.status(200).send(dataToSend);
    console.log('Check this OUT', weatherResponse);
  } catch (error) {
    next(error);
  }
}

class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.valid_date;
    this.description = weatherObj.weather.description;
    this.temp = weatherObj.temp;
    this.lat = weatherObj.lat;
    this.lon = weatherObj.lon;
  }
}

module.exports = getWeather;
