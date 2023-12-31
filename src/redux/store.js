import { rootReducer } from './root-reducer';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { BWICoreApi } from './services/BWICore';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// we want to log the logs only in development server but not on produnction server
const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(BWICoreApi.middleware)
      .concat(middleWares),
});

export const persistor = persistStore(store);
