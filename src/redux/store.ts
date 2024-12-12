import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tokenReducer from './tokenSlice';

import adminReducer from './adminSlice';
import superAdminReducer from './superAdminSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
    admin: adminReducer,
    super_admin: superAdminReducer,
  },
});
