import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from "./App";
import {Provider} from 'react-redux'
import reducer from './reducers'
import 'bootstrap/dist/css/bootstrap.min.css';
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "./middleware/logger";


const store = configureStore({reducer: reducer, middleware: [thunk, logger]})


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);