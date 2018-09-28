import React from 'react';

// const api = require('../utils/api');

import {
    SET_LOCATION,
    REQUEST_APIDATA,
    RECEIVED_APIDATA,
    GET_LOCATION,
    DATA_ERROR,
    REQUEST_DETAILDATA,
    RECEIVED_DETAILDATA,
    SET_ENV,
    CHANGE_OPEN,
    CHANGE_RADIUS
} from '../actions/action-types';


const initialState = {
    errors: '',
    userLocation: '',
    showDataLoader: true,
    showDetailLoader: true,
    showLocationLoader: true,
    env: '',
    apiData: {},
    detailData: {},
    searchParams: {
        longitude: '',
        latitude: '',
        categories: 'bars',
        open_now: false,
        radius: 2000,
        price: ''
    }
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

        case SET_ENV:
            return {
                ...state,
                env: action.value
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
                searchParams: {
                    ...state.searchParams,
                    longitude: action.value.longitude,
                    latitude: action.value.latitude
                },
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

        case CHANGE_OPEN:
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    open_now: !state.searchParams.open_now
                }
            };

        case CHANGE_RADIUS:
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    radius: action.value
                }
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
