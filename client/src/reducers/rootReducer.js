import {combineReducers} from 'redux';

import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user.reducer';
import fileReducer from './file.reducer';
import { alertReducer } from './alert.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['file', 'user']
}

const rootReducer = combineReducers({
    user: userReducer,
    file: fileReducer,
    alert: alertReducer
});

export default persistReducer(persistConfig, rootReducer);