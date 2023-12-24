import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './LoginSlice'

import storage from 'redux-persist/lib/storage';

import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, loginReducer)


export const store = configureStore({
  reducer: {
    login : persistedReducer,
    // middleware: getDefaultMiddleware(),
    middleware: [thunk]
  },
})


export const persistor = persistStore(store)