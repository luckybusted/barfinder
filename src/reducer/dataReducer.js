import React from 'react';

// const api = require('../utils/api');

import {
    SET_LOCATION,
    REQUEST_APIDATA,
    RECEIVED_APIDATA,
    GET_LOCATION,
    DATA_ERROR,
    REQUEST_DETAILDATA,
    RECEIVED_DETAILDATA
} from '../actions/action-types';


const initialState = {
    errors: '',
    userLocation: '',
    showDataLoader: true,
    showDetailLoader: true,
    showLocationLoader: true,
    apiData: {},
    detailData: {}
};

function locationCleaner(location){
    return location.substring(1);
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {

        case REQUEST_APIDATA:
            return {
                ...state,
                showDataLoader: true
            };

        case RECEIVED_APIDATA:
            return {
                ...state,
                apiData: action.value,
                showDataLoader: false
            };

        case GET_LOCATION:
            return {
                ...state,
                showLocationLoader: true
            };

        case SET_LOCATION:
            return {
                ...state,
                userLocation: action.value,
                showLocationLoader: false
            };

        case REQUEST_DETAILDATA:
            return {
                ...state,
                showDetailLoader: true
            };

        case RECEIVED_DETAILDATA:
            return {
                ...state,
                detailData: action.value,
                showDetailLoader: false
            };

        case DATA_ERROR:
            return {
                ...state,
                errors: action.errors
            };

        default:
            return state;
    }
};

export default dataReducer;
