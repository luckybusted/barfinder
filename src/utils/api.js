import 'whatwg-fetch';
import apiKey from './apiKey'
import axios from 'axios';

let ReactRedux = require('react-redux');
let actions = require('../actions/actions');

// ie fix
let ES6Promise = require("es6-promise");
ES6Promise.polyfill();

let api = {

    basicCall(){

        let url = 'https://api.yelp.com/v3/businesses/search',
            key = 'Bearer ' + apiKey;

        console.log('API KEY', key);

        const config = {
            headers: {'Authorization': key},
            params: {
                term: 'tacos',
                location: 'main 123st'
            }
        };

        return axios.get(url, config)
            .then((response) => {
                console.log('RESPONSE', response);
            })
            .catch(function (error) {
                console.log('axios error: ', error);
            })

    }
};

export default api;