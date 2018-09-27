import {
    SET_LOCATION,
    REQUEST_APIDATA,
    RECEIVED_APIDATA,
    DATA_ERROR,
    REQUEST_DETAILDATA,
    RECEIVED_DETAILDATA,
    SET_ENV,
    FILTER_TOGGLE,
    CHANGE_OPEN,
    CHANGE_RADIUS
} from './action-types';

import api from '../utils/api';

// syncActionCreator:

export function setLocation(location){
    return {
        type: SET_LOCATION,
        value: location
    }
}

export function apiCall(params){
    return (dispatch) => {
        dispatch({type: REQUEST_APIDATA});
        api.basicCall(params)
            .then(
                (data) => dispatch({type: RECEIVED_APIDATA, value: data})
            )
            .catch(err => {
                dispatch({type: DATA_ERROR, errors: err});
            });
    }
}

export function detailCallAction(id){
    return (dispatch) => {
        dispatch({type: REQUEST_DETAILDATA});
        api.detailCall(id)
            .then(
                (data) => dispatch({type: RECEIVED_DETAILDATA, value: data})
            )
            .catch(err => {
                dispatch({type: DATA_ERROR, errors: err});
            });
    }
}

export function setEnv(env){
    return {
        type: SET_ENV,
        value: env
    }
}

export function filterToggleAction() {
    return {
        type: FILTER_TOGGLE
    }
}

export function changeOpen(){
    return {
        type: CHANGE_OPEN
    }
}

export function changeRadius(radius) {
    return {
        type: CHANGE_RADIUS,
        value: radius
    }
}