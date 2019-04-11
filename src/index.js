import React from 'react';
import ReactDom from 'react-dom';
// applyMiddlewar 用来处理中间件的
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import { BrowserRouter} from 'react-router-dom'
import reducers from './reducers'
import './index.css';

import App from './App'
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
));

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)

