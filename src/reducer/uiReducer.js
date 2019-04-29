// const api = require('../utils/api');

import {
    FILTER_TOGGLE
} from '../actions/action-types';


const initialState = {
    filterShown: false
};


const uiReducer = (state = initialState, action) => {
    switch (action.type) {

        case FILTER_TOGGLE:
            return {
                ...state,
                filterShown: !state.filterShown
            };

        default:
            return state;
    }
};

export default uiReducer;
