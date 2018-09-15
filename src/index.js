import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Root from './router/Root';
import store from './utils/store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root store={store}/>,
    document.getElementById('root'));
registerServiceWorker();
