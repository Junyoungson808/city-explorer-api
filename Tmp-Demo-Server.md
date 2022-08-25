'use strict';

// Require:
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

// Express instance:
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.listen(PORT, () => console.log(`listen on ${PORT}));

///////////////////////////////////////////////////////

// ENDPOINTS***
app.get('/photos', getPhotos);

async function getPhotos(request, response) {
// Note the .searchQuery
    const searchQuery = request.query.searchQuery
    const url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${searchQuery}`;
    try{
        // axios get request to our api
        const photoResponse = await axios.get(url);
        // console.log(photosResponse);
        // groomed data
        const photoArray = photosResponse.data.results.map(photo => new Photo(photo));
        response.status(200).send(photoArray);
    } catch (error) {
        console.log('error message is: ', err);
        response.status(500).send(`server error`);
    }
}

class Photo {
    constructor(obj) {
        this.img_url = obj.urls.regular;
        this.original_image = obj.links.self;
        this.photographer = obj.user.name
    }
}