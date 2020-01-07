import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';

const middlewares = [thunk];

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

export const persistor = persistStore(store);