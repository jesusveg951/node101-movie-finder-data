const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const app = express();
const cache = {};

app.use(morgan('dev'));
app.get('/', function(req, res){
        var movieId = req.query;
        var key = Object.keys(movieId);
        var value = Object.values(movieId);
        var url = 'http://www.omdbapi.com/?apikey=8730e0e&'  + key + '=' + encodeURI(value);
        
        if (cache.hasOwnProperty(value)){
            res.json(cache[value]);
        } else {
            console.log(cache);
            axios.get(url)
            .then(response => { 
            cache[value] =  response.data;
            res.send(response.data);
            }).catch(err => res.json(err.message));
        }
});
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;
