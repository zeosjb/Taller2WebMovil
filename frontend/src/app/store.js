import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import clientReducer from '../features/auth/clientSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer
  },
});
