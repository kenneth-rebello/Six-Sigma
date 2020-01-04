import {combineReducers} from 'redux';
// import {persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import userReducer from './user.reducer';
import fileReducer from './file.reducer';

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['cart']
// }

const rootReducer = combineReducers({
    user: userReducer,
    file: fileReducer
});

export default rootReducer;
// export default persistReducer(persistConfig, rootReducer);