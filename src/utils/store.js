import { applyMiddleware, createStore } from 'redux';

//store
import rootReducer from '../reducer/index';

//plugins
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger();

export default () => {
    // logger
    let store = createStore(rootReducer, {},applyMiddleware(thunk,logger));

    return { store }
}
