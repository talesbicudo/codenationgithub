import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo-hooks';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import client from './client';
import gql from 'graphql-tag';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleWare from 'redux-saga';
import rootReducers from "./redux/rootReducers";
import rootSagas from "./redux/rootSagas";
const sagaMiddleWare = createSagaMiddleWare();
const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(sagaMiddleWare)));
sagaMiddleWare.run(rootSagas);

gql.disableFragmentWarnings();
ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Provider>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
