import React from 'react'
import {Provider} from 'react-redux'
import {Router, Route} from 'react-router-dom'

/* Imports */
import history from '../utils/history';
import SubRoot from './SubRoot.js';

import configureStore from '../utils/store'

const {store} = configureStore();

const Root = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={SubRoot}/>
            </Router>
        </Provider>
    )
};

export default Root
