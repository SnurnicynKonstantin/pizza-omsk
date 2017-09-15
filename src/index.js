import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route } from 'react-router';
import App from './containers/App';
import './styles/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import configureStore from './store/configureStore';
window.jQuery = window.$ = require('jquery/dist/jquery.min');

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path="/" component={App}>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('main')
);