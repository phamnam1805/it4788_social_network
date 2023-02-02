import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './RootReducer';

let store;
const middleware = [thunk];

// Development
middleware.push(logger);

// For test
store = configureStore({
    reducer: rootReducer,
    middleware,
});
// For product
// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     whitelist: ['did', 'credential', 'wallets', 'walletConnect', 'app'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// store = configureStore({
//     reducer: persistedReducer,
//     middleware,
// });

// persistStore(store);

export default store;
