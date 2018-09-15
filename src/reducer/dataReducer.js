import React from 'react';

// const api = require('../utils/api');

import {
    SET_LOCATION,
    REQUEST_APIDATA,
    RECEIVE_APIDATA,
} from '../actions/action-types';


const initialState = {
    location: '',
    showDataLoader: false
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

        case SET_LOCATION:
            return {
                ...state,
                location: action.value
            };

        default:
            return state;
    }
};

export default dataReducer;
