import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Root from './router/Root';
import store from './utils/store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root store={store}/>,
    document.getElementById('root'));
registerServiceWorker();
