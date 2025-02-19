import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist';
import { rootReducer } from './rootReducer';
import createWebStorage from 'reduxjs-toolkit-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
  return {
    getItem(_key) {
      // eslint-disable-next-line no-undef
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      // eslint-disable-next-line no-undef
      return Promise.resolve(value);
    },
    removeItem(_key) {
      // eslint-disable-next-line no-undef
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
  whitelist: ['walletReducer', 'adminReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
