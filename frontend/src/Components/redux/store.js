import { configureStore } from '@reduxjs/toolkit';

import buyerAuthReducer from './buyerAuthSlice';
import sellerAuthReducer from './sellerAuthSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
/*
const store = configureStore({
  reducer: {
    buyerAuth: buyerAuthReducer,
    sellerAuth: sellerAuthReducer,
  },
});*/

const rootReducer = combineReducers({
  buyerAuth: buyerAuthReducer,
  sellerAuth: sellerAuthReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['sellerAuth', 'buyerAuth'], // Only persist sellerAuth
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore non-serializable warnings from redux-persist
    }),
});

export default store;
// Create persistor
export const persistor = persistStore(store);

