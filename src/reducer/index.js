import {combineReducers} from 'redux';


import dataReducer from './dataReducer';
import uiReducer from './uiReducer';

// Things you should never do inside a reducer:

// Mutate its arguments;
// Perform side effects like API calls and routing transitions;
// Call non-pure functions, e.g. Date.now() or Math.random().
// -> no api calls in the reducer

const reducer = combineReducers({
    dataReducer: dataReducer,
    uiReducer: uiReducer
});

export default reducer;
