const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
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
    console.log(req);
    const options = {
        method: 'GET',
        url: 'https://api.pandascore.co/valorant/leagues?sort=&page=1&per_page=50',
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
app.listen(8000, () => console.log('Server is running on http://localhost:' + PORT))
