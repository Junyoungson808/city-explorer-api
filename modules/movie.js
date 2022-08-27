'use strict';

const axios = require('axios');

let cache = {};

async function getMovie(request, response, next) {

  try {
    let searchQueryFromFrontEnd = request.query.searchQuery;
    let key = searchQueryFromFrontEnd + 'extension';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEBIT_ACCESS_KEY}&query=${searchQueryFromFrontEnd}`;

    // If the Cache exists AND is valid... Send THAT DATA

    if (cache[key] && Date.now() - cache[key].timeStamp < 1000 * 60 * 60 * 24) {
      console.log('Cache was hit, images present');
      response.status(200).send(cache[key].data);
    } else {
      console.log('Cache miss , no images present');

      const movieInTheArea = await axios.get(url);

      let dataToGroom = movieInTheArea.data;
      let groomedData = dataToGroom.results.map(
        (movieObj) => new Movies(movieObj)
      );
      cache[key] = {
        data: groomedData,
        timeStamp: Date.now(),
      };

      response.status(200).send(groomedData);
      console.log('Check this OUT', movieInTheArea);
    }

  } catch (error) {
    next(error);
  }
}

class Movies {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;

  }
}

module.exports = getMovie;
