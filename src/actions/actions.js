import {
    SET_LOCATION,
    REQUEST_APIDATA
} from './action-types';

import api from '../utils/api';

// syncActionCreator:

export function setLocation(location){
    return {
        type: SET_LOCATION,
        value: location
    }
}

export function testCall(){
    return (dispatch) => {
        dispatch({type: REQUEST_APIDATA});
        api.basicCall();
    }
}