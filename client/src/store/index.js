import { createStore, applyMiddleware, compose } from 'redux';

import user from '../middlewares/user';

import reducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
    applyMiddleware(
      user,
    ),
);

const store = createStore(reducer, enhancers);

export default store;