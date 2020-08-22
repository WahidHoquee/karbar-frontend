import React from "react";
import { render } from "react-dom";
import App from "./app";
import { BrowserRouter as Router } from "react-router-dom";

import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import createSaga from "redux-saga";

import uiReducer from './Store/interface'
import menuReducer from './Store/menu'
import formReducer from './Store/form'
import formsReducer from "./Store/Reducers/forms";
import {watchMenu, watchControl } from "./Store/Sagas";

const rootReducer = combineReducers({
    ui: uiReducer,
    menu: menuReducer,
    form: formReducer,
    forms: formsReducer
})

const saga = createSaga();

const store = configureStore({
  reducer: rootReducer, 
  middleware: [ saga ]
});

saga.run(watchMenu);
saga.run(watchControl);

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

render(app, document.getElementById("root"));
