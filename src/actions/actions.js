import {
    SET_LOCATION,
    REQUEST_APIDATA,
    RECEIVED_APIDATA,
    DATA_ERROR
} from './action-types';

import api from '../utils/api';

// syncActionCreator:

export function setLocation(location){
    return {
        type: SET_LOCATION,
        value: location
    }
}

export function testCall(params){
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