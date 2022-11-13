const PORT = 8000
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.get('/', (req,res) => {
    res.json('hi')
})
app.get('/live', (req,res) => {
    const axios = require("axios");

    const options = {
        method: 'GET',
        url: 'https://api.pandascore.co/videogames',
        headers: {
            'Authorization': 'Bearer '+ process.env.REACT_APP_PANDASCORE,
            'Accept': 'application/json'
        }
    };
    axios.request(options).then(function (response) {
        res.json(response.data);
    }).catch(function (error) {
        console.error(error);
    });
})
app.get('/leagues', (req,res) => {
    const axios = require("axios");
    console.log(req.query.games);
    const game = req.query.games
    const options = {
        method: 'GET',
        url: 'https://api.pandascore.co/'+ game +'/leagues?sort=&page=1&per_page=100',
        headers: {
            'Authorization': 'Bearer '+ process.env.REACT_APP_PANDASCORE,
            'Accept': 'application/json'
        }
    };
    axios.request(options).then(function (response) {
        res.json(response.data);
        // console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

})
app.get('/series', (req,res) => {
    const axios = require("axios");
    console.log(req.query.games);
    const game = req.query.games
    const league = req.query.league
    const id = req.query.id
    console.log(id);
    const options = {
        method: 'GET',
        url: 'https://api.pandascore.co/'+game+'/series?sort=-year&filter[league_id]='+id+'&page=1&per_page=50',

        // url: 'https://api.pandascore.co/'+ game +'/matches?filter[league_id][0]='+ id +'&sort=&page=1&per_page=50',
        headers: {
            'Authorization': 'Bearer '+ process.env.REACT_APP_PANDASCORE,
            'Accept': 'application/json'
        }
    };
    axios.request(options).then(function (response) {
        res.json(response.data);
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

})
app.get('/tournaments', (req,res) => {
    const axios = require("axios");
    const game = req.query.games
    const league = req.query.league
    const id = req.query.id
    const options = {
        method: 'GET',
        url: 'https://api.pandascore.co/'+game+'/tournaments?filter[serie_id]='+id+'&sort=&page=1&per_page=50',
        // url: 'https://api.pandascore.co/'+ game +'/matches?filter[league_id][0]='+ id +'&sort=&page=1&per_page=50',
        headers: {
            'Authorization': 'Bearer '+ process.env.REACT_APP_PANDASCORE,
            'Accept': 'application/json'
        }
    };
    axios.request(options).then(function (response) {
        res.json(response.data);
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

})
app.get('/matches', (req,res) => {
    const axios = require("axios");
    const game = req.query.games
    const league = req.query.league
    const id = req.query.id
    const options = {
        method: 'GET',
        url: 'https://api.pandascore.co/'+game+'/matches?filter[tournament_id]='+id+'&sort=&page=1&per_page=50',
        // url: 'https://api.pandascore.co/'+ game +'/matches?filter[league_id][0]='+ id +'&sort=&page=1&per_page=50',
        headers: {
            'Authorization': 'Bearer '+ process.env.REACT_APP_PANDASCORE,
            'Accept': 'application/json'
        }
    };
    axios.request(options).then(function (response) {
        res.json(response.data);
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

})
app.get('/match', (req,res) => {
    const axios = require("axios");
    const game = req.query.games
    const league = req.query.league
    const id = req.query.id
    const options = {
        method: 'GET',
        url: 'https://api.pandascore.co/'+game+'/matches?filter[id]='+id+'&sort=&page=1&per_page=50',
        // url: 'https://api.pandascore.co/'+ game +'/matches?filter[league_id][0]='+ id +'&sort=&page=1&per_page=50',
        headers: {
            'Authorization': 'Bearer '+ process.env.REACT_APP_PANDASCORE,
            'Accept': 'application/json'
        }
    };
    axios.request(options).then(function (response) {
        res.json(response.data);
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

})
app.listen(8000, () => console.log('Server is running on http://localhost:' + PORT))



/*
**  VALORANT'S SYSTEM  LEAGUE > SERIES > TOURNAMENT
*/