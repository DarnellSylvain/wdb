const axios = require("axios")

const query = "batman"

axios.get(`http://www.omdbapi.com/?s=${query}&apikey=thewdb`)
    .then(response => console.log(response.data.Search[0]) )
    .catch(err => console.log("Error"))