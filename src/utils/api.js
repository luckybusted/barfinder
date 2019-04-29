import 'whatwg-fetch';
import apiKey from './apiKey'
import axios from 'axios';

//let ReactRedux = require('react-redux');
//let actions = require('../actions/actions');

// ie fix
let ES6Promise = require("es6-promise");
ES6Promise.polyfill();

let api = {

    getLocation(){
        const config = {
            url: 'http://ip-api.com/json/',
            method: 'GET',
            json: true
        };

        return axios(config)
            .then((response) => {
                console.log('API RESPONSE', response);
                return response.data;
            })
            .catch(function (error) {
                console.log('axios error: ', error);
                //return ERROR MESSAGE
            });

    },

    basicCall(params) {

        let url = 'https://api.yelp.com/v3/businesses/search',
            key = 'Bearer ' + apiKey,
            urlProxy = 'https://finder-cors.herokuapp.com/' + url;

        const config = {
            url: urlProxy,
            method: 'GET',
            json: true,
            headers: {
                'Authorization': key,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            params: params
        };

        return axios(config)
            .then((response) => {
                return response.data;
            })
            .catch(function (error) {
                console.log('axios error: ', error);
            })

    },

    detailCall(id) {
        let url = 'https://api.yelp.com/v3/businesses/' + id,
            key = 'Bearer ' + apiKey,
            urlProxy = 'https://finder-cors.herokuapp.com/' + url;

        const config = {
            url: urlProxy,
            method: 'GET',
            json: true,
            headers: {
                'Authorization': key,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        return axios(config)
            .then((response) => {
                return response.data;
            })
            .catch(function (error) {
                console.log('axios error: ', error);
            })

    }
};

export default api;
